const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;


const UserSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true, 'Introduzca su usuario']},
    email:{
        type: String,
        required: [true,'Introduzca su email'],
        unique: true,
        match: [/.+\@.+\..+/,"Introduzca un email válido"],
      },
    password:{
        type: String,
        required: [true,'Introduzca una contraseña']
    },
    role: String,
    confirmed: Boolean,
    tokens:[],
    likedPosts: [{ type: ObjectId, ref: 'Post' }],
    postIds:[{ type: ObjectId, ref: 'Post'}],
    commentIds:[{ type: ObjectId, ref: 'Comment'}],
    
    
}, { timestamps: true });

UserSchema.methods.toJSON = function() {
    const user = this._doc;
    delete user.tokens;
    delete user.password;
    return user;
}

const User = mongoose.model('User', UserSchema);

module.exports = User;