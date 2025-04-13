# MongoDB LLM Demo Project

This project demonstrates a MongoDB setup with sample LLM (Large Language Model) data.

## Setup Details

- MongoDB version: 6.0
- Authentication: Enabled
- Username: ckz
- Password: password

## Project Structure

- `upload_sample_data.js` - Script to upload sample LLM data to MongoDB
- `query_llm_data.js` - Script to query the LLM data
- `query_db.sh` - Shell script wrapper for easier querying
- `package.json` - Node.js project configuration

## Database Structure

- Database: `llm_demo`
- Collection: `models`
- Sample data: Information about various LLM models including GPT-4, Claude 2, Llama 2, etc.

## Usage

### Connecting to MongoDB

```bash
mongosh --host localhost --port 27017 -u ckz -p password --authenticationDatabase admin
```

### Uploading Sample Data

```bash
npm run upload
```

This will:
1. Connect to MongoDB using the configured credentials
2. Create the `llm_demo` database if it doesn't exist
3. Create the `models` collection if it doesn't exist
4. Clear any existing data in the collection
5. Insert sample LLM model data
6. Create an index on the `model_name` field

### Querying the Database

Use the provided shell script to query the database:

```bash
# List all models
./query_db.sh all

# Count the number of models
./query_db.sh count

# Find a specific model by name
./query_db.sh find "GPT-4"

# Find models with a specific capability
./query_db.sh capability "code generation"

# Find models with parameters greater than a value
./query_db.sh parameters 500000000000
```

## Sample Data

The sample data includes information about popular LLM models with the following fields:
- `model_name`: Name of the LLM model
- `type`: Type of model
- `parameters`: Number of parameters in the model
- `release_date`: When the model was released
- `capabilities`: Array of capabilities the model has
- `performance_metrics`: Object containing metrics like accuracy, latency, and tokens per second

## Connection String

For applications, use the following connection string:

```
mongodb://ckz:password@localhost:27017/admin