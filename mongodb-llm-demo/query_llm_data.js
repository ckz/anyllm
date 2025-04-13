// MongoDB query script for llm_demo database
const { MongoClient } = require('mongodb');

// Connection URL with authentication credentials
const url = 'mongodb://ckz:password@localhost:27017/admin';
const client = new MongoClient(url);

// Function to query the database based on command line arguments
async function queryDatabase() {
  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log('Connected successfully to MongoDB server');
    
    // Get the llm_demo database
    const db = client.db('llm_demo');
    
    // Get the models collection
    const collection = db.collection('models');
    
    // Get command line arguments
    const args = process.argv.slice(2);
    const command = args[0] || 'all';
    
    switch(command) {
      case 'all':
        // List all models
        const allModels = await collection.find({}).toArray();
        console.log('All LLM models:');
        console.log(JSON.stringify(allModels, null, 2));
        break;
        
      case 'count':
        // Count documents
        const count = await collection.countDocuments();
        console.log(`Total number of models: ${count}`);
        break;
        
      case 'find':
        // Find by model name
        const modelName = args[1];
        if (!modelName) {
          console.error('Please provide a model name to find');
          break;
        }
        const model = await collection.findOne({ model_name: modelName });
        if (model) {
          console.log(`Found model: ${modelName}`);
          console.log(JSON.stringify(model, null, 2));
        } else {
          console.log(`No model found with name: ${modelName}`);
        }
        break;
        
      case 'capability':
        // Find models with specific capability
        const capability = args[1];
        if (!capability) {
          console.error('Please provide a capability to search for');
          break;
        }
        const modelsByCapability = await collection.find({ 
          capabilities: capability 
        }).toArray();
        console.log(`Models with capability '${capability}':`);
        console.log(JSON.stringify(modelsByCapability, null, 2));
        break;
        
      case 'parameters':
        // Find models with parameters greater than a value
        const paramValue = parseInt(args[1]);
        if (isNaN(paramValue)) {
          console.error('Please provide a valid number for parameters');
          break;
        }
        const modelsByParams = await collection.find({ 
          parameters: { $gt: paramValue } 
        }).toArray();
        console.log(`Models with more than ${paramValue} parameters:`);
        console.log(JSON.stringify(modelsByParams, null, 2));
        break;
        
      default:
        console.log('Available commands:');
        console.log('  all - List all models');
        console.log('  count - Count total number of models');
        console.log('  find [model_name] - Find a specific model by name');
        console.log('  capability [capability] - Find models with a specific capability');
        console.log('  parameters [value] - Find models with parameters greater than value');
    }
    
  } catch (err) {
    console.error('Error occurred:', err);
  } finally {
    // Close the connection
    await client.close();
    console.log('MongoDB connection closed');
  }
}

// Run the function
queryDatabase();