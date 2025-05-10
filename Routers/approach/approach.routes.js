import express from 'express';
import {
  createApproach,
  deleteApproach,
  getApproaches,
  updateApproach
} from '../../controller/approach.controller.js';
import verifyToken from '../../middleware/authMiddleware.js';

const approachRoutes  = express.Router();

approachRoutes .post('/',verifyToken, createApproach);
approachRoutes .get('/', getApproaches);
approachRoutes .put('/:id',verifyToken, updateApproach);
approachRoutes.delete('/:id', verifyToken,deleteApproach);

export default approachRoutes ;
