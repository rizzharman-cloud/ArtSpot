@@ .. @@
 //View engine
 app.set("view engine", "pug");
-app.set("views", "\pages")
+app.set("views", "../frontend/pages")
 
 //Create a cookie 
@@ .. @@
 //Give access to files
-app.use(express.static("public"));
+app.use(express.static("../frontend"));
 
 //ROUTE HANDLERS
@@ .. @@
 //GET request that gets the scripting to the login page
 app.get("/login.js", (req, res) => {
 }
 )
-  fs.readFile("login.js", function(err, data){
}
)
+  fs.readFile("../frontend/login.js", function(err, data){
       if(err){
       }
}
)
@@ .. @@
 //GET request that gets the scripting to the create account page
 app.get("/createAccount.js", (req, res) => {
 }
 )
-  fs.readFile("createAccount.js", function(err, data){
}
)
+  fs.readFile("../frontend/createAccount.js", function(err, data){
       if(err){
       }
}
)
@@ .. @@
 //GET request that gets the scripting to the home page
 app.get("/home.js", (req, res) => {
 }
 )
-  fs.readFile("home.js", function(err, data){
}
)
+  fs.readFile("../frontend/home.js", function(err, data){
       if(err){
       }
}
)
@@ .. @@
 //GET request that gets the scripting to the artists page
 app.get("/artists.js", (req, res) => {
 }
 )
-  fs.readFile("artists.js", function(err, data){
}
)
+  fs.readFile("../frontend/artists.js", function(err, data){
       if(err){
       }
}
)
@@ .. @@
 //GET request that gets the scripting to the artworks page
 app.get("/artwork/artpiece.js", (req, res) => {
 }
 )
-  fs.readFile("artpiece.js", function(err, data){
}
)
+  fs.readFile("../frontend/artpiece.js", function(err, data){
       if(err){
       }
}
)
@@ .. @@
 //GET request that gets the scripting to the artist page
 app.get("/artist/user.js", (req, res) => {
 }
 )
-  fs.readFile("user.js", function(err, data){
}
)
+  fs.readFile("../frontend/user.js", function(err, data){
       if(err){
       }
}
)
@@ .. @@
 //GET request that gets the scripting to the add artwork page
 app.get("/addArtworks.js", (req, res) => {
 }
 )
-  fs.readFile("addArtworks.js", function(err, data){
}
)
+  fs.readFile("../frontend/addArtworks.js", function(err, data){
       if(err){
       }
}
)
@@ .. @@
 //GET request that gets the scripting to the home page
 app.get("/addWorkshop.js", (req, res) => {
 }
 )
-  fs.readFile("addWorkshop.js", function(err, data){
}
)
+  fs.readFile("../frontend/addWorkshop.js", function(err, data){
       if(err){
       }
}
)
@@ .. @@
 //GET request that gets the scripting to the home page
 app.get("/artworks.js", (req, res) => {
 }
 )
-  fs.readFile("artworks.js", function(err, data){
}
)
+  fs.readFile("../frontend/artworks.js", function(err, data){
       if(err);
}
)