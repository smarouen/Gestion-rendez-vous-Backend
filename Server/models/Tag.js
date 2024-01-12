const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,  // Make it required
        ref: 'User'
    },
    name: {
        type: String,
        required: false,
    },
    color: {
        type: String,
        required: false,
    }
});

const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;
