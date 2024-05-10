// where your node app starts

var express = require("express");
var app = express();

var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date?", (req, res) => {
  let input = req.params.date;

  let isValidDate = Date.parse(input);

  let isValidUnixNumber = /^[0-9]+$/.test(input);

  let isEmpty = input == "" || input == null;

  let unix_output = 0;
  let utc_output = "";

  if (isValidDate) {
    unix_output = new Date(input);
    utc_output = unix_output.toUTCString();
    return res.json({ unix: unix_output.valueOf(), utc: utc_output });
  } else if (isNaN(isValidDate) && isValidUnixNumber) {
    unix_output = new Date(parseInt(input));
    utc_output = unix_output.toUTCString();
    return res.json({ unix: unix_output.valueOf(), utc: utc_output });
  } else if (isEmpty) {
    unix_output = new Date();
    utc_output = unix_output.toUTCString();
    return res.json({ unix: unix_output.valueOf(), utc: utc_output });
  } else {
    res.json({ error: "Invalid Date" });
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
