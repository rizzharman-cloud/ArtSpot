//Create express app
const express = require('express');
const fs = require("fs");
const pug = require("pug");
let app = express();

//Database variables
let mongo = require('mongodb');
const { json } = require('express');
let MongoClient = mongo.MongoClient;
let db;

//View engine
app.set("view engine", "pug");
app.set("views", "\pages")

//Create a cookie 
const session = require('express-session');
const { traceDeprecation } = require('process');
app.use(session({
secret: 'some secret key here',
resave: true,
saveUninitialized: true
}));

// app.use(function (req, res, next) {
//     console.log(req.session);
//     next();
// });

//Log the request
const logRequest = function(req, res, next) {
    console.log(req.method);
    console.log(req.path);
    next();
};
app.use(logRequest);

//Automatically parse application/json data
app.use(express.json());

//Give access to files
app.use(express.static("public"));

//ROUTE HANDLERS

//authorization function to check if the user is an artist account
function auth(req, res, next) {
  if(!req.session.loggedin) {
    res.redirect("/");
    return;
  }

  db.collection("users").findOne({username: req.session.username}, function(err, searchResult) {
    // console.log(searchResult);
    if(!searchResult.isArtist) {
      res.render("unauthorized.pug", {});
      return;
    }

    next();
  });
}

//GET request that gets the scripting to the login page
app.get("/login.js", (req, res) => {
  fs.readFile("login.js", function(err, data){
      if(err){
          res.statusCode = 500;
          res.write("Server error.");
          res.end();
          return;
      }
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/javascript");
      res.write(data);
      res.end();
  });
});

//GET request that gets the scripting to the create account page
app.get("/createAccount.js", (req, res) => {
  fs.readFile("createAccount.js", function(err, data){
      if(err){
          res.statusCode = 500;
          res.write("Server error.");
          res.end();
          return;
      }
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/javascript");
      res.write(data);
      res.end();
  });
});

//GET request that gets the scripting to the home page
app.get("/home.js", (req, res) => {
  fs.readFile("home.js", function(err, data){
      if(err){
          res.statusCode = 500;
          res.write("Server error.");
          res.end();
          return;
      }
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/javascript");
      res.write(data);
      res.end();
  });
});

//GET request that gets the scripting to the artists page
app.get("/artists.js", (req, res) => {
  fs.readFile("artists.js", function(err, data){
      if(err){
          res.statusCode = 500;
          res.write("Server error.");
          res.end();
          return;
      }
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/javascript");
      res.write(data);
      res.end();
  });
});

//GET request that gets the scripting to the artworks page
app.get("/artwork/artpiece.js", (req, res) => {
  fs.readFile("artpiece.js", function(err, data){
      if(err){
          res.statusCode = 500;
          res.write("Server error.");
          res.end();
          return;
      }
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/javascript");
      res.write(data);
      res.end();
  });
});

//GET request that gets the scripting to the artist page
app.get("/artist/user.js", (req, res) => {
  fs.readFile("user.js", function(err, data){
      if(err){
          res.statusCode = 500;
          res.write("Server error.");
          res.end();
          return;
      }
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/javascript");
      res.write(data);
      res.end();
  });
});

//GET request that gets the scripting to the add artwork page
app.get("/addArtworks.js", (req, res) => {
  fs.readFile("addArtworks.js", function(err, data){
      if(err){
          res.statusCode = 500;
          res.write("Server error.");
          res.end();
          return;
      }
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/javascript");
      res.write(data);
      res.end();
  });
});

//GET request that gets the scripting to the home page
app.get("/addWorkshop.js", (req, res) => {
  fs.readFile("addWorkshop.js", function(err, data){
      if(err){
          res.statusCode = 500;
          res.write("Server error.");
          res.end();
          return;
      }
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/javascript");
      res.write(data);
      res.end();
  });
});

//GET request that gets the scripting to the home page
app.get("/artworks.js", (req, res) => {
  fs.readFile("artworks.js", function(err, data){
      if(err){
          res.statusCode = 500;
          res.write("Server error.");
          res.end();
          return;
      }
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/javascript");
      res.write(data);
      res.end();
  });
});


//GET request that gets the login page
app.get("/", (req, res) => {
  //Check if they are already logged in
  if (req.session.loggedin) {
    res.redirect("/home");
	}else {
    res.render("login.pug", {});
  }
});

//GET request that gets the create account page
app.get("/createAccount", (req, res) => {
  res.render("createAccount.pug", {});
});

//GET request that gets the home page
app.get("/home", (req, res) => {
  if (!req.session.loggedin) {
    res.redirect("/");
	}else {
    db.collection("users").findOne({"username": req.session.username}, function(err, searchResult) {
      // console.log(searchResult);
      res.render("home.pug", {user: searchResult});
    });
  }
});

