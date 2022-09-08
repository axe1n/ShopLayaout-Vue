const cart = require('./cart');
const fs = require('fs');

const actions = {
  add: cart.add,
  change: cart.change,
  remove: cart.remove,
};

const handler = (req, res, action, file) => {
  fs.readFile(file, 'utf-8', (err, data) => {
    if (err) {
      return res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
    }

    const newCart = actions[action](JSON.parse(data), req);

    fs.writeFile(file, newCart, (err) => {
      if (err) {
        return res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
      }

      res.send(JSON.stringify({ result: true }));
    });
  });
};

module.exports = handler;
