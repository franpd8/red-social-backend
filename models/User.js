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
    alias:{type:String},
    avatar:{type:String},
    header:{type:String},
    link:{type:String},
  bio:{type:String},
    role: String,
    confirmed: Boolean,
    tokens:[],
    followers: [{ type: ObjectId, ref: 'User' }],
    following:[{type: ObjectId, ref:'User'}],
    likedPosts: [{ type: ObjectId, ref: 'Post' }],
    likedComments: [{ type: ObjectId, ref: 'Comment' }],
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