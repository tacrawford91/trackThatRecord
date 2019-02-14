const mongoose = require('mongoose');

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
    catalog: String,
    watchList: String,
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

module.exports.deleteUserById = (id, callback) => {
    let query = { _id: id };
    User.remove(query, callback);
}