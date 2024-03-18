const express = require('express');
const router = express.Router();
const departmentController = require('../Controller/department_controller');

router.post('/',departmentController.adddepartment);
router.get('/',departmentController.viewDepartments);
router.get('/:depID',departmentController.viewDepartmentById);
router.put('/:depID',departmentController.updateDepartment);
router.delete('/:depID',departmentController.deleteDepartment);

module.exports = router;