//POST REQUEST TO MAKE AN ACCOUNT
app.post("/createAccount", (req, res) => {
  //Check db for a user with the inputted username, 
  db.collection("users").find({username: req.body.username}).toArray(function(err, searchResult) {
    if(err) { throw err; }

    //If it exists send an error, otherwise create the account
    if(searchResult.length > 0 && searchResult) {
      res.status(400).send("Existing User");
      return;
    }else {
      let newUser = {username: req.body.username, password: req.body.password, isArtist: false, 
        likes: [], followedArtists: [], notifications: [], createdArtworks: [], createdWorkshops: [], attendingWorkshops: []};

      db.collection("users").insertOne(newUser, function(err, result) {
        if(err){
            res.statusCode = 400;
            res.write("Server error.");
            res.end();
            return;
        }
        
        // console.log(result.insertedId);
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        res.end();
      });
    }  
  });
});

//GET request that gets the artworks page
app.get("/artwork", (req, res) => {
  //Check if they are already logged in
  if(req.session.loggedin) {
    //Check queries
    let query = {};
    if(req.query.name) {
      query["name"] = req.query.name;
    }
    if(req.query.artist) {
      query["artist"] = req.query.artist;
    }
    if(req.query.category) {
      query["category"] = req.query.category;
    }
    if(req.query.medium) {
      query["medium"] = req.query.medium;
    }

    let page = 0;
    if(req.query.page) {
      page = req.query.page;
      console.log("PAGE:" + page);
    }

    db.collection("artwork").find().toArray(function(err, count) {
      //Get all the artworks from the database
      db.collection("artwork").find(query).skip(page*10).limit(10).toArray( function(err, searchResult) {
        if(err) throw err;

        let end = false
        if(page*10 + 10 >= count.length) {
          end = true;
        }

        // console.log(searchResult);
        res.format({
          "application/json": () => {
            res.statusCode = 200;
            res.send(JSON.stringify(searchResult));
          },
          "text/html": () => {res.render("artworks.pug", {artworks: searchResult, likes: false, pageNumber: page, maxPage: end})}
        });
      });
    });
	}else {
    res.redirect("/");
  }
});

//GET request that gets the artworks page with only the liked artworks of the current user
app.get("/likedArtworks", (req, res) => {
  //Check if they are already logged in
  if(req.session.loggedin) {
    let page = 0;
    if(req.query.page) {
      page = req.query.page;
      console.log("PAGE:" + page);
    }

    db.collection("users").findOne({"username": req.session.username}, function(err, searchResult) {
      if(err) throw err;

      //Get an array of all the artpieces the user has liked
      let likedArtNames = [];
      for(let i = 0; i < searchResult.likes.length; i++) {
        likedArtNames.push(searchResult.likes[i].artName);
      }

      let end = false
      if(page*10 + 10 >= searchResult.likes.length) {
        end = true;
      }

      db.collection("artwork").find({name: {$in: likedArtNames}}).skip(page*10).limit(10).toArray(function(err, likedArtwork) {
        // console.log(searchResult);

        res.render("artworks.pug", {artworks: likedArtwork, likes: true, pageNumber: page, maxPage: end});
      });
    });
	}else {
    res.redirect("/");
  }
});

//GET request that gets a specific artworks page
app.get("/artwork/:name", (req, res) => {
  //Check if they are already logged in
  if(req.session.loggedin) {
    //Get all the artworks from the database 
    db.collection("artwork").findOne({"name": req.params.name}, function(err, searchResult) {
      if(err) throw err;

      // console.log(searchResult);
      res.render("artpiece.pug", {piece: searchResult, currentUser: req.session.username});
    });
	}else {
    res.redirect("/");
  }
});

//GET request that gets the list of artists that the user follows
app.get("/followed", (req, res) => {
  //Check if they are already logged in
  if(req.session.loggedin) {
    db.collection("users").findOne({"username": req.session.username}, function(err, searchResult) {
      if(err) throw err;

      // console.log(searchResult);
      res.render("artists.pug", {follows: searchResult.followedArtists});
    });
	}else {
    res.redirect("/");
  }
});

//GET request that gets the notifications of a user
app.get("/notifications", (req, res) => {
  //Check if they are already logged in
  if(req.session.loggedin) {
    db.collection("users").findOne({"username": req.session.username}, function(err, searchResult) {
      if(err) throw err;

      // console.log(searchResult);
      res.render("notifications.pug", {notifications: searchResult.notifications});
    });
	}else {
    res.redirect("/");
  }
});

//GET request that gets the add artworks page
app.get("/addArtwork", auth, (req, res) => {
  res.render("addArtwork.pug", {});
});

