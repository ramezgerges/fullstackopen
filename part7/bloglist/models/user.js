const mongoose = require("mongoose");
const validator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    minlength: 3
  },
  passwordHash: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog"
    }
  ]
});

userSchema.plugin(validator);

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString(); // eslint-disable-line no-underscore-dangle
    delete returnedObject._id; // eslint-disable-line no-underscore-dangle
    delete returnedObject.__v; // eslint-disable-line no-underscore-dangle
    delete returnedObject.passwordHash;
  }
});

module.exports = mongoose.model("User", userSchema);
