const mysql = require("mysql");
const inquirer = require("inquirer");

// Initialize connection to database 
let connection = mysql.createConnection({
    host: "localhost",
    // Your port; if not 3306
    port: 8889,
    // Your username
    user: "root",
    // Your password
    password: "root",
    database: "bamazon"
  });

  connection.connect(function(err) {
    if (err) throw err;
    managerPrompt();
});

function managerPrompt () {
    inquirer.prompt([
        {
        name: "managerOptions",
        type: "list",
        message: "What would you like to do?",
        choices: ["View products for sale", "View low inventory",
                    "Add to inventory", "Add new product"]
        }
    ]).then(function(selection) {
        
        if (selection.managerOptions === "View products for sale") {
            viewAll();
        }
        else if (selection.managerOptions === "View low inventory") {
            viewLow();
        }
        else if (selection.managerOptions === "Add to inventory") {
            updateInventory();
        }
        else if (selection.managerOptions === "Add new product") {
            newProduct();
        }
    });
};

function viewAll () {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log("Current Inventory (Manager View)");

        for (let record in res) {
            let product = res[record];
            console.log(
                "Product ID:", product.id, "|",
                "Product:", product.product_name, "|",
                "Department:", product.department_name, "|",
                "Price ($):", product.price, "|",
                "Inventory", product.stock_quantity, "|"
                );
            };
    });
};

function viewLow () {
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err, res) {
        if (err) throw err;
        console.log("Low Inventory (less than 5 remaining)");

        for (let rec in res) {
            let product = res[rec];
            console.log(
                "Product ID:", product.id, "|",
                "Product:", product.product_name, "|",
                "Department:", product.department_name, "|",
                "Price ($):", product.price, "|",
                "Inventory", product.stock_quantity, "|"
                );
        };
    });
};

function updateInventory () {};

function newProduct () {};
