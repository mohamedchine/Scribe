# MongoDB Fake Data Insertion Guide

This guide will help you populate your MongoDB database with fake test data for better website testing.

## Files
- `fake-data-mongodb.js` - Complete MongoDB script with all fake data

## How to Use

### Option 1: MongoDB Shell (mongosh)

1. **Connect to your MongoDB database:**
   ```bash
   mongosh "mongodb://localhost:27017/your-database-name"
   ```
   Or if you're using MongoDB Atlas:
   ```bash
   mongosh "mongodb+srv://username:password@cluster.mongodb.net/your-database-name"
   ```

2. **Load and execute the script:**
   ```bash
   load('project_path/backend/fake-data-mongodb.js')
   ```
   
   Or copy-paste the entire content of `fake-data-mongodb.js` into the MongoDB shell.

### Option 2: MongoDB Compass

1. Open MongoDB Compass
2. Connect to your database
3. Click on the database name
4. Click on the "Scripts" tab (or use the shell)
5. Copy and paste the entire content of `fake-data-mongodb.js`
6. Click "Run" or press Ctrl+Enter

### Option 3: Command Line (mongosh)

```bash
mongosh "your-connection-string" < fake-data-mongodb.js
```

## What Data Will Be Created

- **5 Users** (including 1 admin)
  - John Doe (Admin, verified)
  - Jane Smith (Regular user, verified)
  - Michael Johnson (Regular user, verified)
  - Sarah Williams (Regular user, not verified)
  - David Brown (Regular user, verified)

- **6 Categories**
  - Technology
  - Programming
  - Web Development
  - Design
  - Tutorials
  - Tips & Tricks

- **8 Posts** with various categories, authors, and likes

- **12 Comments** distributed across different posts

## Important Notes

⚠️ **Password Hash**: The password field uses a placeholder hash. In a real scenario, you would need to:
- Use bcrypt to hash actual passwords
- Or use your application's registration endpoint to create users with real passwords

⚠️ **Before Running**: Make sure you're connected to the correct database. This script will insert data into:
- `users` collection
- `categories` collection
- `posts` collection
- `comments` collection

## Clearing Test Data (Optional)

If you want to clear all the fake data and start fresh:

```javascript
// In MongoDB shell:
db.users.deleteMany({email: {$in: [
  "john.doe@example.com",
  "jane.smith@example.com",
  "michael.j@example.com",
  "sarah.williams@example.com",
  "david.brown@example.com"
]}});

db.categories.deleteMany({});
db.posts.deleteMany({});
db.comments.deleteMany({});
```

## Verifying Data

After running the script, verify the data was inserted:

```javascript
// Count documents
db.users.countDocuments();
db.categories.countDocuments();
db.posts.countDocuments();
db.comments.countDocuments();

// View sample data
db.users.findOne();
db.posts.findOne();
db.comments.findOne();
```

## Troubleshooting

- **Error: "collection doesn't exist"** - This is normal. MongoDB will create collections automatically on first insert.
- **Error: "duplicate key"** - You may have already run the script. Clear the data first or modify the email addresses.
- **Connection issues** - Make sure your MongoDB server is running and the connection string is correct.
