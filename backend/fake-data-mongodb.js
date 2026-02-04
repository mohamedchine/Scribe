// MongoDB Fake Data Insertion Script
// Run this in MongoDB shell or MongoDB Compass
// Make sure you're connected to your database first

// ============================================
// STEP 1: Insert Users
// ============================================
db.users.insertMany([
  {
    name: "Alexandre",
    lastname: "Martinez",
    email: "alex.martinez@devblog.com",
    password: "$2b$10$exampleHashedPassword123456789",
    profilePic: {
      url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      publicid: null
    },
    bio: "Senior software engineer and tech blogger. Passionate about clean code and architecture.",
    isAdmin: true,
    isAccountVerified: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Emma",
    lastname: "Chen",
    email: "emma.chen@devblog.com",
    password: "$2b$10$exampleHashedPassword123456789",
    profilePic: {
      url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      publicid: null
    },
    bio: "Frontend developer and content creator. Love sharing React tips and modern web development techniques.",
    isAdmin: false,
    isAccountVerified: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Marcus",
    lastname: "Thompson",
    email: "marcus.thompson@devblog.com",
    password: "$2b$10$exampleHashedPassword123456789",
    profilePic: {
      url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      publicid: null
    },
    bio: "Full-stack developer with expertise in Node.js, MongoDB, and cloud infrastructure.",
    isAdmin: false,
    isAccountVerified: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Sofia",
    lastname: "Rodriguez",
    email: "sofia.rodriguez@devblog.com",
    password: "$2b$10$exampleHashedPassword123456789",
    profilePic: {
      url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      publicid: null
    },
    bio: "UI/UX designer turned developer. Creating beautiful and functional user experiences.",
    isAdmin: false,
    isAccountVerified: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "James",
    lastname: "Anderson",
    email: "james.anderson@devblog.com",
    password: "$2b$10$exampleHashedPassword123456789",
    profilePic: {
      url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      publicid: null
    },
    bio: "Backend engineer specializing in API design, database optimization, and system architecture.",
    isAdmin: false,
    isAccountVerified: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Priya",
    lastname: "Patel",
    email: "priya.patel@devblog.com",
    password: "$2b$10$exampleHashedPassword123456789",
    profilePic: {
      url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      publicid: null
    },
    bio: "JavaScript enthusiast and open source contributor. Always exploring new frameworks and libraries.",
    isAdmin: false,
    isAccountVerified: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Lucas",
    lastname: "Silva",
    email: "lucas.silva@devblog.com",
    password: "$2b$10$exampleHashedPassword123456789",
    profilePic: {
      url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      publicid: null
    },
    bio: "DevOps engineer and automation enthusiast. Making deployment pipelines smoother every day.",
    isAdmin: false,
    isAccountVerified: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Olivia",
    lastname: "Kim",
    email: "olivia.kim@devblog.com",
    password: "$2b$10$exampleHashedPassword123456789",
    profilePic: {
      url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      publicid: null
    },
    bio: "Mobile developer and React Native expert. Building cross-platform apps that users love.",
    isAdmin: false,
    isAccountVerified: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

// Get user IDs (ObjectIds) for reference
var alexandre = db.users.findOne({email: "alex.martinez@devblog.com"})._id;
var emma = db.users.findOne({email: "emma.chen@devblog.com"})._id;
var marcus = db.users.findOne({email: "marcus.thompson@devblog.com"})._id;
var sofia = db.users.findOne({email: "sofia.rodriguez@devblog.com"})._id;
var james = db.users.findOne({email: "james.anderson@devblog.com"})._id;
var priya = db.users.findOne({email: "priya.patel@devblog.com"})._id;
var lucas = db.users.findOne({email: "lucas.silva@devblog.com"})._id;
var olivia = db.users.findOne({email: "olivia.kim@devblog.com"})._id;

// ============================================
// STEP 2: Insert Categories
// ============================================
db.categories.insertMany([
  {
    title: "Technology",
    author: alexandre,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Programming",
    author: alexandre,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Web Development",
    author: emma,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Design",
    author: sofia,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Tutorials",
    author: emma,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Tips & Tricks",
    author: marcus,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Backend",
    author: james,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "DevOps",
    author: lucas,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

// ============================================
// STEP 3: Insert Posts
// ============================================
db.posts.insertMany([
  {
    title: "Mastering React Hooks: A Complete Guide",
    description: "React Hooks revolutionized the way we write React components. In this comprehensive guide, we'll explore useState, useEffect, useCallback, useMemo, and custom hooks. Learn how to manage state and side effects in functional components without writing class components. We'll cover best practices, common pitfalls, and real-world examples that you can apply to your projects immediately.",
    category: "Programming",
    photo: {
      url: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
      publicid: null
    },
    author: emma,
    likes: [alexandre, marcus, james, priya],
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
  },
  {
    title: "MongoDB Performance Optimization: Indexing Strategies",
    description: "MongoDB is a powerful NoSQL database that's perfect for modern web applications. This post covers essential indexing strategies, query optimization techniques, and data modeling best practices. Whether you're building a small project or scaling to millions of users, these tips will help you get the most out of MongoDB and improve your application's performance significantly.",
    category: "Backend",
    photo: {
      url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800",
      publicid: null
    },
    author: james,
    likes: [alexandre, emma, marcus, sofia, priya],
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
  },
  {
    title: "CSS Grid vs Flexbox: When to Use What",
    description: "CSS has evolved significantly over the years. From Flexbox to Grid, CSS Variables to Container Queries, there are many modern techniques that can make your styling more efficient and maintainable. In this tutorial, we'll dive deep into when to use CSS Grid versus Flexbox, with practical examples and code snippets you can use right away in your projects.",
    category: "Web Development",
    photo: {
      url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
      publicid: null
    },
    author: sofia,
    likes: [emma, marcus, olivia],
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  },
  {
    title: "Building Scalable REST APIs with Express.js",
    description: "Learn how to create robust and scalable RESTful APIs using Node.js and Express. We'll cover routing patterns, middleware architecture, error handling strategies, authentication with JWT, rate limiting, and API design principles. By the end of this guide, you'll be able to build production-ready APIs that follow industry best practices and are easy to maintain and scale.",
    category: "Backend",
    photo: {
      url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800",
      publicid: null
    },
    author: james,
    likes: [alexandre, emma, marcus],
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
  },
  {
    title: "Design Systems: Creating Consistent UI Components",
    description: "As a developer, understanding design systems can significantly improve your applications. This post explores how to build reusable component libraries, establish design tokens, create consistent spacing and typography, and maintain design consistency across large applications. Learn how to create interfaces that are not only functional but also beautiful and user-friendly.",
    category: "Design",
    photo: {
      url: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800",
      publicid: null
    },
    author: sofia,
    likes: [alexandre, emma, marcus, james, priya, olivia],
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000)
  },
  {
    title: "Async/Await Patterns: Beyond the Basics",
    description: "Async/await is a modern way to handle asynchronous operations in JavaScript. This tutorial breaks down advanced async/await patterns, error handling strategies, parallel execution with Promise.all, sequential processing, and real-world examples. We'll also cover common mistakes and how to avoid them, helping you master this essential JavaScript feature.",
    category: "Tutorials",
    photo: {
      url: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800",
      publicid: null
    },
    author: priya,
    likes: [alexandre, emma, marcus, james, sofia],
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
  },
  {
    title: "Essential VS Code Extensions for Productivity",
    description: "Visual Studio Code is one of the most popular code editors, and extensions can supercharge your productivity. Here are essential extensions that will improve your coding experience, from Git integration to code formatting, debugging tools, language support, and AI-powered assistants. Install these and watch your workflow improve dramatically.",
    category: "Tips & Tricks",
    photo: {
      url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800",
      publicid: null
    },
    author: alexandre,
    likes: [emma, marcus, sofia, james, priya, lucas, olivia],
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000)
  },
  {
    title: "Git Workflow Strategies for Teams",
    description: "Git is an essential tool for version control, but many developers struggle with complex workflows. This guide explains Git Flow, GitHub Flow, branching strategies, merge vs rebase, pull request best practices, and collaborative workflows. Master these concepts and you'll be able to work efficiently in any team environment while maintaining clean commit history.",
    category: "Tutorials",
    photo: {
      url: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800",
      publicid: null
    },
    author: lucas,
    likes: [alexandre, james],
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000)
  },
  {
    title: "TypeScript: Type Safety in Modern JavaScript",
    description: "TypeScript brings static typing to JavaScript, helping catch errors before runtime. Learn how to set up TypeScript in your projects, understand type annotations, interfaces, generics, and advanced types. This guide will help you write more maintainable and bug-free code while leveraging the full power of modern JavaScript.",
    category: "Programming",
    photo: {
      url: "https://images.unsplash.com/photo-1516116216624-53e6977beab8?w=800",
      publicid: null
    },
    author: alexandre,
    likes: [emma, marcus, james, priya],
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
  },
  {
    title: "Docker for Developers: Containerization Made Simple",
    description: "Docker has become essential for modern development workflows. Learn how to containerize your applications, create Dockerfiles, manage multi-container applications with Docker Compose, and optimize your images. This tutorial covers everything from basics to production deployment strategies.",
    category: "DevOps",
    photo: {
      url: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800",
      publicid: null
    },
    author: lucas,
    likes: [alexandre, james, marcus],
    createdAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000)
  },
  {
    title: "React Performance Optimization Techniques",
    description: "Building fast React applications requires understanding performance optimization. Learn about React.memo, useMemo, useCallback, code splitting, lazy loading, and virtual DOM optimization. This guide provides practical techniques to improve your React app's performance and user experience.",
    category: "Web Development",
    photo: {
      url: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
      publicid: null
    },
    author: emma,
    likes: [alexandre, sofia, priya, olivia],
    createdAt: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000)
  },
  {
    title: "Building Mobile Apps with React Native",
    description: "React Native allows you to build native mobile apps using React. This comprehensive guide covers setting up your development environment, navigation, state management, native modules, and deployment to app stores. Learn how to create cross-platform mobile applications that feel native on both iOS and Android.",
    category: "Tutorials",
    photo: {
      url: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800",
      publicid: null
    },
    author: olivia,
    likes: [emma, sofia, priya],
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000)
  }
]);

