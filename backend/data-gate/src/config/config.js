import dotenv from 'dotenv';

dotenv.config();

const config = {
    dataGate: {
        port: process.env.DATA_GATE_PORT || 8004,
    },
    mongo: {
        uri: process.env.MONGO_URI || 'mongodb+srv://username_for_db:password_for_db@cluster0.4z9ub.mongodb.net/',
        dbName: process.env.DB_NAME || 'web_app_project',
    }
}

export default config;