const { Levenshtein } = require('hermetrics');

const levenshtein = new Levenshtein();

module.exports = {
  name: 'hermetrics',
  callback: (req, res) => {
    const { a, b } = req.query;

    const distance = levenshtein.distance(a, b);
    res.body = distance.toString();
    res.send(res.body);
  },
};