// Get post IDs for comments
var reactHooksPost = db.posts.findOne({title: "Mastering React Hooks: A Complete Guide"})._id;
var mongodbPost = db.posts.findOne({title: "MongoDB Performance Optimization: Indexing Strategies"})._id;
var cssGridPost = db.posts.findOne({title: "CSS Grid vs Flexbox: When to Use What"})._id;
var restApiPost = db.posts.findOne({title: "Building Scalable REST APIs with Express.js"})._id;
var designSystemsPost = db.posts.findOne({title: "Design Systems: Creating Consistent UI Components"})._id;
var asyncAwaitPost = db.posts.findOne({title: "Async/Await Patterns: Beyond the Basics"})._id;
var vscodePost = db.posts.findOne({title: "Essential VS Code Extensions for Productivity"})._id;
var gitWorkflowPost = db.posts.findOne({title: "Git Workflow Strategies for Teams"})._id;
var typescriptPost = db.posts.findOne({title: "TypeScript: Type Safety in Modern JavaScript"})._id;
var dockerPost = db.posts.findOne({title: "Docker for Developers: Containerization Made Simple"})._id;
var reactPerfPost = db.posts.findOne({title: "React Performance Optimization Techniques"})._id;
var reactNativePost = db.posts.findOne({title: "Building Mobile Apps with React Native"})._id;

