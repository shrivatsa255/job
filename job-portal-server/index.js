const express = require('express');
const app = express();
const fs = require('fs');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const path = require('path');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const connection = require("./db");
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');

const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(fileUpload());
app.use('/resumes', express.static(path.join(__dirname, 'resumes')));

connection(); // Make a connection to the database

// MongoDB Connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@job-portal-mern.ivcgcr0.mongodb.net/?retryWrites=true&w=majority&appName=job-portal-mern`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();

    const db = client.db("mernJobPortal");
    const jobsCollections = db.collection("demoJobs");
    const resumesCollections = db.collection("resumes");

    // Storing resumes in a folder named 'resumes' within the project directory
    const resumeStoragePath = path.join(__dirname, 'resumes');

    // Endpoint to store resume PDF
    app.post('/store-resume-pdf', async (req, res) => {
      try {
        if (!req.files || Object.keys(req.files).length === 0) {
          return res.status(400).send('No files were uploaded.');
        }
    
        const resumeFile = req.files.resume;
        const fileName = `${Date.now()}-${resumeFile.name}`;
        const filePath = path.join(resumeStoragePath, fileName);
    
        // Save resume file to the filesystem
        await resumeFile.mv(filePath);
    
        res.status(200).send({ success: true, filePath, message: 'Resume uploaded successfully' });
      } catch (error) {
        console.error('Error uploading resume:', error);
        res.status(500).send({ success: false, message: 'Failed to upload resume' });
      }
    });

    // Post a job
    app.post('/post-job', async (req, res) => {
      const body = req.body;
      body.createdAt = new Date();
      const result = await jobsCollections.insertOne(body);
      if (result.insertedId) {
        return res.status(200).send(result);
      } else {
        return res.status(404).send({
          message: "Cannot insert! Try again later",
          status: false
        });
      }
    });

    // Get all jobs
    app.get('/all-jobs', async (req, res) => {
      const jobs = await jobsCollections.find({}).toArray();
      res.send(jobs);
    });

    // Get single job using id
    app.get("/all-jobs/:id", async (req, res) => {
      const id = req.params.id;
      const job = await jobsCollections.findOne({
        _id: new ObjectId(id)
      });
      res.send(job);
    });

    // Get jobs by email
    app.get('/myJobs/:email', async (req, res) => {
      try {
        const { email } = req.params;
        const jobs = await jobsCollections.find({ postedBy: email }).toArray();

        const jobsWithResumes = await Promise.all(jobs.map(async (job) => {
          const resumeDoc = await resumesCollections.findOne({ jobId: job._id });
          if (resumeDoc) {
            return { ...job, resumeUrl: resumeDoc.url };
          } else {
            return job;
          }
        }));

        res.send(jobsWithResumes);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
      }
    });

    // Delete a job
    app.delete("/job/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await jobsCollections.deleteOne(filter);
      res.send(result);
    });

    // Update a job
    app.patch("/update-job/:id", async (req, res) => {
      const id = req.params.id;
      const jobData = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          ...jobData
        },
      };

      const result = await jobsCollections.updateOne(filter, updateDoc, options);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Hello developer!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Authentication route
app.post('/api/auth', (req, res) => {
  // Handle the request
  console.log(req.body); // Log the request body
  res.status(200).json({ message: 'Authenticated successfully' });
});
