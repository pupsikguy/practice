const leven = require('leven');

module.exports = {
  name: 'leven',
  callback: (req, res) => {
    const { a, b } = req.query;

    const distance = leven(a, b);
    res.body = distance.toString();
    res.send(res.body);
  },
};
