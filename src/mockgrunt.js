var assert = require('assert');

function Task(name, f, desc) {
  this.name = name || 'noName';
  this.desc = desc || 'no description';
  this.f = f || function() {};
  done = false;
  this.async = undefined; // set in-line during execution
  this.options = function(opts) {
    return opts;
  };
}

function MockGrunt () {
  this.tasks = {};

  this.log = {
    _logs: [],
    // Currently unsupported: writetableln, writeflags, table, wordlist
    write:      function(msg) { this._logs.push({ type: 'write'   , msg: msg, args: arguments }); },
    writeln:    function(msg) { this._logs.push({ type: 'writeln' , msg: msg, args: arguments }); },
    warn:       function(msg) { this._logs.push({ type: 'warn'    , msg: msg, args: arguments }); },
    error:      function(msg) { this._logs.push({ type: 'error'   , msg: msg, args: arguments }); },
    ok:         function(msg) { this._logs.push({ type: 'ok'      , msg: msg, args: arguments }); },
    errorlns:   function(msg) { this._logs.push({ type: 'errorlns', msg: msg, args: arguments }); },
    oklns:      function(msg) { this._logs.push({ type: 'oklns'   , msg: msg, args: arguments }); },
    success:    function(msg) { this._logs.push({ type: 'success' , msg: msg, args: arguments }); },
    fail:       function(msg) { this._logs.push({ type: 'fail'    , msg: msg, args: arguments }); },
    header:     function(msg) { this._logs.push({ type: 'header'  , msg: msg, args: arguments }); },
    subhead:    function(msg) { this._logs.push({ type: 'subhead' , msg: msg, args: arguments }); },
    debug:      function(msg) { this._logs.push({ type: 'debug'   , msg: msg, args: arguments }); },
    writelns:   function(msg) { this._logs.push({ type: 'writelns', msg: msg, args: arguments }); },
    writeflags: function(msg) { this._logs.push({ type: 'subhead' , msg: msg, args: arguments }); },
  };

  this.file = {
    _files: {},
    _set_file: function(name, content) {
      if(typeof content == 'object') {
        content = JSON.stringify(content);
      }
      this._files[name] = content;
    },

    readJSON: function(name) {
      if(this._files[name]) {
        return JSON.parse(this._files[name]);
      }
      throw new Error('file ' + name + ' not found');
    }
  };
}

MockGrunt.prototype.registerMultiTask = function(name, desc, f) {
  if(!f) {
    f = desc;
    desc = undefined;
  }
  var task = new Task(name, f, desc);

  this.tasks[name] = task;
};

MockGrunt.prototype.assertTaskRegistered = function(name) {
  assert(name, 'you need to provide a task name');
  assert(this.tasks[name], 'no task with name ' + name + ' was registered yet.');
};

MockGrunt.prototype.triggerTask = function(name, opts, done) {
  this.assertTaskRegistered(name);
  task = this.tasks[name];
  var isAsync = false;
  task.async = function() {
    isAsync = true;
    return function(res) {
      done(res);
    }
  };
  task.f.call(task);
  if(!isAsync) {
    done();
  }
};


module.exports = MockGrunt;
