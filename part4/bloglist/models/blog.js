const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true,
    unique: true
  },
  likes: {
    type: Number,
    required: true
  }
});

blogSchema.plugin(uniqueValidator);

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    // eslint-disable-next-line no-underscore-dangle
    returnedObject.id = returnedObject._id.toString(); // eslint-disable-line no-underscore-dangle
    delete returnedObject._id; // eslint-disable-line no-underscore-dangle
    delete returnedObject.__v; // eslint-disable-line no-underscore-dangle
  }
});

module.exports = mongoose.model("Blog", blogSchema);
