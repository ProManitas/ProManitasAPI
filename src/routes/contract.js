const { Router } = require('express')
const router = Router()
const { getContracts, getContractId, deletedContracts } = require('../controllers/controlerGet');
const { newContract } = require('../controllers/controlerPost');
const { deleteContract } = require('../controllers/controlerDelete');
const { updateContract } = require('../controllers/controlerPut');

//--------------------GET
router.get('/', (req, res)=>{
    getContracts(req, res)
  })

router.get('/deleted', (req, res)=>{
  deletedContracts(req, res)
})
  
  //--------------------GET ID
  router.get('/:id', (req, res)=>{
    getContractId(req, res)
  })

//--------------------POST 
  router.post('/', (req, res)=>{
    newContract(req, res)
  })

//--------------------PUT
  router.put('/:id', (req, res)=>{
    updateContract(req, res)
  })

//---------------------DELETE
  router.delete('/:id', (req, res) =>{
    deleteContract(req, res)
  })

  module.exports = router
