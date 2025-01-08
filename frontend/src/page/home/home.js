import Postlist from '../../components/posts/postList';
import './home.css'
import posts from '../../dummydata'; 
const HomePage = () => {
    return ( 
        <div className="home-page">
            <p class = "home-latest">Latest posts</p>
            <div className="home-page-content ">
            <Postlist posts={posts} />
            <div className="posts-sidebar">sidebar</div>
            </div>
        </div>
     );
}
 
export default HomePage;