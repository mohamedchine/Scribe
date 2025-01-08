import Postitems from './postitems'
import './posts.css'
const Postlist = ({posts}) => {
    return (  
        <div className="post-list">
            {posts.map(post=>{ return <Postitems post={post} />})}
        </div>
    );
}
 
export default Postlist;