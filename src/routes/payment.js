const { Router } = require('express');
const { createStripeSession } = require('../Payment gateway/payment');
const { getContracts, getContractId } = require('../controllers/controlerGet');
const router = Router()

//--------------------POST
router.post("/", (req, res)=>{
  createStripeSession(req, res)})
  

//--------------------GET
router.get('/contracts', (req, res)=>{
  getContracts(req, res)
})

//--------------------GET ID
router.get('/contracts/:id', (req, res)=>{
  getContractId(req, res)
})

module.exports = router