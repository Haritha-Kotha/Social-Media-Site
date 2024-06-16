const router = require('express').Router()
//importing controllers
const { registerAuth, loginAuth} = require('../controllers/authController')


//routes
router.post('/register',registerAuth)//register route

router.post('/login',loginAuth)//login route

//exporting
module.exports=router