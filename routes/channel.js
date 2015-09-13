var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.status(400).send('Bad Request');
});

router.get('/:id', function (req, res, next) {
  res.status(400).send('Bad Request');
});

router.post('/:id', function (req, res, next) {
  res.status(400).send('Bad Request');
});

router.get('/:id/message/', function (req, res, next) {
  var channel = req.params.id;
  var client = req.app.locals.redis;
  client.zrange(channel, 0, -1, function (err, data) {
    res.app.locals.winston.debug(data);
    if (err) {
      res.status(500).json(err);
    }
    else {

      if (!Array.isArray(data)) {
        data = [data];
      }

      res.status(200).json(data.map(function (i) {
        return JSON.parse(i);
      }));
    }
  });
});

router.post('/:id/message/', function (req, res, next) {

  res.app.locals.winston.debug(req.body);

  if (!req.body || !req.body.message || !req.body.user) {
    res.status(400).send('Bad Request');
    return;
  }

  var message = req.body.message;
  var channel = req.params.id
  var user = req.body.user;
  var now = new Date();

  var client = req.app.locals.redis;

  client.zadd(channel, now.valueOf(), JSON.stringify({ "message": message, "user": user, "date": now.valueOf() }));
  res.sendStatus(200);
});

module.exports = router;
