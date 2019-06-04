const express = require('express');
const router = express.Router();
const record = require('../models/record');

//GET HTTP method 
router.get('/', (req, res) => {
    console.log('basic get')
    record.getAllRecords((err, record) => {
        if (err) {
            res.json({ success: false, message: `Failed to load all record. Error: ${err}` });
        }
        else {
            res.write(JSON.stringify({ success: true, record: record }, null, 2));
            res.end();

        }
    });
});
//POST HTTP method

router.post('/save/:id', (req, res, next) => {
    let newRecord = new record({
        title: req.body.title,
        catno: req.body.catno,
        cover_image: req.body.cover_image,
        format: req.body.format,
        label: req.body.label,
        discogsId: req.body.id,
        masterId: req.body.master_id,
        masterUrl: req.body.master_url,
        style: req.body.style,
        thumb: req.body.thumb,
        type: req.body.type,
        year: req.body.year,
        uri: req.body.uri
    });
    record.addRecord(newRecord, (err, savedRecord) => {
        if (err) {
            res.json({ success: false, message: `Failed to create a new record. Error: ${err}` });

        }
        else
            res.json({ success: true, savedRecord: savedRecord });

    });
});

//find many
router.get('/recordList', (req, res) => {
  let recordArray = req.body.recordArray

  record.getRecordList(recordArray, (err, records) => {
    if (!err) {
      res.json({ success: true, records: records })
    } else {
      res.json({ success: false, message: `Failed to get record list Error: ${err}` });

    }
  })

})














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