//GET request that gets the add artworks page
app.get("/addWorkshop", auth, (req, res) => {
    res.render("addWorkshop.pug", {});
});

//GET request that gets the page of a user/artist
app.get("/artist/:username", (req, res) => {
  //Check if they are already logged in
  if(req.session.loggedin) {
    db.collection("users").findOne({"username": req.params.username}, function(err, searchResult) {
      if(err) throw err;

      // console.log(searchResult);
      res.render("user.pug", {artist: searchResult});
    });
	}else {
    res.redirect("/");
  }
});

//POST REQUEST TO LOGIN
app.post("/login", (req, res) => {
  //Check db for a user with the inputted username and password
  db.collection("users").findOne({username: req.body.username}, function(err, searchResult) {
    if(err) { throw err; }

    //If it exists, login the user and send them to the homepage, otherwise send back an error code
    if(!searchResult) {
      // console.log("NOT FOUND");
      res.status(404).send("Username not found");
		  return;
    }

    if(searchResult.password == req.body.password) {
      // console.log("LOGGED IN");
      req.session.loggedin = true;
      req.session.username = searchResult.username;
      res.status(200).send("Logging in");
    } else {
      // console.log("INVALID PASS");
      // console.log(searchResult);
      res.status(401).send("Not authorized. Invalid password.");
      return;
    }
  });
});

//POST REQUEST TO LOGOUT
app.post("/logout", (req, res) => {
  if(req.session.loggedin) {
		req.session.loggedin = false;
    req.session.username =undefined;
    res.status(200).send("Logging out");
	}else {
    res.redirect("/");
  }
});

//POST request that adds a new artwork
app.post("/addArtwork", auth, (req, res) => {
  // console.log(req.body);

  //Check for valid input
  if(req.body.name.trim().length == 0 || req.body.year.trim().length == 0 || req.body.category.trim().length == 0 || 
  req.body.medium.trim().length == 0 || req.body.description.trim().length == 0 || req.body.image.trim().length == 0 || isNaN(req.body.year)) {
        res.status(200).send("Please enter valid values.");
  }

  //Add a new artwork 
  db.collection("artwork").find({name: req.body.name}).toArray(function(err, searchResult) {
    if(err) { throw err; }

    if(searchResult.length > 0 && searchResult) {
      res.status(200).send("Existing artwork with that name.");
      return;
    }else {
      let newArtwork = req.body;
      newArtwork.artist = req.session.username;
      newArtwork.reviews = [];
      db.collection("artwork").insertOne(newArtwork, function(err, result) {
        db.collection("users").updateOne({username: req.session.username}, {$push: {createdArtworks: req.body.name}}, function(err, client) {
          if(err) throw err;
    
          //Sends a notifications to all followers of this user
          let newNotification = {text: `${req.session.username} created the ${req.body.name} artpiece. Go like!`};
          db.collection("users").update({followedArtists: req.session.username}, {$push: {notifications: newNotification}}, function(err, client2) {
            res.statusCode = 200;
            res.write("Artwork successfully created");
            res.end();
          });
        });
      });
    }
  });
});

//POST request that adds a new workshop
app.post("/addWorkshop", auth, (req, res) => {
  //Check for valid input
  if(req.body.name.trim().length == 0) {
    res.status(200).send("Please enter valid values.");
    return;
  }

  let newWorkshop = {name: req.body.name, host: req.session.username, participants: []};
  db.collection("users").updateOne({username: req.session.username}, {$push: {createdWorkshops: newWorkshop}}, function(err, client) {
    if(err) throw err;

    //Sends a notifications to all followers of this user
    let newNotification = {text: `${req.session.username} created the ${req.body.name} workshop. Go register!`};
    db.collection("users").update({followedArtists: req.session.username}, {$push: {notifications: newNotification}}, function(err, client2) {
      res.status(200).send("Workshop created.");
      res.end();
    });
  });
});


//PUT request that changes the type of an account
app.put("/changeType", (req, res) => {
  db.collection("users").findOne({"username": req.session.username}, function(err, searchResult) {
    db.collection("users").updateOne({username: req.session.username}, {$set: {isArtist: !searchResult.isArtist}}, function(err, client) {
      if(err) throw err;
  
      res.statusCode = 200;
      res.end();
    });
  });
});

