const mongoose = require('mongoose')


const CommentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, 'Pls provide comment']
    },
    postId: {
        type: mongoose.Types.ObjectId,
        ref: 'Post',
        required: true,
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user'],
    },
    
}, {
    timestamps: true
})


module.exports = mongoose.model('Comment', CommentSchema)