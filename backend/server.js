const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');

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

const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

router.get('/getDept', (req, res) => {  
    con.query("SELECT * FROM departments ORDER BY dept_name DESC", function (err, rows) {
        console.log ("retrieving depts");
        if (err) {
            res.status(400).json({
                success: false, error: err
            });
         }
         res.json({ success: true, data: rows});
    }); 
});


router.get('/getEmployee', (req, res) => {
  con.query("SELECT * FROM employees ORDER BY last_name LIMIT 50", function (err, rows) {
        console.log("employee list retrieved");
        if (err) {
            res.status(400).json({
                success: false, error: err
            });
         }
         res.json({ success: true, data: rows});
    });  
});

router.get('/getSales', (req, res) => {
  con.query("SELECT DISTINCT * from employees_sales JOIN employees_finance  on (employees_sales.emp_no=employees_finance.emp_no)", function (err, rows) {
         console.log("employee of Sales and Finance retrieved");
         if (err) {
             res.status(400).json({
                success: false, error: err
             });
          }
         res.json({ success: true, data: rows});
    });  
});

// append /api for our http requests
app.use('/api', router);
// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));