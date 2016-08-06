var MockGrunt = require('../'),
    assert = require('assert')
    sinon = require('sinon');


describe('mockgrunt', function() {
  var mockGrunt,
      msg = 'that\'s so cool';

  beforeEach(function() {
    mockGrunt = new MockGrunt();
  });


  describe('taskRegistration', function() {

    it('registers a multitask without description', function() {
      var spy = sinon.spy();
      var task = function(grunt) {
        grunt.registerMultiTask('some_task', spy);
      };
      task(mockGrunt);
      mockGrunt.assertTaskRegistered('some_task');
      assert.deepEqual(mockGrunt.tasks.some_task.f, spy);
    });

    it('registers a multitask with description', function() {
      var spy = sinon.spy();
      var task = function(grunt) {
        grunt.registerMultiTask('another_task', 'do really cool stuff in a weird way', spy);
      };
      task(mockGrunt);
      mockGrunt.assertTaskRegistered('another_task');
      assert.deepEqual(mockGrunt.tasks.another_task.f, spy);
    })

  });


  describe('file', function() {

    it('reads a defined file as JSON set via object', function() {
      var data = { lorem: 'ipsum' };
      var filename = '/foo/bar.json';
      mockGrunt.file._set_file(filename, data);

      var task = function(grunt) {
        readData = grunt.file.readJSON(filename);
        assert.deepEqual(readData, data);
      };
      task(mockGrunt);
    });

    it('reads a defined file as JSON set via string', function() {
      var data = { lorem: 'ipsum' };
      var filename = '/foo/bar.json';
      mockGrunt.file._set_file(filename, JSON.stringify(data));

      var task = function(grunt) {
        readData = grunt.file.readJSON(filename);
        assert.deepEqual(readData, data);
      };
      task(mockGrunt);
    });

    it('throws an error if the filename is not set', function() {
      var filename = '/not/here.log';
      var task = function(grunt) {
        grunt.file.readJSON(filename);
      };
      assert.throws(function() {
        task(mockGrunt);
      }, Error, 'file ' + filename + ' not found');
    });
  });

  function assertLog(mockGrunt, type, msg) {
    var task = function(grunt) {
      grunt.log[type].call(grunt.log, msg);
    };
    task(mockGrunt);
    assert.equal(mockGrunt.log._logs.length, 1);
    assert.equal(mockGrunt.log._logs[0].type, type);
    assert.equal(mockGrunt.log._logs[0].msg, msg);
  };


  describe('log', function() {

    it('records write as such', function(){
      assertLog(mockGrunt, 'write', msg);
    });
    it('records writeln as such', function() {
      assertLog(mockGrunt, 'writeln', msg);
    });
    it('records warn as such', function(){
      assertLog(mockGrunt, 'warn', msg);
    });
    it('records error as such', function(){
      assertLog(mockGrunt, 'error', msg);
    });
    it('records ok as such', function(){
      assertLog(mockGrunt, 'ok', msg);
    });
    it('records errorlns as such', function(){
      assertLog(mockGrunt, 'errorlns', msg);
    });
    it('records oklns as such', function(){
      assertLog(mockGrunt, 'oklns', msg);
    });
    it('records success as such', function(){
      assertLog(mockGrunt, 'success', msg);
    });
    it('records fail as such', function(){
      assertLog(mockGrunt, 'fail', msg);
    });
    it('records header as such', function(){
      assertLog(mockGrunt, 'header', msg);
    });
    it('records subhead as such', function(){
      assertLog(mockGrunt, 'subhead', msg);
    });
    it('records debug as such', function(){
      assertLog(mockGrunt, 'debug', msg);
    });
    it('records writelns as such', function(){
      assertLog(mockGrunt, 'writelns', msg);
    });
  });
});
