const express = require('express');
const router = express.Router();
const catalog = require('../models/catalog');






//POST HTTP method
//create
router.post('/create/:id', (req, res, next) => {
    let newCatalog = new catalog({
        name: req.body.name,
        userId: req.body.userId,
        records: req.body.records,
        age: req.body.age,
        value: req.body.value,
    });

    catalog.addCatalog(newCatalog, (err, catalog) => {
        if (err) {
            res.json({ success: false, message: `Failed to create a new catalog. Error: ${err}` });

        }
        else
            res.json({ success: true, message: "Added successfully.", catalog: catalog });

    });
});



//put - add record
router.put('/add-record/:userid', (req, res, next) => {
    const record_Id = req.body.record
    catalog.addRecordToCatalog(req.params.userid, record_Id, (err, newRecord) => {
        if (err) {
            res.json({ success: false, message: `Failed to add record. Error: ${err}` });

        }
        else
            res.json({ success: true, message: "Added record successfully.", newRecord: newRecord });

    });

});


//GET HTTP method 
router.get('/all', (req, res) => {
    catalog.getAllCatalogs((err, catalog) => {
        if (err) {
            res.json({ success: false, message: `Failed to load all catalogs. Error: ${err}` });
        }
        else {
            res.write(JSON.stringify({ success: true, catalog: catalog }, null, 2));
            res.end();
        }
    });
});



router.get('/:id', (req, res) => {
    catalog.getCatalogById(req.params.id, (err, catalog) => {
        if (err) {
            res.json({ success: false, message: `Failed to load user. Error: ${err}` });
        }
        else {
            res.send(catalog);
            // res.write(JSON.stringify({ success: true, catalog: catalog}, null, 2));
        }
    });
});








//DELETE HTTP method 

router.delete('/remove-record/:catalogId/:recordId', (req, res, next) => {
   
    catalog.removeRecordFromCatalog(req.params.catalogId, req.params.recordId, (err, updatedList) => {
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