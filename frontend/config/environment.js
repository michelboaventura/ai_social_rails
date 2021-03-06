/* eslint-env node */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'lemonade-ember',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    'ember-simple-auth': {
      authorizer: 'authorizer:oauth2',
      authenticationRoute: '/landing-page',
      routeAfterAuthentication: '/ferramenta/filtros',
      routeIfAlreadyAuthenticated: '/ferramenta/filtros'
    },
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.mj_data_explorer = 'http://localhost:8000'
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.mj_data_explorer = 'http://ceweb.speed.dcc.ufmg.br';
  }

  if (environment === 'staging') {
    ENV.mj_data_explorer = 'http://staging-ceweb.speed.dcc.ufmg.br';
  }

  if (environment === 'docker') {
    ENV.mj_data_explorer = '/';
  }

  return ENV;
};
