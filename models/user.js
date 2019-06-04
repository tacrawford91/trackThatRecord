const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const Catalog = require('./catalog');
const Watchlist = require('./watchlist');


const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    gmail: String,
    email: String,
    provider: String,
    gId: String,
    fbId: String,
    image: String,
    catalog: {type: Schema.Types.ObjectId, ref: Catalog},
    watchlist: {type: Schema.Types.ObjectId, ref: Watchlist},
    bounds:[{}],
    tele: String
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getAllUsers = (callback) => {
    User.find(callback);
}

module.exports.getUserByGoogle = (googleId,callback) => {
    User.findOne({gId: googleId}, callback);
}

module.exports.getUserByFacebook = (facebookId, callback) => {
    User.findOne({ fbId: facebookId }, callback);
}

module.exports.addUser = (newUser, callback) => {
    newUser.save(callback);
}

module.exports.addCatalog = (userId, catalogId, callback) => {
  
  User.findByIdAndUpdate(userId,{
    catalog: catalogId
  }, callback);
}

module.exports.addWatchlist = (userId, watchlistId, callback) => {
  
  User.findByIdAndUpdate(userId,{
    watchlist: watchlistId
  }, callback);
}

module.exports.deleteUserById = (id, callback) => {
    let query = { _id: id };
    User.remove(query, callback);
}