const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => {
  console.log(user);
  console.log(user.email);
  console.log(user.displayName);
});