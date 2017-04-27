import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const FeedSchema = new Schema({
    user: { ref: 'User', type: mongoose.Schema.ObjectId },
    group: { ref: 'Group', type: mongoose.Schema.ObjectId },
    title: { type: String, required: true },
    realTitle: { type: String, required: true },
    url: { type: String, required: true },
    modified: { type: Date, default: Date.now },
    count: { type: Number, default: 0 },
    unread: { type: Number, default: 0 },
    lastUpdate: { type: Date, default: null }
});

FeedSchema.index({
    user: 1,
    url: 1
}, { unique: true });

export const FeedModel = mongoose.model('Feed', FeedSchema);
