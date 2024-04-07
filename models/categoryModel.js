import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        lowercase: true
    },
    isFeatured: {
        type: Boolean,
        default: false
    }
})

export default mongoose.model('Category', categorySchema);