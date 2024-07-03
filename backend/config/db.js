import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://jsalazarf:7i9tgLP9DuOVvBdS@cluster0.qcjleny.mongodb.net/');
        console.log('DB Connected');
    } catch (error) {
        console.error('DB Connection Error:', error);
        process.exit(1); // Salir del proceso con error
    }
};

// paskey= qCF29vazj4sumor7