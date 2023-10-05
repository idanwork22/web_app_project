import dotenv from 'dotenv';

dotenv.config();

const config = {
    s3Gate: {
        port: process.env.S3_GATE || 8006,
    },
    s3Browser: {
        accessKeyId: process.env.accessKeyId || "AKIA4OKJOPF5ICULC3E7",
        secretAccessKey: process.env.secretAccessKey || "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",
        bucket: process.env.bucket || "webappproject",
        previewUrl: process.env.previewUrl || "https://webappproject.s3.us-east-1.amazonaws.com"
    }
}

export default config;