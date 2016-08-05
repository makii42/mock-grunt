var MockGrunt = require('../'),
    assert = require('assert');


describe('mockgrunt', function() {
  var mockGrunt;

  beforeEach(function() {
    mockGrunt = new MockGrunt();
  });

  describe('file', function() {
    it('reads a defined file as JSON', function(done) {
      var data = { lorem: 'ipsum' };
      var filename = '/foo/bar.txt';
      mockGrunt.file._set_file(filename, data);

      var task = function(grunt) {
        readData = grunt.file.readJSON(filename);
        assert.deepEqual(readData, data);
        done();
      }(mockGrunt);
    });
  });
});
