import mongoose, { Schema } from 'mongoose';

const ArmySchema = new Schema({
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
    description: {
        type: String,
        required: true,
    },
    phoneNumbers: {
        type: [String],
        required: true,
    },
    suburbs: {
        type: [
            {
                name: {
                    type: String,
                    required: true,
                },
                latitude: {
                    type: String,
                    required: true,
                },
                longitude: {
                    type: String,
                    required: true,
                },
            },
        ],
        required: false,
    },
    division: {
        type: String,
        required: true,
    },
});

const Army = mongoose.models.Army || mongoose.model('Army', ArmySchema, "armies");

export default Army;