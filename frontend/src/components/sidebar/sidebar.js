import { Link } from 'react-router-dom';
import { categories } from '../../dummydata';
import './sidebar.css';
import { useState } from 'react';
const Sidebar = ({categ}) => {
    const [showcat,setshowcat] = useState(true);
    
    return ( 
        <div className="posts-sidebar">
            <div className="posts-sidebar-title" onClick={()=>setshowcat(p=>!p)} >
                Categories
            </div>
            {showcat &&
            <div className="categories">
            {categories.map(category=>{
                return(
                    <Link to={"posts/categories/"+category.title} className='category' >
                        {category.title}
                    </Link>
                )
            })}
            </div>
            }
            
        </div>
     );
}
 
export default Sidebar;