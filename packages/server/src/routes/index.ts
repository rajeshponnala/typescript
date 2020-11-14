import express from 'express'
import * as handlers from '../handlers'

export const router = express.Router()

router.post('/api/register', handlers.register)
router.post('/api/verify', handlers.verify)
router.post('/api/validate', handlers.validate)
