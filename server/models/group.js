import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const GroupSchema = new Schema({
    user: { ref: 'User', type: mongoose.Schema.ObjectId },
    title: { type: String,  required: true },
    key: { type: String,  required: true }
});

export const GroupModel = mongoose.model('Group', GroupSchema);
