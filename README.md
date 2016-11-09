## THINGS TODO....
0. Landingpage
    -new images for the slider thingy, new next to put?
1. CreateAccount/Login/AccountRecovery
    -need checker on fields(email, password, date?)
    -required all fields on accountRecovery, date widget, 
2. Profile
    -edit profiles, public view(reqest connection, send message)
3. Connections
    -display connections from DB, remove connection, approvePending, declinePending, visit profile
4. Message
    -load initial page from DB, send message, send new message.
5. Forum
    -load specific forum, create forum, add comment, add reply to comment.
6. Search
    -partial search on email?, search on skills, education, experience.

## Installation -- You will need to install Node before hand.
1. Clone repo(which ever method you prefer)
2. open command prompt/terminal and change directory to the project folder
3. Install npm modules: `npm install`
4. install bower through npm : `npm install -g bower`
5. Install bower dependencies `bower install`
6. Start up the server: `node server.js`
7. View in browser at http://localhost:8080

for those that are going to work on backend/want to mess around back end for learning purpose.
you might want to install nodemon, running server using nodemon will auto restart server whenever it detects changes.
dont need to manaully kill server and restart everytime.
npm install nodemon -g
instead of using node server.js to start server. use nodemon server.js


## Eclipse cloning repo(IntelliJ is similar, dont know exact detail)
1. File -> import project -> git -> project from git repo -> clone uri
2. enter the 'https://github.com/aishwaryaborkar/cmpe133fall16.git' as uri
3. enter in github login
4. choose master branch
5. import project as a general project
6. fill in directory and other info and finish.


if you have this set up, whenever you change the file you can use the ide to do the commit and push
right click on project -> team -> commit and fill in the forms as needed.
