import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGODB_URI;

async function deleteUser() {
    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');
        
        // Better Auth typically creates a 'user' or 'users' collection.
        // Let's drop the user with the given email from both to be safe.
        const db = mongoose.connection.db;
        
        const email = "shivamsai006@gmail.com";
        
        for (const collName of ['user', 'users']) {
            const collection = db.collection(collName);
            const result = await collection.deleteOne({ email: email });
            if (result.deletedCount > 0) {
                console.log(`Successfully deleted user ${email} from collection '${collName}'`);
            }
        }
        
        console.log('Finished cleanup. You can now sign up again.');
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

deleteUser();
