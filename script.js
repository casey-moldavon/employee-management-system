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
// newPost perameter will likely be from a choices prompt
function addEmployee(newName, newPostID, newCommander_id){
    console.log ("Adding employee \n");
    var query = connection.query("INSERT INTO employee SET ?",
        {
            full_name: newName,
            post_id: newPostID,
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
    console.log("Editing employee list \n");
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


function addPrompt(){
    inquirer.prompt([
        {
            type: "list",
            name: "add",
            message: "What are you Adding to",
            choices: ["Add station", "Add post", "Add employee"]
        }
    ])
    //conditional here
}

function viewPrompt(){
    inquirer.prompt([
        {
            type: "list",
            name: "view",
            message: "What are you Viewing to",
            choices: ["View station", "View post", "View employee", "View All stations", "View All posts", "View All employees"]
        }
    ])
    //conditional here
}

function EditPrompt(){
    inquirer.prompt([
        {
            type: "list",
            name: "Edit",
            message: "What are you Editing?",
            choices: ["Edit station", "Editing post", "Editing employee"]
        }
    ])
    //conditional here
}

function deletePrompt(){
    inquirer.prompt([
        {
            type: "list",
            name: "delete",
            message: "What are you Deleting to",
            choices: ["Delete station", "Delete post", "Delete employee"]
        }
    ])
    //conditional here
}


function firstPrompt(){
    inquirer.prompt([
        {
            type: "list",
            name: "first",
            message: "Select action:",
            choices: ["Add", "View", "Edit", "Delete"]
        }
    ]).then(function(answer){
        
    })
}




function inquireBID(){
    let itemNames = [];
​
    for(let i = 0; i < itemList.length; i++){
        itemNames.push(itemList[i].item);
    }
​
    inquirer
        .prompt([
            {
                type: "list",
                name: "itemChoice",
                message: "Which item would you like to bid on?",
                choices: itemNames
            }
        ]).then(function(ans){
            const currentItem = ans.itemChoice;
            inquirer
                .prompt([
                    {
                        type: "input",
                        name: "userBid",
                        message: "How much would you like to bid?"
                    }
                ]).then(function(ans){
                    for(let i = 0; i < itemList.length; i++){
                        if(currentItem === itemList[i].item){
                            if(ans.userBid > itemList[i].startingBid){
                                console.log("Congratulations, you're not cheap!!!")
                                updateBid(currentItem,ans.userBid);
                            } else {
                                console.log("Your bid is not high enough!!!");
                                startAuction();
                            }
                        }
                    }
                    startAuction();
                });
        });
}