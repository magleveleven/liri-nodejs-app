# liri-node-app

1. Clearly state the problem the app is trying to solve (i.e. what is it doing and why)
    Easy to use app for finding song, concert, and movie information by having the user type a command following a term. 

2. Give a high-level overview of how the app is organized   
    
    We will have 3 external connections, one for each category within the app: 
        1) Bands in Town for Concert details
        2) OMDB for movie details 
        3) Spotify for song details

    We will create constructors for each of the 3 categories.

    We will use the command to dictate which function to run 

    Each function will be designed to provide the user with the appropriate details for that category. 

3. Give start-to-finish instructions on how to run the app
   
   SETUP 
    1) Install axios
    2) Create js files, main_liri.js for functions, and liri.js for initiating
    3) Ensure all require references are made to supporting files, i.e. keys.js, axios, spotify api, fs, moment.
    
    ORGANIZE
    1) Established succesful connections to external sources, tested with constants.
    2) Analyzed how the data requested was being returned, and how it would need to be displayed to the user.
    3) Created unique constructors to receive categories from the user for catered responses 
    

4. Include screenshots, gifs or videos of the app functioning


5. Contain a link to a deployed version of the app


6. Clearly list the technologies used in the app

node 
npm
axios
constructor 
node-spotify-api

7. State your role in the app development

I wrote it.  

