const { Schema, model } = require('mongoose');

const TodoSchema = new Schema({
    text: {
        type: String,
        required: [true, 'You cannot leave blank. Please input text']
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    },
    completed: {
        type: Boolean,
        default: false
    },
    user: { type: Schema.Types.ObjectId, ref: 'User' },


});

module.exports = model('Todo', TodoSchema);