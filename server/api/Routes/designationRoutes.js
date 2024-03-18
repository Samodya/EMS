const express = require('express');
const router = express.Router();
const designationController = require('../Controller/designation_controller')

router.post('/',designationController.createDesignation);
router.get('/',designationController.viewDesignations);
router.get('/desName/:desName',designationController.view_designationsByName);
router.get('/desID/:desID',designationController.view_designationsByID);
router.put('/:desID',designationController.update_designation);
router.delete(':desID',designationController.delete_designation);

module.exports = router;