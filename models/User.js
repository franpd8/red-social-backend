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
    postIds:[{ type: ObjectId, ref: 'Post'}],
    commentIds:[{ type: ObjectId, ref: 'Comment'}]
    
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

module.exports = User;