const express = require("express");
const {
    findDepartments,
    findEmployees,
    findEmployeesInSalesFinance,
    postDepartment, 
    deleteDepartment,
    updateDepartment
} = require("./controllers");

const router = express.Router();

router.get("/getDept", findDepartments);
router.get("/getEmployee", findEmployees);
router.get('/getSales', findEmployeesInSalesFinance);

router.post('/postDept', postDepartment);
router.delete('/deleteDept', deleteDepartment);
router.put('/updateDept', updateDepartment);

module.exports = router;

