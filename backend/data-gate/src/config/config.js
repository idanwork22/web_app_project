import dotenv from 'dotenv';

dotenv.config();

const config = {
    dataGate: {
        port: process.env.DATA_GATE_PORT || 8004,
    },
    db: {
        host: process.env.DB_HOST || 'SQL',
        port: process.env.DB_PORT || '1433',
    }
}

export default config;