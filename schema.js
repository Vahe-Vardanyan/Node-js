var mongoose = require('mongoose');
const user = new mongoose.Schema({
    picPath: {
        type: String
    },
    text: {
        type: String
    },
    failsize: {
        type: Number
    },
    addDate: {
        type: String,
        default: Date.now()
    }
});
const UserModel = mongoose.model('User', user);
module.exports = UserModel;