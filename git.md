# Git and GitHub Tutorial

## Initial Setup

1. Initialize Git in your project folder:
   ```
   git init
   ```

2. Create a .gitignore file:
   ```
   node_modules
   .next
   .env*.local
   ```

3. Stage your files:
   ```
   git add .
   ```

4. Commit your files:
   ```
   git commit -m "Initial commit"
   ```

5. Create a new repository on GitHub:
   - Go to https://github.com/
   - Click the '+' icon and select 'New repository'
   - Name it 'personal-site'
   - Don't initialize with README, .gitignore, or license
   - Click 'Create repository'

6. Link your local repository to GitHub:
   ```
   git remote add origin https://github.com/YOUR_USERNAME/personal-site.git
   git branch -M main
   git push -u origin main
   ```

## Regular Maintenance

1. Make small, frequent commits:
   ```
   git add .
   git commit -m "Descriptive commit message"
   ```

2. Pull before making changes:
   ```
   git pull origin main
   ```

3. Push your changes:
   ```
   git push origin main
   ```

4. Create branches for new features:
   ```
   git checkout -b feature/new-feature
   ```

5. Merge branches:
   ```
   git checkout main
   git merge feature/new-feature
   ```

6. Review changes before committing:
   ```
   git diff
   ```

7. Use GitHub Issues to track tasks and bugs.

8. Tag releases:
   ```
   git tag -a v1.0 -m "Version 1.0"
   git push origin v1.0
   ```

Remember to commit often, use descriptive commit messages, and keep your remote repository updated regularly.