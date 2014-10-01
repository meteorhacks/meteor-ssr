# Server Side Rendering for Meteor with Blaze

Now, you can render Blaze templates on the server very easily. And also, you can assign helpers for templates in the server as well.

### Installation

```bash
meteor add meteorhacks:ssr
```

## Usage

Let's say we've a template in the `client/postList.html`

```html
<template name='postList'>
  <ul>
    {{#each posts query}}
      <li>{{title}}</li>
    {{/each}}
  </ul>
</template>
```

Now we can define template handlers in `lib/postList.js`. By defining template handler in `lib`, it's available for both client and the server. But you can define two different helpers as well.

```js
Template.postList.posts = function(query) {
  Posts.find(query);
}
```

Now let's render `postList` on the server side

```js
var query = {category: 'kadira'};
var data = {query: query};
var renderedHTML = SSR.render('postList', data); 
```

## API

### SSR.render(template, data)
You can render a template with data. For `template` argument you can either pass the name of the template or the actual template instance itself.

### SSR.compileTemplate(templateName, stringTemplateContent)
You can use this API to compile templates in the server. See for an example.

```js
SSR.compileTemplate('title', '<b>Hello {{user}}</b>');

// access the compiled template
Template.title.user = function() {
  return "Arunoda Susiripala";
};
```
You can also define you templates on the `/private` directry and compile them as shown below.

```js
SSR.compileTemplate('title', Assets.getText('title.html'));
```

## What can we do with SSR

Still, we can do a lot of stuff with SSR. Since, this is full Blaze on the server, you can have sub-templates, dynamic templates and all the Blaze's awesome features. These are the few things you can do with SSR.

* Render HTML pages for SEO bots
* Render HTML pages for some of your routes (you may need to serve html yourself)
* Build SEO aware static sites
* Handy email templates with Blaze

## Wow, How you did this

Actually, most of the stuff has been already done by Meteor, so kudos to Meteor team.

* This package loads all your exisitng client side templates on the server side.
* This also, adds some patches to Blaze.
* Finally, this package comes with a clean and nice API to render templates.