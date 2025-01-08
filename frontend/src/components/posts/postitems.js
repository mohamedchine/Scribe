const Postitems = ({post}) => {
    return ( 
        <div className="post-itmes">
            <div className="post-img-wrapper">
            <img src={post.image} alt={post.title} className="post-img" />
            </div>
        </div>
     );
}
 
export default Postitems;