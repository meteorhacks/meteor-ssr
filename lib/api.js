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

SSR.headSections = {};

SSR.loadTemplates = function(txt){
  // find template sections with name and inner text section in the template text
  var myRegexp = /\<template\s+name\s*=\s*['"](\S+)['"]\s*\>([\s\S]*?)\<\/template\s*>/g;
  var match = myRegexp.exec(txt);

  while (match != null) {      
    try{
      // for all the matches - compile the name(1) to text(2) using SSR
      // console.log('compiling '+match[1]);
      SSR.compileTemplate(match[1], match[2]);
    }catch(e){
      console.log('failed to compile template '+match[1] +' error:'+e);
    }

    // save this data in template 
    
    SSR.headSections[match[1]] = match[2];

    // get next match
    match = myRegexp.exec(txt);
  }
};

SSR.renderResponse = function (template, data, response, meta){
  // render the template itself using SSR
  var res = SSR.render(template, data);

  var output = "<!DOCTYPE html><html><head>";

  // append a common head template - if present
  if(SSR.headSections["head"])
      output += SSR.headSections["head"];

  // if template specific head is present - append that
  if(SSR.headSections[template+"-head"])
      output += SSR.headSections[template+"-head"];

  // output += "<meta name='viewport' content='width=device-width, initial-scale=1'><meta charset='utf-8'>";

  var contentType = "text/html";
  // if meta has been defined in code - append it to the head
  if(meta){
    var keys = Object.keys(meta);       
    for(var k in keys){
      var key = keys[k];
      var val = meta[key];
      if(key === "title")
      output= output + "<title>"+val+"</title>";
      else{
        if(val === "css")
         output +="<link rel='stylesheet' href='"+key+"'>";
        else{
            if(val == "script")
              output += "<script src='"+key+"'></script>"
            else{
              if(val == "content-type")
                contentType = key;
              else
                output += "<meta name='"+key+"' content='"+val+"'>";
            }
        }
      }
    }
  }

  // append result
  output += "</head><body>"+res+"</body></html>";

  //in dev mode - disable caching of responses 
  if(process.env.NODE_ENV === "development"){
    response.setHeader('cache-control', 'no-cache');
    response.setHeader('expires', '0');
    response.setHeader('charset', 'utf-8');
  }

  // write out the whole result
  response.writeHead(200, {'Content-Type': contentType});
  response.write(output);
  response.end();
}
 
