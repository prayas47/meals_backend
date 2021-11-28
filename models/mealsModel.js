const mongoose = require('mongoose')
let Crypt = require('../common/helper/crypt').crypt
let crypt = new Crypt()


const mealsSchema = new mongoose.Schema({
    mealName:{
        type:String,
        required:true,
        index: { unique: true }
    },
    calories: {
        type:Number,
        required:true
    },
    isActive: {
        type: Boolean,
        trim: true,
        default: true
    }
},{
    timestamps:{
        createdAt:"createdAt",
        updatedAt:"updatedAt",
    }
})

module.exports = mongoose.model('meals' , mealsSchema)