import Postlist from '../../components/posts/postList';
import './home.css'
import {posts,categories} from '../../dummydata'; 
import Sidebar from '../../components/sidebar/sidebar';
const HomePage = () => {
    return ( 
        <div className="home-page">
            <p class = "home-latest">Latest posts</p>
            <div className="home-page-content ">
            <Postlist posts={posts} />
            <Sidebar categ={categories}></Sidebar>
            </div>
        </div>
     );
}
 
export default HomePage;