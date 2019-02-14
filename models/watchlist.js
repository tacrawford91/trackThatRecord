const mongoose = require('mongoose');

const WatchlistSchema = mongoose.Schema({
    name: {
        type: String,
    },
    records: [],
    age: String,
    value: String,
});

const Watchlist = module.exports = mongoose.model('Watchlist', WatchlistSchema);

module.exports.getAllWatchlists = (callback) => {
    Watchlist.find(callback);
}

module.exports.getWatchlistByUserId = (userId, callback) => {
    Watchlist.findOne({ userId: userId }, callback);
}


module.exports.addWatchlist = (newWatchlist, callback) => {
    newWatchlist.save(callback);
}

module.exports.deleteWatchlistById = (id, callback) => {
    let query = { _id: id };
    Watchlist.remove(query, callback);
}

// add record
module.exports.addRecordToWatchlist = (userId, record, callback) => {
    let query = { userId: userId }
    Catalog.findOneAndUpdate(query, { $addToSet: { records: record.master_id } }, callback);
}