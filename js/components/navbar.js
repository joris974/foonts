import React from 'react'
import { Link } from 'react-router'

const Navbar = () => {
  const links =
    <ul className="nav navbar-nav navbar-right">
      <li>
        <Link
          to="/generate"
          activeClassName="active"
        >
          Generate
        </Link>
      </li>
      <li>
        <Link
          to="/explore/recent"
          activeClassName="active"
        >
          Explore
        </Link>
      </li>
    </ul>
  return (
    <nav className="navbar navbar-default navbar-foonts">
      <div className="container">
        <div className="navbar-header">
          <Link
            to="/"
            className="navbar-brand"
            activeClassName="active"
          >
            Foonts
          </Link>
        </div>
        {links}
      </div>
    </nav>
  )
}

export default Navbar