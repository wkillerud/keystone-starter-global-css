import 'dotenv/config';

/*
Welcome to Keystone! This file is what keystone uses to start the app.

It looks at the default export, and expects a Keystone config object.

You can find all the config options in our docs here: https://keystonejs.com/docs/apis/config
*/

import { config } from '@keystone-6/core';

// Look in the schema file for how we define our lists, and how users interact with them through graphql or the Admin UI
import { lists } from './schema';

// Keystone auth is configured separately - check out the basic auth setup we are importing from our auth file.
import { withAuth, isAccessAllowed, session } from './auth';
import { storage } from './storage';

export default withAuth(
  // Using the config function helps typescript guide you to the available options.
  config({
    // the db sets the database provider - we're using sqlite for the fastest startup experience
    db: {
      provider: 'sqlite',
      url: 'file:./keystone.db',
      useMigrations: true,
    },
    // This config allows us to set up features of the Admin UI https://keystonejs.com/docs/apis/config#ui
    ui: {
      isAccessAllowed,
    },
    server: {
      // If set to true, a /_healthcheck endpoint will be added to your server which will respond with { status: 'pass', timestamp: Date.now() }.
      healthCheck: true,
    },
    graphql: {
      queryLimits: { maxTotalResults: 1000 },
    },
    storage,
    lists,
    session,
  })
);