// ============================================
// STEP 4: Insert Comments
// ============================================
db.comments.insertMany([
  {
    postid: reactHooksPost,
    author: alexandre,
    value: "Excellent guide! The examples on custom hooks really helped me refactor my codebase. The useCallback optimization tip was a game-changer.",
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000)
  },
  {
    postid: reactHooksPost,
    author: marcus,
    value: "Thanks for sharing! I've been struggling with useEffect dependencies. Your explanation of the dependency array cleared up a lot of confusion for me.",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
  },
  {
    postid: reactHooksPost,
    author: priya,
    value: "This is exactly what I needed! Can you do a follow-up on useReducer? I'm curious about when to use it over useState.",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
  },
  {
    postid: mongodbPost,
    author: emma,
    value: "Excellent guide! The indexing section was particularly helpful. I implemented compound indexes on my user collection and saw a 10x performance improvement.",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
  },
  {
    postid: mongodbPost,
    author: sofia,
    value: "Could you expand on the aggregation pipeline? I'm working on a complex analytics feature and would love to see more examples.",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
  },
  {
    postid: mongodbPost,
    author: alexandre,
    value: "Great post! One thing to add: always use explain() to analyze your queries. It saved me from deploying a slow query to production.",
    createdAt: new Date(Date.now() - 0.5 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 0.5 * 24 * 60 * 60 * 1000)
  },
  {
    postid: cssGridPost,
    author: alexandre,
    value: "CSS Grid is a game-changer! Thanks for the practical examples. I've been using it for complex layouts and it's so much cleaner than floats.",
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000)
  },
  {
    postid: cssGridPost,
    author: olivia,
    value: "The comparison table was super helpful! I finally understand when to use Grid vs Flexbox. Keep up the great work!",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
  },
  {
    postid: restApiPost,
    author: emma,
    value: "This is exactly what I needed for my current project. Very clear explanations on error handling and middleware patterns!",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
  },
  {
    postid: restApiPost,
    author: marcus,
    value: "The rate limiting section was gold! I implemented it using express-rate-limit and it's working perfectly. Thanks for the tip!",
    createdAt: new Date(Date.now() - 0.8 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 0.8 * 24 * 60 * 60 * 1000)
  },
  {
    postid: designSystemsPost,
    author: marcus,
    value: "As a backend developer, this really opened my eyes to design principles. I never realized how important design tokens are for consistency.",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
  },
  {
    postid: designSystemsPost,
    author: emma,
    value: "We're building a design system at work and this post came at the perfect time! The component library structure you outlined is exactly what we needed.",
    createdAt: new Date(Date.now() - 2.5 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2.5 * 24 * 60 * 60 * 1000)
  },
  {
    postid: asyncAwaitPost,
    author: alexandre,
    value: "Finally, async/await makes sense! Great breakdown of the concepts. The Promise.all vs sequential execution comparison was particularly insightful.",
    createdAt: new Date(Date.now() - 0.5 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 0.5 * 24 * 60 * 60 * 1000)
  },
  {
    postid: asyncAwaitPost,
    author: james,
    value: "The error handling section was particularly useful. I've been wrapping everything in try-catch, but your approach with error boundaries is much cleaner.",
    createdAt: new Date(Date.now() - 0.3 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 0.3 * 24 * 60 * 60 * 1000)
  },
  {
    postid: vscodePost,
    author: emma,
    value: "I use most of these extensions daily. Great recommendations! I'd also add ESLint and Prettier - they're essential for code quality.",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
  },
  {
    postid: vscodePost,
    author: sofia,
    value: "Just installed a few of these. Already seeing improvements in my workflow! The GitLens extension is a game-changer for code reviews.",
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000)
  },
  {
    postid: vscodePost,
    author: lucas,
    value: "Awesome list! I'd also recommend the Docker extension if you're working with containers. It makes managing containers so much easier.",
    createdAt: new Date(Date.now() - 3.5 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 3.5 * 24 * 60 * 60 * 1000)
  },
  {
    postid: gitWorkflowPost,
    author: emma,
    value: "Git workflows can be confusing, but this guide cleared things up for me. We're implementing Git Flow at our company and this is perfect timing!",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  },
  {
    postid: gitWorkflowPost,
    author: alexandre,
    value: "Great explanation of merge vs rebase! I've been using rebase for feature branches and it keeps the history so much cleaner. Thanks for the detailed comparison.",
    createdAt: new Date(Date.now() - 6.5 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 6.5 * 24 * 60 * 60 * 1000)
  },
  {
    postid: typescriptPost,
    author: priya,
    value: "TypeScript has been a lifesaver for our team! The type safety caught so many bugs before they reached production. Great guide on generics!",
    createdAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000)
  },
  {
    postid: typescriptPost,
    author: emma,
    value: "We migrated our React app to TypeScript last month. The interface examples you provided were exactly what we needed. Thanks!",
    createdAt: new Date(Date.now() - 8.5 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 8.5 * 24 * 60 * 60 * 1000)
  },
  {
    postid: dockerPost,
    author: james,
    value: "Docker has simplified our deployment process so much! The multi-stage build example was particularly helpful for reducing image size.",
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000)
  },
  {
    postid: dockerPost,
    author: lucas,
    value: "Great tutorial! One tip: always use .dockerignore to exclude node_modules and other unnecessary files. It makes builds much faster.",
    createdAt: new Date(Date.now() - 7.5 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 7.5 * 24 * 60 * 60 * 1000)
  },
  {
    postid: reactPerfPost,
    author: alexandre,
    value: "React.memo saved us from unnecessary re-renders! We saw a 40% performance improvement after implementing it on our list components.",
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
  },
  {
    postid: reactPerfPost,
    author: olivia,
    value: "Code splitting with React.lazy was a game-changer for our app's initial load time. Great explanation of when to use it!",
    createdAt: new Date(Date.now() - 9.5 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 9.5 * 24 * 60 * 60 * 1000)
  },
  {
    postid: reactNativePost,
    author: sofia,
    value: "Just started learning React Native and this guide is perfect! The navigation setup was exactly what I needed. Thanks for sharing!",
    createdAt: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000)
  },
  {
    postid: reactNativePost,
    author: emma,
    value: "We're building a mobile app with React Native at work. The native modules section was super helpful for integrating with device features.",
    createdAt: new Date(Date.now() - 10.5 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 10.5 * 24 * 60 * 60 * 1000)
  }
]);

print("✅ Fake data inserted successfully!");
print("📊 Summary:");
print("   - Users: " + db.users.countDocuments());
print("   - Categories: " + db.categories.countDocuments());
print("   - Posts: " + db.posts.countDocuments());
print("   - Comments: " + db.comments.countDocuments());
