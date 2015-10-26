Package.describe({
  "summary": "Server Side Rendering for Meteor with Blaze",
  "version": "2.2.0",
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
    'mquandalle:jade-compiler@0.4.4'
  ], 'server');

  api.addFiles([
    'test/base.js',
    'test/jade.js'
  ], 'server');
});

function configurePackage(api) {
  api.versionsFrom('METEOR@1.2.0.1');
  api.use('mquandalle:jade-compiler@0.4.4', { weak: true });
  api.use(['blaze', 'spacebars', 'spacebars-compiler', 'mongo', 'random'], 'server');
  api.addFiles([
    'lib/overrides.js',
    'lib/template.js',
    'lib/dynamic.js',
    'lib/api.js',
  ], 'server');
}
