Drug App task for Itransition

To run the application locally. Please follow the below steps.

1. run npm install insied Backend and Frontend folders.
2. In Backend root directory create a .env file with below variables -
PORT=3000
MONGODB_URI_DEV=mongodb://localhost:27017/drugsInfo
MONGODB_URI_PROD=mongodb://localhost:27017/drugsInfoProd # dummy production URI
NODE_ENV=development
3. Run the mongodb server and add the data.
4. run the backend with "npm start".
5. run the frontend with "npm run dev"
