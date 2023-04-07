const moogoose = require('mongoose');
const Schema = moogoose.Schema;

const userSchema = new Schema({
    firstname: String,
    lastname: String,
    age: Number,
    coordinate: String,
}, {
    timestamps: true //createdAt and updatedAt
});

const User = moogoose.model('User', userSchema);

module.exports = User;