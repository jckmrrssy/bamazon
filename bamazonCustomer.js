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
    //   console.log("connected as id " + connection.threadId + "\n");
        console.log("\nWelcome to Bamazon Grocery!\n");
  });

//   Display products avaialable for purhcase to the customer 
  function displayProducts () {
      connection.query("SELECT id, product_name, department_name, price FROM products", function(err, response) {
        if (err) throw err;
        console.log("Current Inventory:");
        for (let record in response) {
            let product = response[record];

            console.log(
                "Product ID:", product.id, "|",
                "Product:", product.product_name, "|",
                "Department:", product.department_name, "|",
                "Price ($):", product.price, "|"
            );
        };
      });
      inquirerCustomer();
  }

  function inquirerCustomer () {
    inquirer.prompt([
        {
            name: "itemId",
            message: "What is the ID of the product you would like to purchase?"
        }, {
            name: "quantityRequested",
            message: "How many would you like?"
        }
    ]).then(function(ans) {
        connection.query("SELECT product_name, price, stock_quantity FROM products WHERE id =" +
        ans.itemId, function(err, result) {
            if (err) throw err;
            // Checking if there is enough in stock to meet the customer's request 
            if (ans.quantityRequested <= result[0].stock_quantity) {
                // Figuring out stock left after customer order
                let updatedStock = result[0].stock_quantity - ans.quantityRequested;
                // Figuring out cost to customer
                let cost = result[0].price * ans.quantityRequested;
                // Updating database with updatedStock
                connection.query("UPDATE products SET ? WHERE ?", 
                [{stock_quantity: updatedStock},
                {id: ans.itemId}], function(err, res) {
                    if (err) throw err;
                    console.log("Your price before tax is $" + cost);
                    connection.end();
                });
                

            }
            else {
                console.log("I'm sorry, there aren't enough items available to complete your order. There are " +
                result[0].stock_quantity +" remaining.");
                connection.end();
            };
        });
    });
  };
  
  displayProducts();
  
  
  