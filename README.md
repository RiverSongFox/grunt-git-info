# grunt-git-info v0.0.1

> Write Git commit information into a file


## Getting Started

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-git-info --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-git-info');
```


## Configuration

This task should be configured according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

| Parameter  | Description                                              | Default value                                             |
|------------|----------------------------------------------------------|-----------------------------------------------------------|
| repository | path to git repository root                              | empty string                                              |
| output     | name of the target file to be generated                  | gitInfo.json                                              |
| fields     | an array defining set and order of fields of output file | branch, commit, short, timestamp, author, message, status |


### Usage Examples

#### All-defaults

```js
{
  gitInfo: {}
}
```

#### Custom file name and list of fields

```js
{
  gitInfo: {
    output: 'commit-information.json',
    fields: [
      'commit',
      'timestamp',
      'author'
    ]
  }
}
```

## Credits

This development was inspired by these great works:

* git-rev-2: [yanatan16/git-rev](https://github.com/yanatan16/git-rev)
* grunt-jenkins-build-info: [linuxbozo/grunt-jenkins-build-info](https://github.com/linuxbozo/grunt-jenkins-build-info)

## Final Notes

Licensed under terms of [ISC License](LICENSE).

Should you have any feedback, questions, bug reports or feature requests, please [file an issue](https://github.com/yaruson/grunt-git-info/issues).
