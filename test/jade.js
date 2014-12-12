Tinytest.add("jade - basic compilation", function(test) {
  var name = Random.id();
  SSR.compileTemplate(name, "| Hello #{name}", {language: "jade"});
  var renderedText = SSR.render(name, {name: "arunoda"});

  test.equal(renderedText, "Hello arunoda");
});
