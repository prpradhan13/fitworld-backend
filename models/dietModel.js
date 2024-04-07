import mongoose from "mongoose";

const dietSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
    plan: [
        {
            mealName: {
                type: String,
                required: true,
            },
            food: {
                type: String,
                required: true,
            },
            calories: {
                type: Number,
            },
            protien: {
                type: Number,
            },
            carbs: {
                type: Number,
            },
            fat: {
                type: Number,
            },
        },
    ],
}, { timestamps: true });

export default mongoose.model('Dite', dietSchema);