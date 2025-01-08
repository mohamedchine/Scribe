import Navbar from "./components/navbar/navbar";
import {Routes , Route , BrowserRouter} from 'react-router-dom';
import Home from "./page/home/home";
import PostPage from "./page/posts/posts";
import CreatePostPage from "./page/createpost/createposts";
import AdminDashboardPage from "./page/admin/admin-dashboard";
import Login from "./page/forms/login";
import Register from "./page/forms/register"
function App() {
  return (
    <div className="App">
     <BrowserRouter>
       <Navbar></Navbar>
       <Routes>
         <Route path="/" element={<Home/>} />
         <Route path="/posts" element={<PostPage/>} />
         <Route path="/posts/create-post" element={<CreatePostPage/>} />
         <Route path="/admin-dashboard" element={<AdminDashboardPage/>} />
         <Route path="/login" element={<Login/>} />
         <Route path="/register" element={<Register/>} />
       </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
