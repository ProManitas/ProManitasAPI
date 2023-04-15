const { Router } = require('express')
const { rate } = require('../controllers/controlerPost')
const { getRatings, getRatingId, deletedRatings } = require('../controllers/controlerGet')
const { deleteRating } = require('../controllers/controlerDelete')
const router = Router()

//------------------------GET
router.get('/', (req, res)=>{
    getRatings(req, res)
})

router.get('/deleted', (req, res)=>{
   deletedRatings(req, res)
})

//------------------------GET ID
router.get('/:id', (req, res)=>{
    getRatingId(req, res)
})

//------------------------POST
router.post('/:id', (req, res)=>{
    rate(req, res)
})

//------------------------DELETE
router.delete('/:id', (req, res)=>{
    deleteRating(req, res)
})

module.exports = router