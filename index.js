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

// Give the user a list of options to choose from
function start() {
    inquirer.prompt({
        name: "options",
        type: "list",
        message: "Please choose an option",
        choices: ["Add a Department", "Add role", "Add Employees", "View Departments", "View Roles", "View Employees", "Update EmployeeRole", "QUIT"]
    }).then(function ({ options }) {
        if (options === "Add a Department") {
            addDepartment()
        } else if (options === "Add role") {
            addRole()
        } else if (options === "Add Employees") {
            addEmployees()
        } else if (options === "View Departments") {
            viewDepartments()
        } else if (options === "View Roles") {
            viewRoles()
        } else if (options === "View Employees") {
            viewEmployees()
        } else if (options === "Update EmployeeRole") {
            updateEmployeeRole()
        } else {
            connection.end()
            process.exit(0)
        }
    })
}

// Add a department 
function addDepartment() {
    inquirer.prompt({
        name: "name",
        type: "input",
        message: "What is the name of the department you would like to add?"
    }).then(function (answers) {
        connection.query("INSERT INTO department SET ?", { name: answers.name }, function (err, response) {
            if (err) throw err
            console.log(response);
            console.log("Added Department")
            start()
        })
    })
}

// Add a role
function addRole() {
    inquirer.prompt([{
        name: "title",
        type: "input",
        message: "What is the name of the role you would like to add?"
    },
    {
        name: "salary",
        type: "input",
        message: "What is the salary?"
    },
    {
        name: "department_id",
        type: "list",
        choices: [1, 2, 3],
        message: "What is the department id?"
    }
    ]).then(function (answers) {
        connection.query("INSERT INTO role SET ?", { title: answers.title, salary: answers.salary, department_id: answers.department_id }, function (err) {
            if (err) throw err
            console.table("Added role");
            // console.log("Added Role")

            start()
        })
    })
}

// Add an employee
function addEmployees() {
    inquirer.prompt([
        {
            name: "first_name",
            type: "input",
            message: "What is the first name of the employee?"
        }, {
            name: "last_name",
            type: "input",
            message: "What is the last name of the employee?"
        }, {
            name: "role_id",
            type: "list",
            choices: [1, 2, 3, 4],
            message: "What is role ID?"
        },
        {
            name: "manager_id",
            type: "input",
            message: "What is manager ID?"
        }
    ]).then(function (answers) {
        connection.query("INSERT INTO employee SET ?", { first_name: answers.first_name, last_name: answers.last_name, role_id: answers.role_id, manager_id: answers.manager_id },
            function (err, response) {
                if (err) throw err
                console.table("Added Employee");
                // console.log("Added Employee")
                start()
            })
    })
}

// View a list of departments
const viewDepartments = () => {
    connection.query("SELECT * FROM department", function (err, response) {
        if (err) throw err
        console.log("View Departments", response)
        start()
    })
}
const getDepartments = async () => {
    try {
        const departmentsData = await readDepartments_results[0]
        console.table(departmentsData);
        start();
    }
    catch (err) {
        console.log(err)
    }
};

// View a list of roles
const viewRoles = () => {
    connection.query("SELECT * FROM role", function (err, response) {
        if (err) throw err
        console.log("View Roles", response)
        start()
    })
}
const getRoles = async () => {
    try {
        const rolesData = await readRoles_results[0]
        console.table(rolesData);
        start();
    }
    catch (err) {
        console.log(err)
    }
};

// View a list of employees
const viewEmployees = () => {
    connection.query("SELECT * FROM employee", function (err, response) {
        if (err) throw err
        console.log("View Employees", response)
        start()
    })
}
const getEmployees = async () => {
    try {
        const employeesData = await readEmployees_results[0]
        console.table(employeeData);
        start();
    }
    catch (err) {
        console.log(err)
    }
};

// Update employee Role
const updateEmployeeRole = () => {
    inquirer.prompt([{
        name: "options",
        type: "list",
        message: "Please choose an employee?",
        choices: ["emily goeres", "emily smith", "alicia edem", "alicia shumovich", "sue loo", ]
    },
    // {
    //     name: "newRole",
    //     type: "list",
    //     message: "Please choose a new role?",
    //     choices: ["server", "cook", "Tractor Driver", "groundskeeper", "manager", ]
    // },
    {
        name: "role_id",
        type: "input",
        message: "What is the new role id?"
    }
    ]).then(function (answers) {
        var name_split=answers.options.split(" ");
        var firstName=name_split[0];
        var lastName=name_split[1];
        connection.query("UPDATE employee SET role_id='"+answers.role_id+"' WHERE first_name='"+firstName+"' AND last_name='"+lastName+"'",
        [answers.options, answers.role_id],
            (err, data) => {
                if (err) throw err;
                console.table("Updated role")
                start();
            })
        })
    }
    
