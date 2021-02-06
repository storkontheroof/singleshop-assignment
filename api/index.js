const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const port = 3001;

app.use(
  cors({
    credentials: true,
  })
);

app.get("/", (req, res, next) => {
  var fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
  res.send(`Nothing here. Please visit ${fullUrl}phones`);
});

app.get("/phones", (req, res, next) => {
  // call to backend system
  const phonesRaw = fs.readFileSync("phones.json");
  const phones = JSON.parse(phonesRaw);

  // send the response
  res.json(phones);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
