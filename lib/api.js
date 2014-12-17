var format = Npm.require('util').format;
var Compilers = {};
Compilers.html = SpacebarsCompiler;
if(Package['mquandalle:jade-compiler']) {
  Compilers.jade = Package['mquandalle:jade-compiler'].JadeCompiler;
}

SSR = {};

SSR.render = function(templateName, data) {
  var renderFunc = (data)? Blaze.toHTMLWithData : Blaze.toHTML;
  var template = (typeof templateName == 'string')?
    Template[templateName] : templateName;

  return renderFunc(template, data);
};

SSR.compileTemplate = function(name, content, options) {
  var language = options && options.language || "html";
  var compiler = Compilers[language];
  if(!compiler) {
    throw Error("Unknown language: " + language);
  }

  var compiled = compiler.compile(content);
  var templateFmt = "new Template('%s', function() {var view=this; return %s()})";
  var template = format(templateFmt, name, compiled);

  return Template[name] = eval(template);
};
