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
    console.log("connected as id " + connection.threadId + "\n")
    getAllStations();
});


// ~~~~~~~~~~~~~~~~~~~~~~~~~ ALL LISTS ~~~~~~~~~~~~~~~~~~~~~~~~~
var stationList;
function getAllStations(){
    connection.query("SELECT * FROM station", function(err, res){
        if (err) throw err;
        stationList = res;
        getAllPosts();
    });
}
var postList;
function getAllPosts(){
    connection.query("SELECT * FROM post", function(err, res){
        if (err) throw err;
        postList = res;
        getAllEmployees();
    });
}
var employeeList;
function getAllEmployees(){
    connection.query("SELECT * FROM employee", function(err, res){
        if (err) throw err;
        employeeList = res;
        firstPrompt();
    });
}


// ========================= LAST PROMPT =========================
// prompts user if they wish to search again
function lastQuestion(){
    inquirer.prompt([
        {
            type: "list",
            name: "reply",
            message: "Would you like to Select another Action?",
            choices: ["Yes", "No"]
        }
    ]).then(function(answer){
        if (answer.reply === "Yes"){
            getAllStations();
        } else {
            connection.end();
        }
    });
}

// =========================              ==================================================
// ========================= FIRST PROMPT ==================================================
// =========================              ==================================================
function firstPrompt(){
    console.log("Welcome to the Empire's Station Crew Database")
    inquirer.prompt([
        {
            type: "list",
            name: "first",
            message: "Select action:",
            choices: ["Add", "View", "Edit", "Delete"]
        }
    ]).then(function(answer){
        if(answer.first === "Add"){addPrompt();}
        else if(answer.first === "View"){viewPrompt();}
        else if(answer.first === "Edit"){editPrompt();}
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
        // ~~~~~~~~~~~~~~~~~~~~~~~~~ ADD STATION ~~~~~~~~~~~~~~~~~~~~~~~~~
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
        // ~~~~~~~~~~~~~~~~~~~~~~~~~ ADD POST ~~~~~~~~~~~~~~~~~~~~~~~~~
        else if (answer.add === "Add post"){
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
                    name: "rank_level",
                    message: "Type post Rank Level of authority here: "
                }
            ]).then(function(ans){
                addPost(ans.title, ans.salary, ans.rank_level);
            });
        }
        // ~~~~~~~~~~~~~~~~~~~~~~~~~ ADD EMPLOYEE ~~~~~~~~~~~~~~~~~~~~~~~~~
        else {
            postQuery();
        }
    });
}


function postQuery(){
    let postArray = [];
    let captainArray = [];

    for (let i = 0; i < postList.length; i++){
        postArray.push(postList[i].title);
    }

    for (let i = 0; i < employeeList.length; i++){
        if (employeeList[i].post_id === "Captain"){
            captainArray.push(employeeList[i].full_name);
        }
    }

    inquirer.prompt([
        {
            type: "input",
            name: "newName",
            message: "Type employee name here: "
        },
        {
            type: "list",
            name: "post_id",
            message: "Select employee post ID: ",
            choices: postArray
        },
        {
            type: "list",
            name: "commander_id",
            message: "Select employee's commanding officer: ",
            choices: captainArray
        }
    ]).then(function(ans){
        addEmployee(ans.newName, ans.post_id, ans.commander_id);
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
                // "View station",
                // "View post",
                // "View employee",
                "View All stations",
                "View All posts",
                "View All employees"
            ]
        }
    ]).then(function(answer){
        if (answer.view === "View All stations"){viewAllStations();}
        else if (answer.view === "View All posts"){viewAllPosts();}
        else{viewAllEmployees();}
    });
}



// ========================= EDIT PROMPT =========================
function editPrompt(){
    inquirer.prompt([
        {
            type: "list",
            name: "edit",
            message: "What are you Editing?",
            choices: ["Edit station", "Editing post", "Editing employee"]
        }
    ]).then(function(answer){



        // ========== Edit Station ==========
        if (answer.edit == "Edit station"){

            let stationArray = [];
        
            for (let i = 0; i < stationList.length; i++){
                stationArray.push(stationList[i].title);
            }


            inquirer.prompt([
                {
                    type: "list",
                    name: "station",
                    message: "Select a station to Edit: ",
                    choices: stationArray
                },
                {
                    type: "input",
                    name: "newName",
                    message: "Provide new station Name: "
                }
            ]).then(function(ans){
                updateStation(ans.newName, station)
            })
        }
        // ========== Edit Post ==========
        else if (answer.edit == "Edit post"){

            let postArray = [];

            for (let i = 0; i < postList.length; i++){
                postArray.push(postList[i].title);
            }
            
            inquirer.prompt([
                {
                    type: "list",
                    name: "post",
                    message: "Select a post to Edit: ",
                    choices: postArray
                },
                {
                    type: "list",
                    name: "edit",
                    message: "Select post stat to Edit: ",
                    choices: ["title", "salary", "rank_level"]
                }
            ]).then(function(ans){
                if (ans.edit === "title"){
                    inquirer.prompt([
                        {
                            type: "input",
                            name: "newTitle",
                            message: "Type new title: "
                        }
                    ]).then(function(ansTwo){
                        updatePost(ans.post, ans.edit, ansTwo.newTitle)
                    });
                }
                else if (ans.edit === "salary"){
                    inquirer.prompt([
                        {
                            type: "input",
                            name: "newSalary",
                            message: "Type new title: "
                        }
                    ]).then(function(ansTwo){
                        updatePost(ans.post, ans.edit, ansTwo.newSalary)
                    });
                }
                else {
                    inquirer.prompt([
                        {
                            type: "input",
                            name: "newRank_level",
                            message: "Type new title: "
                        }
                    ]).then(function(ansTwo){
                        updatePost(ans.post, ans.edit, ansTwo.newRank_level)
                    });
                }
            })
        }
        // ========== Edit Employee ==========
        else {
            editEmployee();
        }
    });
}


