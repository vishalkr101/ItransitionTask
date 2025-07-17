import express from 'express';
import { getAllDrugs } from '../Controllers/drugController.js';

const Router = express.Router();

// Drug routes
Router.get('/drugs', getAllDrugs);

export default Router;