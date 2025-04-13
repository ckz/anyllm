// MongoDB sample data upload script
const { MongoClient } = require('mongodb');

// Connection URL with authentication credentials
const url = 'mongodb://ckz:password@localhost:27017/admin';
const client = new MongoClient(url);

// Sample data for the llm_demo database
const sampleData = [
  {
    model_name: "GPT-4",
    type: "Large Language Model",
    parameters: 1500000000000,
    release_date: new Date("2023-03-14"),
    capabilities: ["text generation", "code generation", "reasoning", "translation"],
    performance_metrics: {
      accuracy: 0.95,
      latency_ms: 250,
      tokens_per_second: 30
    }
  },
  {
    model_name: "Claude 2",
    type: "Large Language Model",
    parameters: 800000000000,
    release_date: new Date("2023-07-11"),
    capabilities: ["text generation", "summarization", "reasoning", "creative writing"],
    performance_metrics: {
      accuracy: 0.92,
      latency_ms: 180,
      tokens_per_second: 35
    }
  },
  {
    model_name: "Llama 2",
    type: "Large Language Model",
    parameters: 70000000000,
    release_date: new Date("2023-07-18"),
    capabilities: ["text generation", "instruction following", "reasoning"],
    performance_metrics: {
      accuracy: 0.89,
      latency_ms: 120,
      tokens_per_second: 40
    }
  },
  {
    model_name: "Gemini Pro",
    type: "Large Language Model",
    parameters: 1000000000000,
    release_date: new Date("2023-12-06"),
    capabilities: ["text generation", "multimodal understanding", "reasoning", "code generation"],
    performance_metrics: {
      accuracy: 0.94,
      latency_ms: 200,
      tokens_per_second: 38
    }
  },
  {
    model_name: "Mistral 7B",
    type: "Large Language Model",
    parameters: 7000000000,
    release_date: new Date("2023-09-27"),
    capabilities: ["text generation", "instruction following"],
    performance_metrics: {
      accuracy: 0.87,
      latency_ms: 90,
      tokens_per_second: 45
    }
  }
];

// Function to upload sample data
async function uploadSampleData() {
  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log('Connected successfully to MongoDB server');
    
    // Get the llm_demo database
    const db = client.db('llm_demo');
    
    // Get the models collection (will be created if it doesn't exist)
    const collection = db.collection('models');
    
    // Delete any existing data
    await collection.deleteMany({});
    console.log('Cleared existing data from the models collection');
    
    // Insert the sample data
    const result = await collection.insertMany(sampleData);
    console.log(`${result.insertedCount} documents were inserted into the models collection`);
    
    // Create an index on model_name for faster queries
    await collection.createIndex({ model_name: 1 }, { unique: true });
    console.log('Created index on model_name field');
    
    // Show a sample query
    const query = { parameters: { $gt: 500000000000 } };
    const options = { projection: { _id: 0, model_name: 1, parameters: 1 } };
    const models = await collection.find(query, options).toArray();
    console.log('Models with more than 500B parameters:');
    console.log(models);
    
  } catch (err) {
    console.error('Error occurred:', err);
  } finally {
    // Close the connection
    await client.close();
    console.log('MongoDB connection closed');
  }
}

// Run the function
uploadSampleData();