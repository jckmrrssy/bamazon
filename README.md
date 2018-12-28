# Bamazon

This is an online shopping like application that uses a SQL database for inventory management. It has three "views" - one for customers, one for managers, and one for a supervisor. 

The app allows customers to purchase items, which are displayed to them with a description and price. When a customer makes a purchase, the database will update the inventory accordingly. If there are not enough units available to satisfy a customers order, they will receive an error message letting them know. 

Managers are allowed more robust access to the database, allowing them to see a not only the cost and description of all items, but also the quantity in stock. Managers are able to directly edit this information, whereas customers cannot. 

The supervisor view will be a view displaying the different managers, and a record of their interactions with the inventory database.

## Check out a demo [here](https://drive.google.com/file/d/15aQbYvowNsAjcnCKQgbHt0kQUdtfdwOV/view)

## Installing

To run the app locally, you will first need to git clone the repository to your local machine. 

HTTPS:
````
$ git clone https://github.com/jckmrrssy/bamazon.git
````
SSH:
````
$ git clone git@github.com:jckmrrssy/bamazon.git
````

Once cloned, cd into the repository and install the necessary dependencies by running:
````
$ npm install
````

You can then run the app in the customer view by running:
````
$ node bamazonCustomer.js
````

## Built With

* [Node.js](https://nodejs.org/en/) - JavaScript runtime
* [MySQL](https://www.mysql.com/) - Database management
* [npm](https://www.npmjs.com/) - Dependency management


## Authors
See contribution history [here](https://github.com/jckmrrssy/bamazon/graphs/contributors)

## Future Updates
At the moment, the app is fully functionining for the customer view, and is in development for the manager view. Once manager view is completed, I hope to add a supervisor view, that will allow one user to overview all manager activity on the application. 

