Package.describe({
  "summary": "Server Side Rendering for Meteor with Blaze",
  "version": "2.1.0",
  "git": "https://github.com/meteorhacks/meteor-ssr",
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
    'mquandalle:jade-compiler@0.4.0_3'
  ], 'server');

  api.addFiles([
    'test/base.js',
    'test/jade.js'
  ], 'server');
});

function configurePackage(api) {
  api.versionsFrom('METEOR@0.9.2');
  api.use(['blaze', 'spacebars', 'spacebars-compiler'], 'server');
  api.use('jade-compiler@0.4.0_3', { weak: true });
  api.addFiles([
    'lib/overrides.js',
    'lib/template.js',
    'lib/dynamic.js',
    'lib/api.js',
  ], 'server');
}
