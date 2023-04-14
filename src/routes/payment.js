const { Router } = require('express');
const { createStripeSession } = require('../Payment gateway/payment');
const router = Router()

//--------------------POST
router.post("/", (req, res)=>{
  createStripeSession(req, res)
})
  

module.exports = router