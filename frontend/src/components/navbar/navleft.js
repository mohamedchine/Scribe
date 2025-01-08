const Naleft = (props) => {
    const {showMiddle,setshowMidle} = props ; 
    return (
        <div className="navbar-leftside">
            <div className="menu-icon" onClick={() => setshowMidle(!showMiddle)}>
                {showMiddle ? <i class="bi bi-x-lg"></i> : <i class="bi bi-justify"></i>}
            </div>
            <div>
                <p className="app-name">Scribe</p>
            </div>
            <div className="logo">
                <i class="bi bi-pencil-fill"></i>
            </div>
        </div>
    );
}

export default Naleft;