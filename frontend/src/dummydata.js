const posts = [
  {
    id: 1,
    title: "How to Learn React",
    category: "Programming",
    image: "https://incubator.ucf.edu/wp-content/uploads/2023/07/artificial-intelligence-new-technology-science-futuristic-abstract-human-brain-ai-technology-cpu-central-processor-unit-chipset-big-data-machine-learning-cyber-mind-domination-generative-ai-scaled-1-2048x1366.jpg", // React related image from Unsplash
    likes: [101, 102, 103],
    createdAt: "2023-12-15T10:30:00Z",
    user: {
      fullname: "John Doe",
      image: "https://randomuser.me/api/portraits/men/1.jpg" // Random user profile image
    }
  },
  {
    id: 2,
    title: "Understanding JavaScript Closures",
    category: "Programming",
    image: "https://media.istockphoto.com/id/1452604857/photo/businessman-touching-the-brain-working-of-artificial-intelligence-automation-predictive.jpg?s=612x612&w=0&k=20&c=GkAOxzduJbUKpS2-LX_l6jSKtyhdKlnPMo2ito4xpR4=", // JavaScript related image from Unsplash
    likes: [101, 104],
    createdAt: "2023-12-16T14:00:00Z",
    user: {
      fullname: "Jane Smith",
      image: "https://randomuser.me/api/portraits/women/2.jpg" // Random user profile image
    }
  },
  {
    id: 3,
    title: "CSS Grid: A Comprehensive Guide",
    category: "Design",
    image: "https://images.unsplash.com/photo-1589296181282-87b6b046d078", // Design related image from Unsplash
    likes: [102, 105, 106],
    createdAt: "2023-12-17T08:15:00Z",
    user: {
      fullname: "Emily Johnson",
      image: "https://randomuser.me/api/portraits/women/3.jpg" // Random user profile image
    }
  },
  {
    id: 4,
    title: "The Future of Web Development",
    category: "Technology",
    image: "https://cdn.britannica.com/47/246247-050-F1021DE9/AI-text-to-image-photo-robot-with-computer.jpg", // Tech related image from Unsplash
    likes: [103, 104, 107],
    createdAt: "2023-12-18T16:45:00Z",
    user: {
      fullname: "Michael Brown",
      image: "https://randomuser.me/api/portraits/men/4.jpg" // Random user profile image
    }
  },
  {
    id: 5,
    title: "Building a REST API with Node.js",
    category: "Backend",
    image: "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187.jpg?w=718&h=479", // Backend related image from Unsplash
    likes: [101, 108],
    createdAt: "2023-12-19T11:20:00Z",
    user: {
      fullname: "Sarah Lee",
      image: "https://randomuser.me/api/portraits/women/5.jpg" // Random user profile image
    }
  }
];

export default posts;
