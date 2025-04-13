#!/bin/bash

# Script to query the llm_demo MongoDB database

# Display usage information
function show_usage {
  echo "Usage: $0 [command] [argument]"
  echo ""
  echo "Commands:"
  echo "  all                  - List all models"
  echo "  count                - Count total number of models"
  echo "  find [model_name]    - Find a specific model by name"
  echo "  capability [name]    - Find models with a specific capability"
  echo "  parameters [value]   - Find models with parameters greater than value"
  echo ""
  echo "Examples:"
  echo "  $0 all"
  echo "  $0 find 'GPT-4'"
  echo "  $0 capability 'code generation'"
  echo "  $0 parameters 500000000000"
}

# Check if at least one argument is provided
if [ $# -eq 0 ]; then
  show_usage
  exit 1
fi

# Run the query with the provided arguments
node query_llm_data.js "$@"