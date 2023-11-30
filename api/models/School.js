const mongoose = require("mongoose");

const schoolSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      uppercase: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },

    desc: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      required: true,
      // uppercase: true
    },

    city: {
      type: String,
      required: true,
      uppercase: true,
    },

    photos: {
      type: [String],
    },

    featured: {
      type: Boolean,
      default: false,
    },

    googleRating: {
      type: String,
    },

    lga: {
      type: String,
      required: true,
      // uppercase: true
    },

    category: {
      type: String,
      required: true,
    },
    website: {
      type: String,
    },

    feeRange: {
      type: String,
      required: true,
    },

    googleProfile: {
      type: String,
    },

    approved: {
      type: Boolean,
      default: false,
    },

    images: [
      {
        type: String, // Each element in the array is a string
      },
    ],
  },
  {
    collation: { locale: "en", strength: 2 },
  },
  { timestamps: true}
  // { timestamps: true, autoCreate: true } // this was used to help create the index
);

//for random search
schoolSchema.index({
  name: "text",
  address: "text",
  state: "text",
  lga: "text",
  desc: "text",
});



const School = mongoose.model("school", schoolSchema);

// Create search indexes defined in the schema
// School.createIndexes()
//   .then(() => {
//     console.log('Indexes created successfully');
//   })
//   .catch((error) => {
//     console.error('Error creating indexes:', error);
//   });

module.exports = School;
