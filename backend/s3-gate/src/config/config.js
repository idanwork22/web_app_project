import dotenv from 'dotenv';

dotenv.config();

const config = {
    s3Gate: {
        port: process.env.S3_GATE || 8006,
    },
    s3Browser: {
        host: process.env.S3_HOST || 's3.amazonaws.com',
        port: process.env.S3_PORT || '80',
    }
}

export default config;