import express from 'express'
import { search } from '../controller/UserSearchController.js'

const router = express.Router()

router.get('/:userid/search',search)

export default router