var exec = require('child_process').exec
var fs = require('fs')

var taskName = 'gitInfo'
var taskDescription = 'A simple task that writes current commit information into file.'

var gitArguments = {
  branch: 'git rev-parse --abbrev-ref HEAD',
  commit: 'git rev-parse HEAD',
  short: 'git rev-parse --short HEAD',
  timestamp: 'git log --format="%ci" -n1 HEAD',
  author: 'git log --format="%cN" -n1 HEAD',
  message: 'git log --format="%B" -n1 HEAD',
  status: 'git status -s'
}

var configDefaults = {
  repository: '',
  output: 'gitInfo.json',
  fields: [
    'branch',
    'commit',
    'short',
    'timestamp',
    'author',
    'message',
    'status'
  ]
}

function mergeConfig (defaults, overrides) {
  var result = {}
  var key

  // merge fields with default values
  for (key in defaults) {
    if (defaults.hasOwnProperty(key)) {
      result[key] = overrides[key] || defaults[key]
    }
  }

  // copy fields with no default value
  for (key in overrides) {
    if (overrides.hasOwnProperty(key)) {
      if (!result[key]) {
        result[key] = overrides[key]
      }
    }
  }

  return result
}

function objectFromFields (fields) {
  var result = {}
  for (var i = 0; i < fields.length; i++) {
    result[fields[i]] = null
  }
  return result
}

module.exports = function (grunt) {
  grunt.registerTask(taskName, taskDescription, function () {
    var done = this.async()
    var config = mergeConfig(configDefaults, grunt.config(taskName))
    var data = objectFromFields(config.fields)
    var execOptions = { cwd: config.repository }
    var activeTasks = 0

    var result = function () {
      activeTasks--
      if (!activeTasks) {
        var jsonResult = JSON.stringify(data, null, 2)
        fs.writeFile(config.output, jsonResult, null, done)
      }
    }

    for (var key in data) {
      activeTasks++
      exec(gitArguments[key], execOptions, function (key, err, stdout) {
        if (!err) {
          data[key] = stdout.split('\n').join('')
        }
        result()
      }.bind(undefined, key))
    }
  })
}
