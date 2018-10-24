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
                    "Add to inventory", "Add new product", "Exit"]
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
        else if (selection.managerOptions === "Exit") {
            connection.end();
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
    // managerPrompt();
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
    // managerPrompt();
};

function updateInventory () {
    inquirer.prompt([
        {
            name: "itemId",
            message: "Please enter the ID of the product you want to add"
        }, {
            name: "amount",
            message: "How many are you adding?"
        }
    ]).then(function(response) {
        connection.query("SELECT * FROM products WHERE id =" + response.itemId, function(err, res) {
            if (err) throw err;
            
        let newQuant = res[0].stock_quantity + response.amount;

        connection.query(
            "UPDATE products SET ? WHERE ?",
            [{stock_quantity: newQuant},
            {id: response.itemId}], function(err, res) {
                if (err) throw err;
            })
            console.log("Successfully updated inventory!");
            setTimeout(function() {managerPrompt()}, 5000);
        
        })
    });
    // managerPrompt();
}
// function newProduct () {};