//PUT request that adds an artist to the users follows
app.put("/follow", (req, res) => {
  // console.log(req.body);

  //Check that they aren't trying to follow themselves
  if(req.body.name == req.session.username) {
    res.status(200).send("You can't follow yourself");
    return;
  }

  //Check if they are already logged in
  if(req.session.loggedin) {
    //Check if the user already follows the artist
    db.collection("users").findOne({"username": req.session.username}, function(err, searchResult) {
      if(err) throw err;

      //Otherwise add the artist
      if(!searchResult.followedArtists.includes(req.body.name)) {
        db.collection("users").updateOne({username: req.session.username}, {$push: {followedArtists: req.body.name}}, function(err, client) {
          if(err) throw err;
    
          res.statusCode = 200;
          res.end();
        });
      }

      res.status(200).send(`You've followed ${req.body.name}`);
    });
	}else {
    res.redirect("/");
  }
});

//PUT request that removes an artist from the users follows
app.put("/unfollow", (req, res) => {
  // console.log(req.body);

  //Check if they are already logged in
  if(req.session.loggedin) {
    //Check if the user already follows the artist
    db.collection("users").findOne({"username": req.session.username}, function(err, searchResult) {
      if(err) throw err;

      //Otherwise add the artist
      if(searchResult.followedArtists.includes(req.body.name)) {
        db.collection("users").updateOne({username: req.session.username}, {$pull: {followedArtists: req.body.name}}, function(err, client) {
          if(err) throw err;
    
          res.statusCode = 200;
          res.end();
        });
      }

      res.statusCode = 200;
      res.end();
    });
	}else {
    res.redirect("/");
  }
});

//PUT request that adds a review to the user and the artpiece
app.put("/like", (req, res) => {
    //Check if they are already logged in
  if(req.session.loggedin) {
    db.collection("users").findOne({"username": req.session.username}, function(err, searchResult) {
      if(err) throw err;

      //Check if the user has already reviewed the artpiece
      if(searchResult.likes.find(review => review.artName === req.body.artName)) {
        res.status(200).send("You've already reviewed this artpiece!");
        return;
      }

      db.collection("artwork").findOne({name: req.body.artName}, function(err, artpiece) {
        //Check that the user reviewing the work isn't the artist
        if(artpiece.artist == req.session.username) {
          res.status(200).send("You can't review your own artwork!");
          return;
        }
        
        //Otherwise add the review to the user and artwork
        let newReview =  {artName: req.body.artName, review: req.body.text, reviewer: req.session.username};
        db.collection("users").updateOne({username: req.session.username}, {$push: {likes: newReview}}, function(err, client) {
          if(err) throw err;
  
          db.collection("artwork").updateOne({name: req.body.artName}, {$push: {reviews: newReview}}, function(err, client) {
            if(err) throw err;
    
            res.status(200).send("Thanks for reviewing!");
          });
        });
      });
    });
	}else {
    res.redirect("/");
  }
});

//PUT request that removes a review from the user and the artpiece
app.put("/unlike", (req, res) => {
  //Check if they are already logged in
  if(req.session.loggedin) {
    //Remove from user database then the artwork database
    db.collection("users").updateOne({username: req.session.username}, {$pull: {likes: {artName: req.body.artName}}}, function(err, client) {
      if(err) throw err;

      db.collection("artwork").updateOne({name: req.body.artName}, {$pull: {reviews: {reviewer: req.session.username}}}, function(err, client2) {
        if(err) throw err;

        res.status(200).send("Review Removed!");
      });
    });
  }else {
    res.redirect("/");
  }
});

//PUT request that registers the user for a workshop
app.put("/register", (req, res) => {
  //Check if they are trying to register for their own workshop
  if(req.body.host == req.session.username) {
    res.status(200).send("You can't register for your own workshop");
    return;
  }

  //Check if they are already logged in
  if(req.session.loggedin) {
    // Get the workshop number then add the user to its participants
    db.collection("users").updateOne({username: req.session.username}, {$push: {attendingWorkshops: req.body}}, function(err, client) {
      if(err) throw err;

      db.collection("users").findOne({username: req.body.host}, function(err, searchResult) {
        let workshopNumber;
        for(let i = 0; i < searchResult.createdWorkshops.length; i++) {
          if(searchResult.createdWorkshops[i].name == req.body.name) {
            workshopNumber = i;
            break;
          }
        }
        
        let place = `createdWorkshops.${workshopNumber}.participants`;
        let command = {};
        command[place] = req.session.username;
        db.collection("users").updateOne({username: req.body.host}, {$push: command}, function(err, client) {
          res.status(200).send("TEST");
        })
      });
    });
  }else {
    res.redirect("/");
  }
});

//INCASE OF INVALID ROUTE
app.use((req, res) => {
  res.redirect("/home");
})

// Initialize database connection
MongoClient.connect("mongodb://127.0.0.1:27017/", { useNewUrlParser: true }, function(err, client) {
  if(err) throw err;

  //Get the a5 database
  db = client.db('a5');

  // Start server once Mongo is initialized
  app.listen(3000);
  console.log("Listening on port 3000");
});