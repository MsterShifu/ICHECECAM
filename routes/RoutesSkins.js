const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const skinController = require('../controllers/skinControllers.js');
const cartController = require('../controllers/cartControllers.js');
const loginController = require('../controllers/loginControllers.js');
const footerController = require('../controllers/footerControllers.js');
const skinControllerApi = require ('../controllers/skinControllersApi.js');
const loginControllerApi = require ('../controllers/loginControllersApi');
var Cart = require('../models/cart');


// ROUTES SKINS

router.get('/', skinController.mainrender);

router.get('/skin/add', skinController.SkinAdd);

router.post('/skin/save', skinController.SkinSave);

router.get('/skin/edit/:userId', skinController.SkinEdit);

router.put('/skin/update', skinController.updateSkin);

router.get('/skin/delete/:userId', skinController.SkinDelete);

router.get('/skin/get/:userId', skinController.SkinGet);

// API ROUTES SKIN

router.get('/api/skin', skinControllerApi.api); //ok

router.post('/api/skin', skinControllerApi.SkinSaveApi); //ok

router.put('/api/skin', skinControllerApi.updateSkinApi); //ok

router.get('/api/skin/:userId', skinControllerApi.SkinEditApi); //ok

router.delete('/api/skin/:userId', skinControllerApi.SkinDeleteApi); //ok

// PANIER ROUTES SESSION

router.get('/cart/:id', cartController.cartId);

router.get('/cart', cartController.cart);

router.get('/removeCart/:id', cartController.RemoveCart);

//LOGIN ROUTES

router.get('/signup/now', loginController.signupNow);

router.post('/signup', loginController.signup); 

router.get('/login/now', loginController.loginNow);

router.post('/login', loginController.login); // pq post ??

router.get('/profil', loginController.profil);

router.get('/logout', loginController.logout);

router.get('/profil/update/:userId', loginController.profilUpdate);

router.post('/profil/update/', loginController.updateProfil);

//LOGIN API ROUTES


router.post('/api/signup', loginControllerApi.signup); //ok

router.get('/api/login', loginControllerApi.login); //ok 

router.get('/api/profil/update/:userId', loginControllerApi.profilUpdate); //ok

router.put('/api/profil/update/', loginControllerApi.updateProfil); //ok

//AUTRES ROUTES

router.get('/infoleg', footerController.infoleg);


  
module.exports = router;