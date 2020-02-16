const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const positionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    cost:{
        type: Number,
        required: true
    },
    category: {
        ref: 'categories', //название коллекции
        type: Schema.Types.ObjectID //id
    },
    user: {
        ref: 'users', //название коллекции
        type: Schema.Types.ObjectID //id
    }

});

module.exports = mongoose.model('positions', positionSchema)