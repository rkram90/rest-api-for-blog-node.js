//ODM
//Object Data Mapping
/*
Database -> documents -> record
*/
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Post = mongoose.model("Post", PostSchema);

module.exports = { Post };