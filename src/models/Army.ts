import mongoose, { Schema, Document } from 'mongoose';

interface IArmy extends Document {
    name: string;
    location: {
        latitude: number;
        longitude: number;
    };
    description: string;
    phoneNumbers: number[];
    suburbs?: {
        name: string;
        latitude: number;
        longitude: number;
    }[];
    division: string;
}

const ArmySchema = new Schema<IArmy>({
    name: {
        type: String,
        required: true,
    },
    location: {
        latitude: {
            type: Number,
            required: true,
        },
        longitude: {
            type: Number,
            required: true,
        },
    },
    description: {
        type: String,
        required: true,
    },
    phoneNumbers: {
        type: [Number],
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
                    type: Number,
                    required: true,
                },
                longitude: {
                    type: Number,
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

const Army = mongoose.model<IArmy>('Army', ArmySchema);

export default Army;