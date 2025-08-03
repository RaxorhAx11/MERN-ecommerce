const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id: "your-sandbox-client-id",
  client_secret: "your-sandbox-client-secret",
});

module.exports = paypal;
