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
    const record_Id = req.body.record
    watchlist.addRecordToWatchlist(req.params.userid, record_Id, (err, newRecord) => {
      console.log('this is what the record controller is returning', newRecord)
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
  watchlist.getWatchlistById(req.params.id, (err, watchlist) => {
      if (err) {
          res.json({ success: false, message: `Failed to load watchlust. Error: ${err}` });
      }
      else {
          res.send(watchlist);
          // res.write(JSON.stringify({ success: true, catalog: catalog}, null, 2));
      }
  });
});








//DELETE HTTP method 


router.delete('/remove-record/:watchlistId/:recordId', (req, res, next) => {

  watchlist.removeRecordFromWatchlist(req.params.watchlistId, req.params.recordId, (err, updatedList) => {
      if (err) {
          res.json({ success: false, message: `Failed to delete the user. Error: ${err}` });
      }
      else if (updatedList) {
          res.json({ success: true, updatedList: updatedList });
      }
      else
          res.json({ success: false });
  })
});
module.exports = router;