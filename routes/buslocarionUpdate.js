import express from 'express'
import { uploadLocation } from '../controllers/upload.js';

const apl = express.Router();

apl.post('/upload',uploadLocation);

export default apl