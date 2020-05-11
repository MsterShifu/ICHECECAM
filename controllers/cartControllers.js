const mysqlConnection = require("../connection.js");
var Cart = require('../models/cart');



mysqlConnection.query('SELECT * FROM test_crud.skins', function (err, rows) {
    if (err) throw err;
    products = rows;
});

exports.cartId = function(req, res, next) {
    console.log(products)
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    var product = products.filter(function(skin) {
    return skin.id == productId;
});
console.log(product[0]);
cart.add(product[0], productId);
req.session.cart = cart;
res.redirect('/');
};


exports.cart = function(req, res, next) {
    if (!req.session.cart) {
      return res.render('cart', {
        products: null
      });
    }
    var cart = new Cart(req.session.cart);
    res.render('cart', {
      title: 'manulos',
      products: cart.getskins(),
      totalPrice: cart.totalPrice
    });
};

exports.RemoveCart = function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
  
    cart.remove(productId);
    req.session.cart = cart;
    res.redirect('/cart');
 };