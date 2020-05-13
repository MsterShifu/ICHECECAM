
module.exports = function Cart(cart) {
    this.skins = cart.skins || {};
    this.totalskins = cart.totalskins || 0;
    this.totalPrice = cart.totalPrice || 0;

    this.skinsGet = function() {
        var tableau = [];
        for (var id in this.skins) {
            tableau.push(this.skins[id]);
        }
        return tableau;
    };

    this.skinsAdd = function(skin, id) {
        var cartskin = this.skins[id];
        if (!cartskin) {
            cartskin = this.skins[id] = {skin: skin, quantity: 0, prix: 0};
        }
        cartskin.quantity++;
        cartskin.price = cartskin.skin.prix * cartskin.quantity;
        this.totalskins++;
        this.totalPrice += cartskin.skin.prix;
    };

    this.skinsRemove = function(id) {
        this.totalskins -= this.skins[id].quantity;
        this.totalPrice -= this.skins[id].price; 
        delete this.skins[id];
    };
    
};