const express = require("express");
const {
    findDepartments,
    findEmployees,
    findEmployeesInSalesFinance,
    postDepartment
} = require("./controllers");

const router = express.Router();

router.get("/getDept", findDepartments);
router.get("/getEmployee", findEmployees);
router.get('/getSales', findEmployeesInSalesFinance);

router.post('/postDept', postDepartment);


module.exports = router;

