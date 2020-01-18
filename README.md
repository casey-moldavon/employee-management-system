# employee-management-system

For this project, I wanted a way to generate and manage lists within the terminal, specifically pertaining to office-type settings. This app would help an employer add, view, edit and remove (CRUD functions) Offices, Positions and Employees. Each element added could also be applied to existing elements (Example: Adding a position would allow for either a current or new listed emplopyee to be given said positon).

Of course, i wanted to make it a bit more interesting so i made it Star Wars theme...it just seemed to fit accurately, but this theme can easily be changed and adapted to any enviornment.

![gif](images/baby-yoda.gif =250x250)
​
## Getting Started

Step 1: Visit my Github repository link at the bottom of this README.md
Step 2: Select to Clone the repo.
Step 3: Open Terminal or Git Bash
Step 4: Type git clone (paste link here) to copy the repository
Step 5: open files in VS Code or any other code viewing/editing tool
Step 6: do an npm install (to get node_Module files)
Step 7: open databse.sql and copy all content
Step 8: Open MySQL Workbench (definitely needed to make this work)
Step 9: Paste databse.sql content into a query and run it (lightning bolt)
Step 10: return to VS Cote (or similar tool) and type node script.js in the terminal to start.
Step 11: Enjoy!

## How I did this

I began with creating my database, creating the databse.sql and copying these elements to the MySQL Workbench (as shown in the image below).

![image](images/mysql-image.png =250x250)

Once i had my data, i began working on the CRUD functions...
CRUD
C - Create
R - Read
U - Update
D - Delete

These functions primarily focus on organizing and manipulating data within MySQL Workbench. They use a specific syntax that takes some getting used to at first but quickly made sense once i put 2 and 2 together (example of a CRUD function below).

![image](images/crud-image.png =250x250)

I initially created the crud.js file to store these functions but eventually copied them into the primary js file (script.js). In the future i definitely will try to avoid this and instead create more files to stay organized. At this current moment, i'm afraid to break anything so going to keep it as it is but will likely come back to this project in the future to make some fixes.

On the script.js file i mostly focused on inquirer prompts which took a majority of my time organizing and writing. To avoid any mistakes or laziness, i actually wrote out every single prompt and line of code one step at a time to keep things organized and accurate. Of course, issues still occured and mistakes were still made but i got a lot of experience and practice with writing prompts and likely avoided what would have been a significantly larger percentage of mistakes had i just copied and pasted prompts that seemed similar.

I wrote a lot of notes for each prompt, mostly to keep mny own sanity in check. After they were completed though, i deleted these to limit the clutter on the page but they mostly consisted of simple comments for myself such as: "prompt for employee post_id, choices include all current posts" and things like that. Also, using a physical notebook, i wrote out the standard path of the prompts in relation to the CRUD functions. Normally i would share more related images but its hard to display the path and flow of the project without just images of code from different sections of the script.js page. Instead, i'll throw in some gifs displaying the terminal functionality...


![gif](images/add-feature.gif =250x250)

This displays the Add, View and Edit features of my app.

![gif](images/delete-feature.gif =250x250)

This displays the View, Edit and Delete features of my app.


## Built With
​
* [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* [mysql](https://www.mysql.com/)
* [inquirer](https://www.npmjs.com/package/inquirer)

​
​
## Authors
​
* **Casey Moldavon** 
​
- [Link to Portfolio Site](https://casey-moldavon.github.io/updated-portfolio-page/)
- [Link to Github](https://github.com/casey-moldavon/employee-management-system)
- [Link to LinkedIn](https://www.linkedin.com/in/casey-moldavon-442a1761/)
​
See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.
​
## License
​
This project is licensed under the MIT License 
​
## Acknowledgments
​
* Surprisingly, no major acknowledgements on this one. Basically did it without any outside aid. But of course, a thank you to my Berkeley Extension Coding Bootcamp instructor (Jerome Chenette) and both TA's (Mahisha Gunasekaran & Kerwin Hy).