[![Build Status](https://travis-ci.org/meteorhacks/meteor-ssr.svg?branch=master)](https://travis-ci.org/meteorhacks/meteor-ssr)

# Server Side Rendering for Meteor

Now, you can render Blaze templates on the server very easily. And also, you can assign helpers for templates in the server as well.

> Previously, this package loads all the client side templates when your app starts.
> But now meteor don't allow us to do that. So that behaviour has been removed.

### Installation

```bash
meteor add meteorhacks:ssr
```

## Usage

> This package only works on the server

First create templates and helpers
~~~js
SSR.compileTemplate('emailText', 'Hello {{username}}, <br> Now time is: {{time}}');

Template.emailText.helpers({
  time: function() {
    return new Date().toString();
  }
});
~~~

Then you can render above template anywhere in your app.(only on server)
~~~js
Meteor.methods({
  sendEmail: function() {
    var html = SSR.render("emailText", {username: "arunoda"});
    console.log(html);
  }
});
~~~

### Better way to load templates

It's not a good idea to write template(html) inside javascript. So, we can use following approach.

Write your html content inside the `private` directory.

~~~html
<!-- file: private/hello.html -->
Hello {{username}}, <br>
Now time is: {{time}}
~~~

Then load it like this:
~~~js
SSR.compileTemplate('emailText', Assets.getText('hello.html'));

Template.emailText.helpers({
  time: function() {
    return new Date().toString();
  }
});
~~~

You can render the template as previously.

## API

#### SSR.render(template, data)
You can render a template with data. For `template` argument you can either pass the name of the template or the actual template instance itself.

#### SSR.compileTemplate(templateName, stringTemplateContent, [options])
You can use this API to compile templates in the server. The `options` parameter allows you to choose the template language with the `language` option. 

If not provided this default to `html` which is handled by the spacebars compiler. 
You can also use `jade` as another option — and in this case you need to add following package:
~~~
meteor add mquandalle:jade
~~~

Note: the order in which you add jade and SSR matters! First add jade as a dependency and then SSR, otherwise the jade-compiler can not be located by Meteor.

## What can we do with SSR

Since, this is full Blaze on the server, you can have sub-templates, dynamic templates and all the awesome features of Blaze. These are the few things you can do with SSR.

* Render HTML pages for SEO bots
* Render HTML pages for some of your routes (you may need to serve html yourself)
* Build SEO aware static sites
* Handy email templates with Blaze

## Wow, How you did this

Actually, most of the stuff has been already done by Meteor, so kudos to Meteor team.

* This also, adds some patches to Blaze.
* Finally, this package comes with a clean and nice API to render templates.
