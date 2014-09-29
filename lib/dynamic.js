Template.__dynamic = new Template("Template.__dynamic", function() {
  var view = this;
  var template = Spacebars.call(view.lookup("template"));
  if(!template) {
    throw new Error('you must specify template argument in UI.dynamic');
  } else if(!Template[template]) {
    throw new Error('there is no template defined to include with UI.dynamic: '  + template);
  }

  var data = Spacebars.call(view.lookup("data"));
  if(!data) {
    // get data from the parent
    data = Spacebars.call(view.lookup)
  }

  return Blaze._TemplateWith(data, function() {
    return Spacebars.include(Template[template]);
  });
});
