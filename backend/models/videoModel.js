import { Schema, model } from "mongoose";

const commentSchema = new Schema(
    {
        author: { type: String, require: true },
        comment: { type: String, require: true },
    },
    {
        timestamps: true,
    },
);

const videoSchema = new Schema(
    {
        title: { type: String, require: true },
        author: { type: String, require: true },
        views: { type: Number, require: true, default: 0 },
        pathvideo:{ type: String, require: true },
        comments:[commentSchema],
    },
);

const videoModel = model('Video',videoSchema);
export default videoModel;