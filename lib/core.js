var fs = Npm.require('fs');
var path = Npm.require('path');
var templateJsString = [];

var browserFilesPath = path.resolve(process.cwd(), '../web.browser/app');
readTemplates(browserFilesPath);

templateJsString.forEach(function(content) {
  eval(content);
});

function readTemplates(pathName) {
  var list = fs.readdirSync(pathName);
  list.forEach(function(fileOrDir) {
    var fullPath = path.resolve(pathName, fileOrDir);
    var stat = fs.statSync(fullPath);

    if(stat.isDirectory()) {
      readTemplates(fullPath);
    } else if(stat.isFile()) {
      if(/^template\.(.*)\.js/.test(fileOrDir)) {
        var fileContent = fs.readFileSync(fullPath, 'utf8');
        templateJsString.push(fileContent);
      }
    }
  });
}