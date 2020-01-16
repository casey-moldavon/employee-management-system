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
function addStation(newName){
    console.log ("Adding station \n");
    var query = connection.query("INSERT INTO station SET ?",
        {
            name: newName,
        },
        function(err, res){
            console.log(res.affectedRows + " added! \n");
        }
    );
    console.log(query.sql);
}

function addPost(newTitle, newSalary, newStation_id){
    console.log ("Adding post \n");
    var query = connection.query("INSERT INTO post SET ?",
        {
            title: newTitle,
            salary: newSalary,
            station_id: newStation_id
        },
        function(err, res){
            console.log(res.affectedRows + " Created! \n");
        }
    );
    console.log(query.sql);
}

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

// ================================================== View All ==================================================
// this function displays all songs and info (Self Note: not sure if this works)
// viewStation displays all assigned employees.
function  viewStation(){
    console.log("Viewing chosen station \n");
    connection.query()
}


function viewAllStations(){
    console.log("Viewing All stations \n");
    connection.query("SELECT * FROM station",function(err, res){
        if (err) throw err;
        console.log(res);
    });
}
function viewAllPosts(){
    console.log("Viewing All posts \n");
    connection.query("SELECT * FROM post",function(err, res){
        if (err) throw err;
        console.log(res);
    });
}
function viewAllEmployees(){
    console.log("Viewing All employees \n");
    connection.query("SELECT * FROM employee",function(err, res){
        if (err) throw err;
        console.log(res);
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



// ========================= FIRST PROMPT =========================
function firstPrompt(){
    inquirer.prompt([
        {
            type: "list",
            name: "first",
            message: "Select action:",
            choices: ["Add", "View", "Edit", "Delete"]
        }
    ]).then(function(answer){
        if(answer === "Add"){addPrompt();}
        else if(answer === "View"){viewPrompt();}
        else if(answer === "Edit"){editPrompt();}
        else{deletePrompt();}
    });
}

// ========================= ADD PROMPT =========================
function addPrompt(){
    inquirer.prompt([
        {
            type: "list",
            name: "add",
            message: "What are you Adding to",
            choices: ["Add station", "Add post", "Add employee"]
        }
    ]).then(function(answer){
        if (answer.add === "Add station"){
            inquirer.prompt([
                {
                    type: "input",
                    name: "station",
                    message: "Type station name here: "
                }
            ]).then(function(ans){
                addStation(ans.station);
            });
        }
        else if (answer === "Add post"){
            inquirer.prompt([
                {
                    type: "input",
                    name: "title",
                    message: "Type post title here: "
                },
                {
                    type: "input",
                    name: "salary",
                    message: "Type post salary here: "
                },
                {
                    type: "input",
                    name: "station_id",
                    message: "Type post station ID here: "
                }
            ]).then(function(ans){
                addPost(ans.title, ans.salary, ans.station_id);
            });
        }
        else{
            inquirer.prompt([
                {
                    type: "input",
                    name: "full_name",
                    message: "Type employee name here: "
                },
                {
                    type: "input",
                    name: "post_id",
                    message: "Type employee post ID here: "
                },
                {
                    type: "input",
                    name: "commander_id",
                    message: "Type employee's commander ID here: "
                }
            ]).then(function(ans){
                addEmployee(ans.full_name, ans.post_id, ans.commander_id)
            });
        }
    });
}

// ========================= VIEW PROMPT =========================
function viewPrompt(){
    inquirer.prompt([
        {
            type: "list",
            name: "view",
            message: "What are you Viewing to",
            choices: [
                "View station",
                "View post",
                "View employee",
                "View All stations",
                "View All posts",
                "View All employees"
            ]
        }
    ])
    //conditional here
}

// ========================= VIEW PROMPT =========================
function editPrompt(){
    inquirer.prompt([
        {
            type: "list",
            name: "edit",
            message: "What are you Editing?",
            choices: ["Edit station", "Editing post", "Editing employee"]
        }
    ])
    //conditional here
}

// ========================= DELETE PROMPT =========================
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