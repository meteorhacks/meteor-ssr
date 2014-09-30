var format = Npm.require('util').format;
SSR = {};

SSR.render = function(templateName, data) {
  var renderFunc = (data)? Blaze.toHTMLWithData : Blaze.toHTML;
  var template = (typeof templateName == 'string')? 
    Template[templateName] : templateName;

  return renderFunc(template, data);
};

SSR.compileTemplate = function(name, htmlText) {
  var compiled = SpacebarsCompiler.compile(htmlText);
  var templateFmt = "new Template('%s', function() {var view=this; return %s()})";
  var template = format(templateFmt, name, compiled);
  
  return Template[name] = eval(template);
};