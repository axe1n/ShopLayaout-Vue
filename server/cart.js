const changeQuantityGoods = (cart) => {
  cart.quantityGoods = cart.contents.reduce(
    (acc, product) => acc + product.quantity,
    0
  );
};

const changeAmount = (cart) => {
  cart.amount = cart.contents.reduce(
    (acc, product) => acc + +product.price * +product.quantity,
    0
  );
};

const add = (cart, req) => {
  cart.contents.push(req.body);
  changeQuantityGoods(cart);
  changeAmount(cart);

  return JSON.stringify(cart, null, 4);
};

const change = (cart, req) => {
  const findProduct = cart.contents.find(
    (el) => el.id_product === +req.params.id
  );

  findProduct.quantity += req.body.quantity;
  changeQuantityGoods(cart);
  changeAmount(cart);

  return JSON.stringify(cart, null, 4);
};

const remove = (cart, req) => {
  cart.contents.splice(cart.contents.indexOf(req.params), 1);
  changeQuantityGoods(cart);
  changeAmount(cart);

  return JSON.stringify(cart, null, 4);
};

module.exports = {
  add,
  change,
  remove,
};
