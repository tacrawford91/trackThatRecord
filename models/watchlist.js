const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const Record = require('./record');
const User = require('./user');

const WatchlistSchema = mongoose.Schema({
    name: {
        type: String,
    },
    userId: String,
    records: [{type: Schema.Types.ObjectId, ref: Record}],
    age: String,
    value: String,
});

const Watchlist = module.exports = mongoose.model('Watchlist', WatchlistSchema);

module.exports.getAllWatchlists = (callback) => {
  Watchlist.find(callback);
}

module.exports.getWatchlistById = (watchlistId, callback ) => {
  Watchlist.findById(watchlistId).populate('records').exec(callback)
    
}


module.exports.addWatchlist = (newWatchlist, callback) => {
  newWatchlist.save(callback);
}

module.exports.deleteWatchlistById = (id, callback) => {
  let query = { _id: id };
  Watchlist.remove(query, callback);
}

// add record
module.exports.addRecordToWatchlist = (userId, recordId, callback) => {
  let query = {userId: userId}
  console.log('add record to watch list', recordId)
  Watchlist.findOneAndUpdate(query,{$addToSet: {records: recordId}}, callback);
}

 //remove record from catalog
module.exports.removeRecordFromWatchlist = (watchlistId, recordId, callback) => {
  Watchlist.findOneAndUpdate(watchlistId,{$pull: {records: recordId}}, callback);
}