const app = require("./app");
require('newrelic');
let port = 4006;

app.listen(port, function () {
  console.log(`listening at port ${port}`);
});

