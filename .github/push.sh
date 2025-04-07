#!/bin/bash

# Load environment variables from .env file
if [ -f ".github/.env" ]; then
    source .github/.env
else
    echo "Error: .env file not found in .github directory"
    exit 1
fi

# Check if GITHUB_TOKEN is set
if [ -z "$GITHUB_TOKEN" ]; then
    echo "Error: GITHUB_TOKEN is not set in .env file"
    exit 1
fi

# Get the current remote URL
REMOTE_URL=$(git remote get-url origin)

# Extract the repository path (username/repo.git)
REPO_PATH=$(echo $REMOTE_URL | sed -E 's/https:\/\/([^@]+@)?github.com\/(.+)/\2/')

# Set the remote URL with the token
git remote set-url origin "https://ckz:${GITHUB_TOKEN}@github.com/${REPO_PATH}"

# Push to GitHub
git push $@

# Reset the remote URL to the original (without token)
git remote set-url origin "https://github.com/${REPO_PATH}"

echo "Push completed and remote URL reset for security"