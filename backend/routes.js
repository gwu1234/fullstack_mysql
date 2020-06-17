const express = require("express");
const {
    findDepartments,
    findEmployees,
    findEmployeesInSalesFinance
} = require("./controllers");

const router = express.Router();

router.get("/getDept", findDepartments);
router.get("/getEmployee", findEmployees);
router.get('/getSales', findEmployeesInSalesFinance);

module.exports = router;

