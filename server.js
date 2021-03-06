var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var cors = require("cors");
var ObjectID = mongodb.ObjectID;

var COUNTDOWN_COLLECTION = "countdowns";

var app = express();
app.use(cors());
app.use(bodyParser.json());

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test", function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = client.db();
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// COUNTDOWN API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*  "/api/countdowns"
 *    GET: finds all countdowns
 *    POST: creates a new countdown
 */

app.get("/api/countdowns", function(req, res) {
  db.collection(COUNTDOWN_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get countdowns.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/api/countdowns", function(req, res) {
  var newCountdown = req.body;
  newCountdown.createDate = new Date();

  if (!req.body.name || !req.body.startDate || !req.body.endDate) {
    handleError(res, "Invalid user input", "Must provide all required fields (name, startDate, endDate).", 400);
  } else {
    db.collection(COUNTDOWN_COLLECTION).insertOne(newCountdown, function(err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to create new countdown.");
      } else {
        res.status(201).json(doc.ops[0]);
      }
    });
  }
});

/*  "api/countdowns/:id"
 *    GET: find countdown by id
 *    DELETE: deletes countdown by id
 */

app.get("/api/countdowns/:id", function(req, res) {
  db.collection(COUNTDOWN_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get countdown");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.delete("/api/countdowns/:id", function(req, res) {
  db.collection(COUNTDOWN_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete countdown");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});