@@ .. @@
 //Read the vendor info into an array
 let artwork = [];
-let fileNames = fs.readdirSync("artwork", "utf-8");
+let fileNames = fs.readdirSync("artwork", "utf-8");
 for(let i = 0; i < fileNames.length; i++) {
-    let data = fs.readFileSync(`artwork/${fileNames[i]}`);
+    let data = fs.readFileSync(`artwork/${fileNames[i]}`);
     artwork.push(JSON.parse(data));
 }