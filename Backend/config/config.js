import dotenv from 'dotenv';
dotenv.config();

const devConfig = {
  mongoURI: process.env.MONGODB_URI_DEV,
  port: process.env.PORT || 3000,
  corsOrigin: 'http://localhost:5173',
};

const prodConfig = {
  mongoURI: process.env.MONGODB_URI_PROD,
  port: process.env.PORT || 80,
  corsOrigin: 'https://dummyFrontend.com',  //  dummy production frontend URL
};

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

export default config;
