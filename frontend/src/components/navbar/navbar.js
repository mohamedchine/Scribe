import React, { useState } from 'react';
import Naleft  from './navleft';
import Naright from './navright'
import Namiddle from './navmiddle';
import "./navbar.css";
const Navbar = () => {
    const [showMiddle , setshowMidle] = useState(false);
    return ( 
        <div className="navbar">
          <Naleft showMiddle={showMiddle} setshowMidle={setshowMidle} />
          <Namiddle showMiddle={showMiddle}  />
          <Naright></Naright>
        </div>

     );
}
 
export default Navbar;