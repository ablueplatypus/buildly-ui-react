.. _oauth:

OAuth Module
============

The OAuth module connects to the OAuth implementation in midgard-core and provides
functionalities related to authentication, e.g., logging in using the password flow,
logging out, retrieving and saving the access token.

Buildly UI uses the actions defined in `/src/redux/actions/Auth.actions.js` to access
these functionalities within the components.
