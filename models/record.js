const mongoose = require('mongoose');

const RecordSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    artist: String,
    catno: String,
    cover_image: String,
    format: Array,
    label: Array,
    discogsId: Number,
    masterId: Number,
    masterUrl: String,
    style: Array,
    thumb: String,
    type: String,
    year: String,
    uri: String,
    suggestedValue:String
    
});

const Record = module.exports = mongoose.model('Record', RecordSchema);

module.exports.getAllRecords = (callback) => {
    Record.find(callback);
}

module.exports.addRecord = (newRecord, callback) => {
    newRecord.save(callback);
}

module.exports.deleteRecordById = (id, callback) => {
    let query = { _id: id };
    Record.remove(query, callback);
}


