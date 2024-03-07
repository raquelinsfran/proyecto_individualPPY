const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    studyMode: {
        type: String,
        required: true,
    },
});

const List = mongoose.model('List', ListSchema);

module.exports = List;
