const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const port = 8000;

const { readDataFile } = require("./middleware");

app.use(morgan("common"));

// CORS handling
// Set up a whitelist and check against it:
const whitelist = ["http://localhost:3000"];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

// logging
app.use(morgan("common"));

// connectivity test
app.get("/", (req, res) => {
  res.send("Hello Eriohn!");
});

// GET all patient data
app.get("/patient/all", (req, res) => {
  const patients = readDataFile("./data/CodeExerciseSampleData.xlsx");
  res.send(patients);
});

// if endpoint does not exist
app.use("*", function (req, res) {
  res.status(404).json({ message: "Not Found" });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
