

// ~ CRUD ~
// Create
// Read
// Update
// Delete

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
        }
    );
    console.log(query.sql);
    lastQuestion()
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
    lastQuestion()
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
    lastQuestion()
}

// ========================= View [One(?) / All] =========================
// this function displays all songs and info (Self Note: not sure if this works)
// viewStation displays all assigned employees.
// function  viewStation(){
//     console.log("Viewing chosen station \n");
//     connection.query()
// }

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
        }
    );
    console.log(query.sql);
    lastQuestion()
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
        }
    );
    console.log(query.sql);
    lastQuestion()
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
        }
    );
    console.log(query.sql);
    lastQuestion()
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
