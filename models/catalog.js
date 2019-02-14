const mongoose = require('mongoose');

const CatalogSchema = mongoose.Schema({
    name: {
        type: String,
    },
    userId: String,
    records: [],
    age: String,
    value: String,
});

const Catalog = module.exports = mongoose.model('Catalog', CatalogSchema);

module.exports.getAllCatalogs = (callback) => {
    Catalog.find(callback);
}

module.exports.getCatalogByUserId = (userId, callback) => {
    Catalog.findOne({ userId: userId }, callback);
}


module.exports.addCatalog = (newCatalog, callback) => {
    newCatalog.save(callback);
}

module.exports.deleteCatalogById = (id, callback) => {
    let query = { _id: id };
    Catalog.remove(query, callback);
}

// add record
module.exports.addRecordToCatalog = (userId, record, callback) => {
    let query = {userId: userId}
    Catalog.findOneAndUpdate(query,{$addToSet: {records: record.master_id}}, callback);
}