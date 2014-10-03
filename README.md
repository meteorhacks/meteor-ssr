# Server Side Rendering for Meteor

Thanks to `meteorhacks:ssr`, you can now render Blaze templates on the server very easily, and you can assign helpers to server-side templates as well.

### Installation

```bash
meteor add meteorhacks:ssr
```

## Usage

Let's say we have a template in `client/postList.html`

(Note: You must create your tempalate in a place it can be seen by the client. We are not loading the template via the browser, but in order to be built templates need to be on the client.)

```html
<template name='postList'>
  <ul>
    {{#each posts query}}
      <li>{{title}}</li>
    {{/each}}
  </ul>
</template>
```

Now we can define a template handler in `lib/postList.js`. By defining a template handler in `lib`, we make it available to both the client and the server. You could also define more than one helper.

```js
Template.postList.posts = function(query) {
  Posts.find(query);
}
```

Now let's render `postList` server-side:

```js
var query = {category: 'kadira'};
var data = {query: query};
var renderedHTML = SSR.render('postList', data); 
```

## API

### SSR.render(template, data)

You can render a template with data. For the `template` argument, you can either pass the name of the template or the actual template instance itself.

### SSR.compileTemplate(templateName, stringTemplateContent)

You can use this API to compile templates on the server. For example:

```js
SSR.compileTemplate('title', '<b>Hello {{user}}</b>');

// access the compiled template
Template.title.user = function() {
  return "Arunoda Susiripala";
};
```
You can also define you templates in the `/private` directry and compile them as shown below.

```js
SSR.compileTemplate('title', Assets.getText('title.html'));
```

## What Can Be Done With SSR

Since this is the full Blaze API on the server, you can have sub-templates, dynamic templates, and all of Blaze's awesome features. These are the few things you can do with SSR:

* Render HTML pages for SEO bots.
* Render HTML pages for some of your routes (you may need to serve HTML yourself).
* Build SEO aware static sites.
* Handle email templates with Blaze.

## Wow, How Did You Do This?!

Actually, most of this stuff had already been done by Meteor, so kudos to the Meteor team.

* This package loads all your exisitng client side templates on the server side.
* This also adds some patches to Blaze.
* Finally, this package comes with a nice and clean API to render templates.
