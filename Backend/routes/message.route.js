import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { getAllSideUsers, getAllMessages, sendMessage} from '../controllers/message.controller.js';
const router = express.Router();

router.get('/users',protectRoute,getAllSideUsers);

router.get('/:id', protectRoute , getAllMessages );

router.post('/send/:id', protectRoute, sendMessage);


export default router;