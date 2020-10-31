const { Router } = require("express")
const router = Router()
const midtransController = require('../controllers/chargeController')

router.post('/payment',midtransController.getToken)
// router.post('/notification',midtransController.notification)


module.exports = router
