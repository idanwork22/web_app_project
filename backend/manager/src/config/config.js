import dotenv from 'dotenv';

dotenv.config();

const config = {
    manager: {
        port: process.env.MANAGER_PORT || 8001,
        host: process.env.MANAGER_PORT || "localhost",
    },
    dataGate: {
        url: process.env.DATA_GATE_URL || 'http://localhost:8004',
    },
    s3Gate: {
        url: process.env.S3_GATE_URL || 'http://localhost:8006',
    }
}

export default config;