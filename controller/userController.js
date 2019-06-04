const express = require('express');
const router = express.Router();
const user = require('../models/user');

//GET HTTP method 
//GET HTTP method 
router.get('/all', (req, res) => {
    user.getAllUsers( (err, user) => {
        if (err) {
            res.json({ success: false, message: `Failed to load all users. Error: ${err}` });
        }
        else {
            res.write(JSON.stringify({ success: true, user: user }, null, 2));
            res.end();
        }
    });
});



router.get('/guser/:id', (req, res) => {
    user.getUserByGoogle(req.params.id, (err, user) => {
        if (err) {
            res.json({ success: false, message: `Failed to load user. Error: ${err}` });
        }
        else {
            res.write(JSON.stringify({ success: true, user: user }, null, 2));
            res.end();
        }
    });
});

router.get('/fbuser/:id', (req, res) => {
    user.getUserByFacebook(req.params.id, (err, user) => {
        if (err) {
            res.json({ success: false, message: `Failed to load user. Error: ${err}` });
        }
        else {
            res.write(JSON.stringify({ success: true, user: user }, null, 2));
            res.end();
        }
    });
});




//PUT HTTP method
//create catalog
router.put('/save/catalog/:id', (req, res, next) => {
  user.addCatalog(req.params.id, req.body._id, (err,cata) => {
  });
});

//create watchlist
router.put('/save/watchlist/:id', (req, res, next) => {
  user.addWatchlist(req.params.id, req.body._id, (err,cata) => {
  });
});




//POST HTTP method
router.post('/save/:id', (req, res, next) => {
    let newUser = new user({
        name: req.body.name,
        gmail: req.body.gmail,
        email: req.body.email,
        provider: req.body.provider,
        gId: req.body.gId,
        fbId: req.body.fbId,
        image: req.body.image,
        catalog: req.body.catalog,
        watchList: req.body.watchList,
        bounds: [{}],
        tele: req.body.tele
    });
    console.log('save user hit', req.body);
    user.addUser(newUser, (err, user) => {
        if (err) {
            res.json({ success: false, message: `Failed to create a new user. Error: ${err}` });

        }
        else
            res.json({ success: true, message: "Added successfully.", user: user });

    });
});

//DELETE HTTP method 

router.delete('/delete/:id', (req, res, next) => {
    //access the parameter which is the id of the item to be deleted
    let id = req.params.id;
    //Call the model method deleteListById
    user.deleteUserById(id, (err, user) => {
        if (err) {
            res.json({ success: false, message: `Failed to delete the user. Error: ${err}` });
        }
        else if (user) {
            res.json({ success: true, message: "Deleted successfully" });
        }
        else
            res.json({ success: false });
    })
});

module.exports = router;