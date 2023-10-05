const mongoose = require('mongoose')

const schoolSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        uppercase: true
    },
    email:{
        type: String,
        required: true,
        lowercase: true,
    },
    address:{
        type: String,
        required: true
    },
    phone:{
        type: Number,
        required: true
    },

    desc:{
        type: String,
        required: true,
    },

    state:{
        type: String,
        required: true,
        // uppercase: true
    },

    city:{
        type: String,
        required: true,
        uppercase: true
    },

    photos:{
        type: [String],
    },

    featured:{
        type: Boolean,
        default: false
    },

    googleRating:{
        type: Number,
        required: true
    },

    lga:{
        type: String,
        required: true,
        // uppercase: true
    },
    
    category:{
        type: String,
        required: true
    },
    website:{
        type: String,
        required: true
    },
  
    feeRange:{
        type: String,
        required: true
    },

    googleProfile:{
        type: String,
        required: true
    },

},{
    collation: { locale: 'en', strength: 2 }
 }, {timestamps: true})

const School = mongoose.model('school', schoolSchema)
module.exports = School