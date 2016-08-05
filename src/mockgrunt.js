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
    subhead: function(msg) {
      this._logs.push({ type: 'subhead', msg: msg });
    },
    errorlns: function(msg) {
      this._logs.push({ type: 'errorlns', msg: msg });
    },
    warn: function(msg) {
      this._logs.push({ type: 'warn', msg: msg });
    }
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
  if(!task) {
    f = desc;
    desc = undefined;
  }
  var task = new Task(name, f, desc);

  this.tasks[name] = task;
};

MockGrunt.prototype.assertTask = function(name) {
  assert(name, 'you need to provide a task name');
  assert(this.tasks[name], 'no task with name ' + name + ' was registered yet.');
};

MockGrunt.prototype.triggerTask = function(name, opts, done) {
  this.assertTask(name);
  task = this.tasks[name];
  var isAsync = false;
  task.async = function() {
    isAsync = true;
    return function(res) {
      done(res);
    }
  };
  task.f.call(task, opts);
  if(!isAsync) {
    done();
  }
};


module.exports = MockGrunt;
