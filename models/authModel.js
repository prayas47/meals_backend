const mongoose = require('mongoose'),
      Schema   = mongoose.Schema;
const { hash } = require('bcrypt')

let Crypt = require('../common/helper/crypt').crypt

let crypt = new Crypt()


const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        index: { unique: true }
    },
    password: {
        type:String,
        required:true
    },
    isActive: {
        type: Boolean,
        trim: true,
        default: true
    },
    createdAt: {
        type: Date,
        default: () => Date.now()
    },
    updatedAt: {
        type: Date,
        default: () => Date.now()
    }
})

//@ mongoose pre hook(middleware)
UserSchema.pre('save', function (next) {
    //@hash password using MD5
    this.password = crypt.hash(this.password);
    next();
});

// UserSchema.pre('update', function (next) {
//     //@hash password using MD5
//     this.password = crypt.hash(this.password);
//     next();
// });

module.exports = mongoose.model('auth' , UserSchema)