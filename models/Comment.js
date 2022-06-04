const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;
const CommentSchema = new mongoose.Schema(
  {
    body: {
      type: String,
    },
    userId: {
      type: ObjectId,
      ref: "User",
    },
    postId:{
        type:ObjectId,
        ref:"Post"
    },
    likes: [{ type: ObjectId }],
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
