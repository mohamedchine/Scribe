import React from 'react';
import { Link } from 'react-router-dom';
const Namiddle = (props) => {
    const { showMiddle} = props ;
    return (
    // React accepts inline styles as JS objects, so the first {} is for JS and the second {} is for the object
    <div
      className="navbar-middle"
      style={
        showMiddle
          ? { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }
          : {}
      }
    >
     <Link to="/" >
      <div className="x home">
        <div className="icon">
          <i className="bi bi-house"></i>
        </div>
        <div className="text">Home</div>
      </div>
      </Link>


      <Link to="/posts">
      <div className="x posts">
        <div className="icon">
          <i className="bi bi-journal-richtext"></i>
        </div>
        <div className="text">Posts</div>
      </div>
      </Link>
      
      <Link to = "/posts/create-post">
      <div className="x create">
        <div className="icon">
          <i className="bi bi-journal-plus"></i>
        </div>
        <div className="text">Create Post</div>
      </div>
      </Link>
      <Link to ="admin-dashboard">
      <div className="x admin">
        <div className="icon">
          <i className="bi bi-tools"></i>
        </div>
        <div className="text">Admin Dashboard</div>
      </div>
      </Link>
    
    </div>
  );
};

export default Namiddle;
