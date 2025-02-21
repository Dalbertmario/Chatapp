import epxress from  'express'
import { Contact, Messages, Status } from '../controller/ContactController.js'

const router = epxress.Router()

router.get('/contact/:id',Contact)
router.post('/contact/message',Messages)
router.put('/contact/status',Status)
export default router