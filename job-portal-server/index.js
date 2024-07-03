const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://KIRTHANA:WX4VIro0Wxk9yT0x@job-portal-demo.3y7szqr.mongodb.net/?retryWrites=true&w=majority&appName=job-portal-demo`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let jobCollections;

async function connectToMongo() {
  try {
    await client.connect();
    const db = client.db("mernJobPortal");
    jobCollections = db.collection("demoJobs");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
}

connectToMongo();

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/postJob', async (req, res) => {
  try {
    const body = req.body;
    body.createdAt = new Date();

    const result = await jobCollections.insertOne(body);
    if (result.acknowledged) {
      res.status(200).send(result);
    } else {
      res.status(500).send({
        message: "Failed to post job",
        status: false
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "An error occurred",
      error: error.message
    });
  }
});

app.get('/all-jobs', async (req, res) => {
  try {
    const jobs = await jobCollections.find({}).toArray();
    res.status(200).send(jobs);
  } catch (error) {
    res.status(500).send({
      message: "Failed to fetch jobs",
      error: error.message
    });
  }
});

// Get jobs by email
app.get('/myJobs/:email', async (req, res) => {
  try {
    console.log(`Fetching jobs for email: ${req.params.email}`); // Logging for debugging
    const jobs = await jobCollections.find({ postedBy: req.params.email }).toArray();
    if (jobs.length === 0) {
      res.status(404).send({ message: "No jobs found for the specified email" });
    } else {
      res.status(200).send(jobs);
    }
  } catch (error) {
    res.status(500).send({ message: "Failed to fetch jobs", error: error.message });
  }
});

// DELETE job by ID
app.delete('/job/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const result = await jobCollections.deleteOne(filter);
    if (result.deletedCount === 1) {
      res.status(200).send({ acknowledged: true });
    } else {
      res.status(404).send({ acknowledged: false, message: "Job not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "Failed to delete job", error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

process.on('SIGINT', async () => {
  console.log('Shutting down server...');
  await client.close();
  process.exit(0);
});
