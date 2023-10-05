import dotenv from 'dotenv';

dotenv.config();

const config = {
    s3Gate: {
        port: process.env.S3_GATE || 8006,
    },
    s3Browser: {
        accessKeyId: process.env.accessKeyId || "from .env",
        secretAccessKey: process.env.secretAccessKey || "from .env",
        bucket: process.env.bucket || "webappproject",
        previewUrl: process.env.previewUrl || "https://webappproject.s3.us-east-1.amazonaws.com"
    }
}

export default config;