function editEmployee(){
    let employeeArray = [];

    for (let i = 0; i < employeeList.length; i++){
        captainArray.push(employeeList[i].full_name);
    }

        inquirer.prompt([
            {
                type: "list",
                name: "employee",
                message: "Select an employee to Edit: ",
                choices: employeeArray
            },
            {
                type: "list",
                name: "edit",
                message: "Select employee stat to Edit: ",
                choices: ["Name", "Post_id", "Commander_id"]
            }
        ]).then(function(ans){
            if (ans.edit === "Name"){
                inquirer.prompt([
                    {
                        type: "input",
                        name: "newName",
                        message: "Type new Name: "
                    }
                ]).then(function(ansTwo){
                    updateEmployee(ans.employee, ans.edit, ansTwo.newName)
                });
            }
            else if (ans.edit === "Post_id"){
                inquirer.prompt([
                    {
                        type: "input",
                        name: "newPost_id",
                        message: "Type new title: "
                    }
                ]).then(function(ansTwo){
                    updateEmployee(ans.employee, ans.edit, ansTwo.newPost_id)
                });
            }
            else {
                inquirer.prompt([
                    {
                        type: "input",
                        name: "newCommander_id",
                        message: "Type new title: "
                    }
                ]).then(function(ansTwo){
                    updateEmployee(ans.employee, ans.edit, ansTwo.newCommander_id)
                });
            }
        });
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


// =========================                ==================================================
// ========================= CRUD FUNCTIONS ==================================================
// =========================                ==================================================

// ========================= CREATE =========================
// newPost perameter will likely be from a choices prompt
function addStation(newName){
    console.log ("Adding station \n");
    var query = connection.query("INSERT INTO station SET ?",
        {
            name: newName,
        },
        function(err, res){
            console.log(res.affectedRows + " added! \n");
            lastQuestion()
        }
    );
}

function addPost(newTitle, newSalary, newRank_level){
    console.log ("Adding post \n");
    var query = connection.query("INSERT INTO post SET ?",
        {
            title: newTitle,
            salary: newSalary,
            rank_level: newRank_level
        },
        function(err, res){
            console.log(res.affectedRows + " Created! \n");
            lastQuestion()
        }
    );
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
            lastQuestion()
        }
    );
}

// ========================= View [One(?) / All] =========================

function viewAllStations(){
    console.log("Viewing All stations \n");
    connection.query("SELECT * FROM station",function(err, res){
        if (err) throw err;
        console.log(res);
        lastQuestion()
    });
}
function viewAllPosts(){
    console.log("Viewing All posts \n");
    connection.query("SELECT * FROM post",function(err, res){
        if (err) throw err;
        console.log(res);
        lastQuestion()
    });
}
function viewAllEmployees(){
    console.log("Viewing All employees \n");
    connection.query("SELECT * FROM employee",function(err, res){
        if (err) throw err;
        console.log(res);
        lastQuestion()
    });
}


// ========================= UPDATE =========================
function updateStation(newName, chosenStation){
    console.log("Editing employee list \n");
    var query = connection.query("UPDATE employee SET ? WHERE ?",
        [
            {
                name: newName
            },
            {
                station: chosenStation
            }
        ],
        function(err, res) {
            console.log (res.affectedRows + " Roster updated! \n");
            lastQuestion()
        }
    );
}

function updatePost(chosenPost, chosenStat, newChange){
    console.log("Editing employee list \n");
    var query = connection.query("UPDATE employee SET ? WHERE ?",
        [
            {
                chosenStat: newChange
            },
            {
                title: chosenPost
            }
        ],
        function(err, res) {
            console.log (res.affectedRows + " Roster updated! \n");
            lastQuestion()
        }
    );
}

function updateEmployee(chosenEmployee, chosenStat, newChange){
    console.log("Editing employee list \n");
    var query = connection.query("UPDATE employee SET ? WHERE ?",
        [
            {
                chosenStat: newChange
            },
            {
                full_name: chosenEmployee
            }
        ],
        function(err, res) {
            console.log (res.affectedRows + " Roster updated! \n");
            lastQuestion()
        }
    );
}


// ========================= DELETE =========================
function deleteStation(name){
    console.log("Removing terminated Station");
    connection.query("DELETE FROM station WHERE ?",
        {
            name: name
        },
        function(err, res){
            console.log(res.affectedRows + " Terminated Station Deleted! \n");
            lastQuestion()
        });
}
function deletePost(name){
    console.log("Removing terminated Post");
    connection.query("DELETE FROM post WHERE ?",
        {
            title: name
        },
        function(err, res){
            console.log(res.affectedRows + " Terminated Post Deleted! \n");
            lastQuestion()
        });
}
function deleteEmployee(name){
    console.log("Removing terminated employee");
    connection.query("DELETE FROM employee WHERE ?",
        {
            full_name: name
        },
        function(err, res){
            console.log(res.affectedRows + " Terminated employee Deleted! \n");
            lastQuestion()
        });
}
