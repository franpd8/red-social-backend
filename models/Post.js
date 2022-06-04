const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;
const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Debe especificar un título para su post"],
    },
    body: {
      type: String,
      required: [true, "Debe especificar un descripción para su post"],
    },
    userId: {
      type: ObjectId,
      ref: "User",
    },
    likes: [{ type: ObjectId }],
    comments:[{ type: ObjectId, ref: 'Comment'}],
    

  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
