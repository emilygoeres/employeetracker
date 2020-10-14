var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "employeeTracker_db"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});

function start() {
    inquirer.prompt({
        name: "options",
        type: "list",
        message: "Please choose an option",
        choices: ["Add a Department", "Add a role", "Add an Employee", "View Department", "View a Role", "View all Employees", "QUIT"]
    }).then(function ({ options }) {
        if (options === "Add a Department") {
            addDepartment()
        } else if (options === "Add role") {
            addRole()
        } else if (options === "Add Employye") {
            addEmployee
        } else if (options === "View Departments") {
            viewDepartment()
        } else if (options === "View Roles") {
            viewRole()
        } else if (options === "View Employees") {
            viewEmployees()
        } else {
            connection.end
        }
    })
}

function addDepartment() {
    inquirer.prompt({
        name: "name",
        type: "input",
        message: "What is the name of the department you would like to add?"
    }).then(function (answers) {
        connection.query("INSERT INTO department SET ?", { title: answers.name }, function (err) {
            if (err) throw err
            start()
        })
    })
}

function addRole() {
    inquirer.prompt({
        name: "name",
        type: "input",
        message: "What is the name of the role you would like to add?"
    }).then(function (answers) {
        connection.query("INSERT INTO role SET ?", { title: answers.name }, function (err) {
            if (err) throw err
            start()
        })
    })
}

function addEmployee() {
    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "What is the first name of the employee?"
        }, {
            name: "name",
            type: "input",
            message: "What is the last name of the employee?"
        }, {
            name: "roleid",
            type: "input"
            message: "What is role ID?"

        },
    ]).then(function (answers) {
        connection.query("INSERT INTO employee SET ?"{
            if (err) throw err
            start()
        })
    })
}

const viewDepartments = async () => {
    try{
        const departmentData = await readDepartments_results[0]
        console.table(departmentData);
        promptUser();
    }
    catch(err){
        console.log(err)
    }
};

const viewRoles = async () => {
    try{
        const roleData = await readRoles_results[0]
        console.table(roleData);
        promptUser();
    }
    catch(err){
        console.log(err)
    }
};

const viewEmployees = async () => {
    try{
        const demployeeData = await readEmployees_results[0]
        console.table(employeeData);
        promptUser();
    }
    catch(err){
        console.log(err)
    }
};


