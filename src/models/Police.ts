import mongoose, { Schema } from 'mongoose';

const PoliceSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        latitude: {
            type: String,
            required: true,
        },
        longitude: {
            type: String,
            required: true,
        },
    },
    phoneNumbers: {
        type: [String],
        required: true,
    },
    division: {
        type: String,
        required: true,
    },
    district: {
        type: String,
        required: true,
    }
});

const Police = mongoose.models.Police || mongoose.model('Police', PoliceSchema, "polices");

export default Police;