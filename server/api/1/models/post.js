import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const PostSchema = new Schema({
    user: { ref: 'User', type: mongoose.Schema.ObjectId },
    feed: { ref: 'Feed', type: mongoose.Schema.ObjectId },
    title: { type: String, required: true },
    link: { type: String, required: true },
    author: { type: String },
    content: { type: String, required: true },
    id: { type: String, required: true },
    date: { type: Date, default: Date.now },
    read: { type: Boolean, default: false }
});

PostSchema.index({
    feed: 1,
    id: 1
}, { unique: true });

export const PostModel = mongoose.model('Post', PostSchema);
