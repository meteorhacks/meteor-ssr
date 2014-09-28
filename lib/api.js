SSR = {};
SSR.render = function(templateName, data) {
  var renderFunc = (data)? Blaze.toHTMLWithData : Blaze.toHTML;
  var template = (typeof templateName == 'string')? 
    Template[templateName] : templateName;

  return renderFunc(template, data);
};