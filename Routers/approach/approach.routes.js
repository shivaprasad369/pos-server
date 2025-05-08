import express from 'express';
import {
  createApproach,
  deleteApproach,
  getApproaches,
  updateApproach
} from '../../controller/approach.controller.js';

const approachRoutes  = express.Router();

approachRoutes .post('/', createApproach);
approachRoutes .get('/', getApproaches);
approachRoutes .put('/:id', updateApproach);
approachRoutes.delete('/:id', deleteApproach);

export default approachRoutes ;
