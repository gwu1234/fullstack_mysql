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
    })
};

exports.postDepartment = (req, res) => {
        console.log ("postDepartment");
        const {dept_no, dept_name} = req.body.data;
        console.log(dept_no);
        console.log(dept_name);        
        let todo = [dept_no, dept_name];
        let sql = `INSERT INTO departments VALUES(?, ?)`;
        con.query(sql, todo, function (err, results, fields) {
        if (err) {
          console.log ("sql error");  
          console.log (err);
          res.status(400).json({
              success: false, error: err
           });
           return;
         }
         console.log("sql ok");
         console.log(results.insertId);
         console.log(fields);
         res.status(200).json({ success: true, error: ""});
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
  