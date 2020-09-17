const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    description: { 
        type: String, 
        required: true, 
        maxlength: 1000, 
        trim: true
    },
    owner: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: 'User'
    },
    ownerEmail: { 
        type: String, 
        required: true,
        ref: 'User'
    }
});

postSchema.methods.toJSON = function(){
    const post = this;
    const postObj = post.toObject();
    delete postObj.owner;
    return postObj;
}

const Posts = mongoose.model('Posts', postSchema);
module.exports = Posts;