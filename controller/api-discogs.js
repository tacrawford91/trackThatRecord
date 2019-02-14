const express = require('express');
const router = express.Router();
const record = require('../models/record');

// var dis = new Discogs('MyUserAgent/1.0');
// https://api.discogs.com/artists/1/releases
const Discogs = require('disconnect').Client;
// var dis = new Discogs({ userToken: 'sYlHfWvRAkbDIAiKXRCVoVLhopAmiUjjPRJlqflw' });

var db = new Discogs({ userToken: 'sYlHfWvRAkbDIAiKXRCVoVLhopAmiUjjPRJlqflw' }).database();
var mp = new Discogs({ userToken: 'sYlHfWvRAkbDIAiKXRCVoVLhopAmiUjjPRJlqflw' }).marketplace();

// dicogs token:
// sYlHfWvRAkbDIAiKXRCVoVLhopAmiUjjPRJlqflw

// get artist records
router.get('/:artist', (req, res) => {
    const params2 = {
        artist: req.params.artist,
        per_page: 8,
        page: 1
    }

    db.search( params2, function (err, data) {
        // console.log(req.params.artist)
        // console.log(data)
        res.send(data)
    })
});

//get record price
router.get('/record/market/:id', (req, res) => {
    const params2 = {
        release_id: req.params.id,
    }

    mp.getPriceSuggestions(req.params.id, function (err, data) {
        console.log(req.params.artist)
        console.log(data)
        res.send(data)
    })
});

//POST HTT
//POST HTTP method

// router.post('/', (req, res, next) => {
//     let newRecord = new record({
//         title: req.body.title,
//         artist: req.body.artist,
//     });
//     record.addRecord(newRecord, (err, list) => {
//         if (err) {
//             res.json({ success: false, message: `Failed to create a new record. Error: ${err}` });

//         }
//         else
//             res.json({ success: true, message: "Added successfully." });

//     });
// });

//DELETE HTTP method 

router.delete('/:id', (req, res, next) => {
    //access the parameter which is the id of the item to be deleted
    let id = req.params.id;
    //Call the model method deleteListById
    record.deleteListById(id, (err, record) => {
        if (err) {
            res.json({ success: false, message: `Failed to delete the record. Error: ${err}` });
        }
        else if (record) {
            res.json({ success: true, message: "Deleted successfully" });
        }
        else
            res.json({ success: false });
    })
});

module.exports = router;