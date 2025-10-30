const express = require('express');
const router = express.Router();
const nurseController = require('../controllers/nurseController');

router.get('/', nurseController.getAllNurses);
router.post('/', nurseController.addNurse);
router.post('/', nurseController.createNurse);
router.put('/:id', nurseController.updateNurse);
router.delete('/:id', nurseController.deleteNurse);
router.get('/download/:type', nurseController.downloadData);

module.exports = router;