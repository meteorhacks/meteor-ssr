Package.describe({
  "summary": "Server Side Rendering for Meteor",
  "version": "1.0.0",
  "git": "",
  "name": "meteorhacks:ssr"
});

Package.onUse(function(api) {
  configurePackage(api);
  api.export(['Template', 'SSR'], ['server']);
});

Package.onTest(function(api) {
  configurePackage(api);
  api.use([
    'tinytest',
  ], 'server');
  
  api.addFiles([
    
  ], 'server');
});

function configurePackage(api) {
  api.versionsFrom('METEOR@0.9.2');
  api.use(['blaze', 'spacebars'], 'server');
  api.addFiles([
    'lib/overrides.js',
    'lib/template.js',
    'lib/core.js',
    'lib/api.js',
  ], 'server');
}