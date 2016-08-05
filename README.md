Mock Grunt
==========

[![Build Status](https://travis-ci.org/makii42/mock-grunt.svg?branch=master)](https://travis-ci.org/makii42/mock-grunt/)

When writing tasks in grunt, testing the acutal file implementing the tasks itself is not easily
to test.

This tiny package implements (for now some) APIs that I needed to test some of the tasks I
dealt with.

Currently supported test features are:

- registering a [multi task][multiTask]
- executing synchronous and asynchronous tasks
- file access through [`readJSON`][readJSON]
- ... *to be continued*


---
[multiTask]: http://gruntjs.com/api/grunt#grunt.registermultitask
[readJSON]: http://gruntjs.com/api/grunt.file#grunt.file.readjson
