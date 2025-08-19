//Require mongodb and create a MongoClient Object
const mc = require("mongodb").MongoClient;
const fs = require("fs");

//Read the vendor info into an array
let artwork = [];
let fileNames = fs.readdirSync("artwork", "utf-8");
for(let i = 0; i < fileNames.length; i++) {
    let data = fs.readFileSync(`artwork/${fileNames[i]}`);
    artwork.push(JSON.parse(data));
}

//Add the artwork to an array of objects
let allArtwork = [];
for(let i = 0; i < artwork.length; i++) {
    for(let j = 0; j < artwork[i].length; j++) {
        allArtwork.push(artwork[i][j]);
    }
}
console.log(allArtwork);

//Create accounts for existing artist accounts
let allUsers = [];
allUsers.push({username: "Corrine Hunt", password: "Corrine Hunt", isArtist: true, likes: [], followedArtists: [], notifications: [], createdArtworks: ["Air meets Water"], createdWorkshops: [], attendingWorkshops: []});
allUsers.push({username: "Luke", password: "Luke", isArtist: true, likes: [], followedArtists: [], notifications: [], createdArtworks: ["Kaleidoscope eye"], createdWorkshops: [], attendingWorkshops: []});
allUsers.push({username: "Anatoliy Kushch", password: "Anatoliy Kushch", isArtist: true, likes: [], followedArtists: [], notifications: [], createdArtworks: ["Independence Monument"], createdWorkshops: [], attendingWorkshops: []});
allUsers.push({username: "Lea Roche", password: "Lea Roche", isArtist: true, likes: [], followedArtists: [], notifications: [], createdArtworks: ["Dancing in the street"], createdWorkshops: [], attendingWorkshops: []});
allUsers.push({username: "Jim Dine", password: "Jim Dine", isArtist: true, likes: [], followedArtists: [], notifications: [], createdArtworks: ["Hearts and a Watercolor"], createdWorkshops: [], attendingWorkshops: []});
allUsers.push({username: "Shari Hatt", password: "Shari Hatt", isArtist: true, likes: [], followedArtists: [], notifications: [], createdArtworks: ["Untitled (O'Ryan)"], createdWorkshops: [], attendingWorkshops: []});
allUsers.push({username: "Sebastian McKinnon", password: "Sebastian McKinnon", isArtist: true, likes: [], followedArtists: [], notifications: [], createdArtworks: ["Courage My Love"], createdWorkshops: [], attendingWorkshops: []});
allUsers.push({username: "Kimika Hara", password: "Kimika Hara", isArtist: true, likes: [], followedArtists: [], notifications: [], createdArtworks: ["Hedgehog"], createdWorkshops: [], attendingWorkshops: []});
allUsers.push({username: "Keith Mallett", password: "Keith Mallett", isArtist: true, likes: [], followedArtists: [], notifications: [], createdArtworks: ["Rhapsody"], createdWorkshops: [], attendingWorkshops: []});
allUsers.push({username: "ArtMind", password: "ArtMind", isArtist: true, likes: [], followedArtists: [], notifications: [], createdArtworks: ["Tiny bunny love"], createdWorkshops: [], attendingWorkshops: []});
allUsers.push({username: "Kodak", password: "Kodak", isArtist: true, likes: [], followedArtists: [], notifications: [], createdArtworks: ["Female (NTSC test image)", "Couple (NTSC test image)"], createdWorkshops: [], attendingWorkshops: []});
allUsers.push({username: "Unknown", password: "Unknown", isArtist: true, likes: [], followedArtists: [], notifications: [], createdArtworks: ["Splash", "Mandrill", "Airplane (F-16)"], createdWorkshops: [], attendingWorkshops: []});
allUsers.push({username: "USC", password: "USC", isArtist: true, likes: [], followedArtists: [], notifications: [], createdArtworks: ["Jelly Beans", "Peppers", "Moon surface"], createdWorkshops: [], attendingWorkshops: []});
allUsers.push({username: "Banksy", password: "Banksy", isArtist: true, likes: [], followedArtists: [], notifications: [], createdArtworks: ["Devolved Parliament", "Girl with Balloon", "Love is in the Bin", "Flower Thrower"], createdWorkshops: [], attendingWorkshops: []});

//Create the connection
mc.connect("mongodb://127.0.0.1:27017/", { useNewUrlParser: true }, function(err, client) {
    //Error check
	if(err) throw err;
	console.log("Connected to database!");

    //Create the database a5 with collection artwork and users
	let db = client.db('a5');  

    //Create the artwork collection
    db.dropCollection("artwork", function(err, result){
        if(err){
            console.log("Error dropping collection. Likely case: collection did not exist (don't worry unless you get other errors...)")
        }else{
            console.log("Cleared artwork collection.");
        }

        db.collection("artwork").insertMany(allArtwork, function(err, result){
            if(err) throw err;
            console.log("Successfuly inserted " + result.insertedCount + " artwork.");
        })
    });

    //Create the users collection
    db.dropCollection("users", function(err, result){
        if(err){
            console.log("Error dropping collection. Likely case: collection did not exist (don't worry unless you get other errors...)")
        }else{
            console.log("Cleared users collection.");
        }

        db.collection("users").insertMany(allUsers, function(err, result){
            if(err) throw err;
            console.log("Successfuly inserted " + result.insertedCount + " users.");
            client.close();
            process.exit();
        })
    });
});