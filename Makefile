export SHELL=./make-env.sh

all: minify test

dist:
	@mkdir -p dist

dist/mutantsss.js: init dist $(shell find lib -name *.js)
	# \$$\$$\$$\$$\$$\$$ => $$$, per whatever make and/or shell and/or browserify escaping does...
	browserify lib/index.js -s \$$\$$\$$\$$\$$\$$ > dist/mutantsss.js

dist/mutantsss.min.js: dist/mutantsss.js
	uglifyjs dist/mutantsss.js -c -o dist/mutantsss.min.js

build: dist/mutantsss.js

minify: dist/mutantsss.min.js

package: dist/mutantsss.js dist/mutantsss.min.js
	npm pack
	-rm -r package/
	tar -xvzf mutantsss-*.tgz

.PHONY: init test coverage coverage-html benchmark clean

init:
	npm install

test-dev: init
	karma start test/karma.conf.js $(KARMA_FLAGS)

test: init
	karma start test/karma.conf.js --single-run $(KARMA_FLAGS)

test-dist: init build
	karma start test/karma.dist-conf.js --single-run $(KARMA_FLAGS)

test-minified: init minify
	karma start test/karma.minified-conf.js --single-run $(KARMA_FLAGS)

coverage: init $(shell find lib -name *.js) $(shell find test -name *.js)
	-karma start test/karma.coverage-conf.js --single-run $(KARMA_FLAGS)

coverage-html: coverage
	open "`find coverage -path */lcov-report/index.html`"

benchmark: minify 
	open http://localhost:3000/benchmark/
	serve

clean:
	-rm -r dist
	-rm -r coverage
	-rm -r node_modules
	-rm -r package
	-rm *.tgz
