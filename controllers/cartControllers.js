const mysqlConnection = require("../connection.js");
var Cart = require('../models/cart');



mysqlConnection.query('SELECT * FROM test_crud.skins', function (err, rows) {
    if (err) throw err;
    products = rows;
});

// CONSTRUCTION DU PANIER EN SESSION
exports.cartId = function(req, res, next) {
    console.log(products)
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    var product = products.filter(function(skin) {
    return skin.id == productId;
});
console.log(product[0]);
cart.skinsAdd(product[0], productId);
req.session.cart = cart;
res.redirect('/');
};

//LA PAGE PANIER
exports.cart = function(req, res, next) {
    if (!req.session.cart) {
      return res.render('cart', {
        products: null
      });
    }
    var cart = new Cart(req.session.cart);
    res.render('cart', {
      title: 'le panier',
      products: cart.skinsGet(),
      totalPrice: cart.totalPrice
    });
};
// SUPPRIMER LE PANIER
exports.RemoveCart = function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
  
    cart.skinsRemove(productId);
    req.session.cart = cart;
    res.redirect('/cart');
 };