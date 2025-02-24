import { Link } from "react-router-dom";

const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  return (
    <div className = "nav">
      <Link className = "nav-item" to="/">Home</Link>
      <Link className = "nav-item" to="/SavedCandidates">Potential Candidates</Link>
    </div>
  )
};

export default Nav;
