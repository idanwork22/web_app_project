import dotenv from 'dotenv';

dotenv.config();

const config = {
    manager: {
        port: process.env.MANAGER_PORT || 8001,
    },
    dataGate: {
        url: process.env.DATA_GATE_URL || 'http://localhost:8004',
    }
}

export default config;