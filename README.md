it is a demo project of full stack node.js application. It has a React frontend, 

node.js backend, and a MySql sql database. It has a very basic function as a 

Progressive Web Application (PWA): the node.js backend can send push notication 

to frontend React app.

MySql is installed on a localhost for this demo project. MySql of community edition 

is installed and configured on my laptop (downloaded from https://dev.mysql.com/downloads/mysql).

MySql Magnager application (MySql Workbench) is used for managing the demo database.

The demo database is a database of employees data such as employyees, departments, salaries etc.

the following sql queries are used in this demo project:

# find all departments

SELECT * FROM departments;

# find all employees

SELECT * FROM employees;

# create a view for employees at Sales Department 

CREATE VIEW employees_sales AS

SELECT employees.emp_no, employees.first_name, employees.last_name, employees.gender, dept_emp.dept_no, 

departments.dept_name

FROM employees

INNER JOIN dept_emp ON  employees.emp_no=dept_emp.emp_no

INNER JOIN departments ON departments.dept_no=dept_emp.dept_no AND departments.dept_name="Sales" LIMIT 

2000 ;

# create  a vew for employees at Finance Department 

CREATE VIEW employees_finance AS

SELECT employees.emp_no, employees.first_name, employees.last_name, employees.gender, dept_emp.dept_no, 

departments.dept_name

FROM employees

INNER JOIN dept_emp ON  employees.emp_no=dept_emp.emp_no

INNER JOIN departments ON departments.dept_no=dept_emp.dept_no AND departments.dept_name="Finance" 

LIMIT 2000 ;

# find employees listed in departments of both Sales and Finance

SELECT DISTINCT employees_sales.first_name, employees_sales.last_name, employees_sales.emp_no, 

employees_sales.dept_name from employees_sales

JOIN employees_finance  on (employees_sales.emp_no=employees_finance.emp_no)

# add a department

const {dept_no, dept_name} = req.body.data;

let todo = [dept_no, dept_name];

let sql = `INSERT INTO departments VALUES(?, ?)`;

con.query(sql, todo, function (err, results, fields) {


# delete a department

const {dept_no, dept_name} = req.body;

let sql = "DELETE FROM departments WHERE dept_no = ?";

con.query(sql, dept_no, function (err, results, fields) {

# update a department

let todo = [dept_name, dept_no];

let sql = `UPDATE departments SET dept_name = ? WHERE dept_no = ? `;

con.query(sql, todo, function (err, results, fields) {


# Push Notification

Step 1: start service worker at React frontend 

serviceWorker.register();

subscribeUser()

Step 2:  Register to Push Manager at React frontend 

registration.pushManager.subscribe({

    applicationServerKey: convertedVapidKey,

    userVisibleOnly: true,

})

Step 3: Subscribe to Node.js backend 

fetch(`${process.env.REACT_APP_API_URL}/api/notifications/subscribe`, {

    method: 'POST',

    body: JSON.stringify(subscription),

    headers: {

      'Content-Type': 'application/json'

    }
    
  })

Step 4: Node.js backend: saving subscribing user and push notification  

     const subscription = req.body

     webpush.sendNotification(subscription, payload)

Step 5: Communication between React app and serviceWorker via api postMessage 

on app: 

navigator.serviceWorker.addEventListener('message', event => {

      console.log(`The service worker sent me a message: ${event.data}`);

    });

registration.active.postMessage("Hi service worker");

on serviceWorker: 

self.addEventListener('message', event => {
    
    console.log(`The client sent me a message: ${event.data}`);
  
    event.source.postMessage("Hi client, greeting from serviveWork");
  
  });





