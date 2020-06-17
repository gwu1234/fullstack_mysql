var mysql = require('mysql');  
var con = mysql.createConnection({  
    host: "127.0.0.1",  
    user: "root",  
    password: "12345678",
    database: "employees"
}); 

con.connect(function(err) {  
    if (err) throw err;  
    console.log("Connected!");
}); 

exports.findDepartments = (req, res) => {
    con.query("SELECT * FROM departments ORDER BY dept_name DESC", function (err, rows) {
        console.log ("retrieving depts");
        if (err) {
            res.status(400).json({
                success: false, error: err
            });
         }
         res.json({ success: true, data: rows});
    }); 
};

exports.findEmployees = (req, res) => {
    con.query("SELECT * FROM employees ORDER BY last_name LIMIT 50", function (err, rows) {
        console.log("employee list retrieved");
        if (err) {
            res.status(400).json({
                success: false, error: err
            });
         }
         res.json({ success: true, data: rows});
    });  
};

exports.findEmployeesInSalesFinance = (req, res) => {
    con.query("SELECT DISTINCT * from employees_sales JOIN employees_finance  on (employees_sales.emp_no=employees_finance.emp_no)", function (err, rows) {
           console.log("employee of Sales and Finance retrieved");
           if (err) {
               res.status(400).json({
                  success: false, error: err
               });
            }
           res.json({ success: true, data: rows});
      });  
  };
  