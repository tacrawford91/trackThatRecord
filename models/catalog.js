const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const Record = require('./record');
const User = require('./user');

const CatalogSchema = mongoose.Schema({
    name: {
        type: String,
    },
    userId: String,
    records: [{type: Schema.Types.ObjectId, ref: Record}],
    age: String,
    value: String,
});

const Catalog = module.exports = mongoose.model('Catalog', CatalogSchema);

module.exports.getAllCatalogs = (callback) => {
    Catalog.find(callback);
}

module.exports.getCatalogById = (catalogId, callback ) => {
    Catalog.findById(catalogId).populate('records').exec(callback)
      
}


module.exports.addCatalog = (newCatalog, callback) => {
    newCatalog.save(callback);
}

module.exports.deleteCatalogById = (id, callback) => {
    let query = { _id: id };
    Catalog.remove(query, callback);
}

// add record
module.exports.addRecordToCatalog = (userId, recordId, callback) => {
    let query = {userId: userId}
    Catalog.findOneAndUpdate(query,{$addToSet: {records: recordId}}, callback);
}

//remove record from catalog
module.exports.removeRecordFromCatalog = (catalogId, recordId, callback) => {
  Catalog.findOneAndUpdate(catalogId,{$pull: {records: recordId}}, callback);
}