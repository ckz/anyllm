# GitHub Authentication Helper

This directory contains tools to help with GitHub authentication when pushing changes to the repository.

## Setup

1. Create a `.env` file in this directory with your GitHub Personal Access Token:
   ```
   # GitHub Personal Access Token
   GITHUB_TOKEN=your_token_here
   ```

2. Make sure the `.env` file is listed in your `.gitignore` to prevent accidentally committing your token.

## Usage

Instead of using `git push`, use the provided script:

```bash
./.github/push.sh
```

This script will:
1. Load your GitHub token from the `.env` file
2. Temporarily update the remote URL to include your token
3. Push your changes to GitHub
4. Reset the remote URL to remove the token for security

You can also pass additional arguments to the script, just like you would with `git push`:

```bash
# Push to a specific branch
./.github/push.sh origin feature-branch

# Force push
./.github/push.sh --force
```

## Security Notes

- Never commit your `.env` file to the repository
- The script automatically removes the token from the remote URL after pushing
- Consider using a token with limited scope (e.g., only repo access)
- Regularly rotate your GitHub tokens for better security