var format = Npm.require('util').format;
SSR = {};

SSR.render = function(templateName, data) {
  var renderFunc = (data)? Blaze.toHTMLWithData : Blaze.toHTML;
  var template = (typeof templateName == 'string')?
    Template[templateName] : templateName;

  return renderFunc(template, data);
};

SSR.compileTemplate = function(name, content, options) {
  var language = options && options.language || "html";
  var Compiler;
  if (language === "html")
    Compiler = SpacebarsCompiler;
  else if (language === "jade" && JadeCompiler)
    Compiler = JadeCompiler;
  else
    throw Error("Unknow language: " + language);

  var compiled = Compiler.compile(content);
  var templateFmt = "new Template('%s', function() {var view=this; return %s()})";
  var template = format(templateFmt, name, compiled);

  return Template[name] = eval(template);
};
