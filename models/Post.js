const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    images: [
        {
          public_id: {
            type: String,
            required: true,
          },
          url: {
            type: String,
            required: true,
          },
        },
    ],
    description: {
        type: String,
        minlength: 1,
        maxlength: 200
    },
    likes: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    comments: [{ 
      type: mongoose.Types.ObjectId, 
      ref: 'Comment' 
    }],
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user'],
    },
}, {
    timestamps: true
})


module.exports = mongoose.model('Post', PostSchema)
