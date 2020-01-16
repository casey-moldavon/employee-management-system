var mysql = require ("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employees_db"
});

// ================================================== Connection ==================================================
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadID + "\n")
    startSearch();
});




// ~ CRUD ~
// Create
// Read
// Update
// Delete

// ================================================== CREATE ==================================================
// newRole perameter will likely be from a choices prompt
function addEmployee(newName, newRoleID, newCommander_id){
    console.log ("Adding employee \n");
    var query = connection.query("INSERT INTO employee SET ?",
        {
            full_name: newName,
            role_id: newRoleID,
            commander_id: newCommander_id
        },
        function(err, res){
            console.log(res.affectedRows + " Created! \n");
        }
    );
    console.log(query.sql);
}

// ================================================== display all songs info ==================================================
// this function displays all songs and info (Self Note: not sure if this works)
function displayRoster(){
    console.log("Viewing employees \n");
    connection.query("SELECT * FROM employee",function(err, res){
        if (err) throw err;
        console.log(res);

        // below is code to sort info
        // var array = [];
        // for (var i = 0; i < res.length; i++){
        //     var obj = res[i];
        //     for (var i = 0; i < obj.length; i++){
        //         array.push(obj[artist]);
        //     }
        // }
        // var count = array.length;
        // console.log(object);
    });
}


// ================================================== READ (one) ==================================================
// this function displays all songs based on the chosen artist.
// prompts will be given to call readSongArt(prompt answer)
function displayEmployee(chosenEmployee){
    console.log("Select full name from employee \n");
    connection.query("SELECT full_name FROM employee WHERE ?",
    {
        full_name: chosenEmployee
    },
    
    function(err, res){
        if (err) throw err;
        console.log(res);
        lastQuestion();
    });
}




// ================================================== UPDATE ==================================================
function updateRoster(){
    console.log("Updating employee list \n");
    var query = connection.query("UPDATE employee SET ? WHERE ?",
        [
            {
                //what we are changing
            },
            {
                //where it's being changed
            }
        ],
        function(err, res) {
            console.log (res.affectedRows + " Roster updated! \n");
        }
    );
    console.log(query.sql);
}


// ================================================== DELETE ==================================================
function deleteEmployee(name){
    console.log("Removing terminated employee");
    connection.query("DELETE FROM employee WHERE ?",
        {
            full_name: name
        },
        function(err, res){
            console.log(res.affectedRows + " Terminated employee Deleted! \n");
        });
}











// ================================================== Start ==================================================
// likely remove this or add to firstQuestion()
function startSearch(){
    inquirer.prompt([
        {
            type: "input",
            name: "artist",
            message: "Search songs by Artist: "
        }
    ]).then(function(answer){
        readSongArt(answer.artist);
    });
}

// ================================================== Question ==================================================
// prompts user if they wish to search again
function lastQuestion(){
    inquirer.prompt([
        {
            type: "list",
            name: "reply",
            message: "Would you like to Search again?",
            choices: ["Yes", "No"]
        }
    ]).then(function(answer){
        if (answer.reply === "Yes"){
            startSearch();
        } else {
            connection.end();
        }
    });
}

// used to join two tables:

// SELECT Orders.OrderID, Customers.CustomerName, Orders.OrderDate
// FROM Orders
// INNER JOIN Customers
// ON Orders.CustomerID=Customers.CustomerID;

function readSongArt(chosenArtist){
    console.log("Select song from -tbd- \n");
    connection.query("SELECT title FROM -tbd- WHERE ?",
    {
        artist: chosenArtist
    },

    function(err, res){
        if (err) throw err;
        console.log(res);
        lastQuestion();
    });
}



// ================================================== First Prompt ==================================================
//  Asks how User would like ot search(what)

// function firstQuestion(){
//     inquirer.prompt([
//         {
//             type: "list",
//             name: "reply",
//             message: "What subject do you wish to search? ",
//             choices: ["Artist", "Title", "Year", "Popularity"]
//         }
//     ]).then(function(answer){
//         if (answer.reply === "Artist"){}
//     })
// }