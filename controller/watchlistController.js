const express = require('express');
const router = express.Router();
const watchlist = require('../models/watchlist');






//POST HTTP method
//create
router.post('/create/:id', (req, res, next) => {
    let newWatchlist = new watchlist({
        name: req.body.name,
        userId: req.body.userId,
        records: req.body.records,
        age: req.body.age,
        value: req.body.value,
    });

    watchlist.addWatchlist(newWatchlist, (err, watchlist) => {
        if (err) {
            res.json({ success: false, message: `Failed to create a new watchlist. Error: ${err}` });

        }
        else
            res.json({ success: true, message: "Added successfully.", watchlist: watchlist });

    });
});

//put - add record
router.put('/add-record/:userid', (req, res, next) => {
    const record = req.body.record
    watchlist.addRecordToWatchlist(req.params.userid, record, (err, newRecord) => {
        if (err) {
            res.json({ success: false, message: `Failed to add record. Error: ${err}` });

        }
        else
            res.json({ success: true, message: "Added record successfully.", newRecord: newRecord });

    });

});


//GET HTTP method 
router.get('/all', (req, res) => {
    watchlist.getAllWatchlists((err, watchlist) => {
        if (err) {
            res.json({ success: false, message: `Failed to load all watchlists. Error: ${err}` });
        }
        else {
            res.write(JSON.stringify({ success: true, user: user }, null, 2));
            res.end();
        }
    });
});



router.get('/:id', (req, res) => {
    watchlist.getWatchlistByUserId(req.params.id, (err, watchlist) => {
        if (err) {
            res.json({ success: false, message: `Failed to load user. Error: ${err}` });
        }
        else {
            res.write(JSON.stringify({ success: true, watchlist: watchlist }, null, 2));
            res.end();
        }
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