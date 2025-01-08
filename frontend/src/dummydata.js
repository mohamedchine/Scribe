const posts = [
  {
    id: 1,
    title: "How to Learn React",
    category: "Programming",
    image: "https://images.unsplash.com/photo-1606787365080-86c1038b1286", // React related image from Unsplash
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
    image: "https://images.unsplash.com/photo-1582572281488-f5623b16f65a", // JavaScript related image from Unsplash
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
    image: "https://images.unsplash.com/photo-1593642634367-d91a135587b5", // Tech related image from Unsplash
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
    image: "https://images.unsplash.com/photo-1533183179301-244b4165d34e", // Backend related image from Unsplash
    likes: [101, 108],
    createdAt: "2023-12-19T11:20:00Z",
    user: {
      fullname: "Sarah Lee",
      image: "https://randomuser.me/api/portraits/women/5.jpg" // Random user profile image
    }
  }
];

export default posts;
