format = Npm.require('util').format;

Tinytest.add("base - simple api usage", function(test) {
  var name = Random.id();
  SSR.compileTemplate(name, "Hello {{name}}");
  var renderedText = SSR.render(name, {name: "arunoda"});

  test.equal(renderedText, "Hello arunoda");
});

Tinytest.add("base - using Template instance to render", function(test) {
  var name = Random.id();
  SSR.compileTemplate(name, "Hello {{name}}");
  var renderedText = SSR.render(Template[name], {name: "arunoda"});

  test.equal(renderedText, "Hello arunoda");
});

Tinytest.add("base - using Template helpers", function(test) {
  var name = Random.id();
  SSR.compileTemplate(name, "{{welcomeMessage}}, {{name}}");
  Template[name].helpers({
    welcomeMessage: function() {
      return "Good Morning";
    }
  });
  var renderedText = SSR.render(Template[name], {name: "arunoda"});

  test.equal(renderedText, "Good Morning, arunoda");
});

Tinytest.add("base - base dynamic templates", function(test) {
  var name = Random.id();
  SSR.compileTemplate(name, "Hello {{name}}");
  var name2 = Random.id();

  SSR.compileTemplate(name2, format('MeteorHacks: {{>Template.dynamic template="%s" data=user}}', name));
  var renderedText = SSR.render(name2, {user: {
    name: "arunoda"
  }});

  test.equal(renderedText, "MeteorHacks: Hello arunoda");
});

Tinytest.add("base - cursor support", function(test) {
  var name = Random.id();
  SSR.compileTemplate(name, "{{#each posts}}{{name}}, {{/each}}");

  var coll = new Mongo.Collection(Random.id());
  coll.insert({name: "nodejs"});
  coll.insert({name: "meteor"});

  var renderedText = SSR.render(name, {
    posts: coll.find()
  });

  test.equal(renderedText, "nodejs, meteor, ");
});
