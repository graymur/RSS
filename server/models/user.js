import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const UserSchema = new Schema({
    name: { type: String, required: true },
    outerId: { type: String, required: true },
    service: { type: String, required: true },
    image: { type: String, required: false }

});

UserSchema.index({
    outerId: 1,
    service: 1
}, { unique: true });

export const UserModel = mongoose.model('User', UserSchema);
