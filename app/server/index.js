const express = require('express');
const onFinished = require('on-finished');
const path = require('path');
const fs = require('fs-extra');

const normalizedPath = path.join(__dirname, 'routes');
const app = express();
const port = 3000;

const logger = function (req, res, next) {
  const start = new Date();

  onFinished(res, (err) => {
    const end = new Date();
    const time = end.getTime() - start.getTime();

    const file = path.join(__dirname, 'log', req.path);
    const exists = fs.pathExistsSync(file);

    if (!exists) {
      fs.ensureFileSync(file);
      fs.appendFileSync(file, 'time,code,data\n');
    }
    fs.appendFileSync(file, `${time},${res.statusCode},${res.body}\n`);
  });

  next();
};

app.use(logger);

fs.readdirSync(normalizedPath).forEach((file) => {
  const route = require(`./routes/${file}`);
  app.get(`/${route.name}`, route.callback);
});

app.listen(port, () => {
  console.log(`Experimental app listening at http://localhost:${port}`);
});
