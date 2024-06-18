import React from 'react'

function TopBar() {
  return (
      <div className="topBar">
        <div className="search_container">
            <div>
                <form action="">
                      <div className="search_group">
                          <input type="search" name="" id="" placeholder='Search Code and Challenges ...' />
                      </div>
                </form>
            </div>
        </div>
        <div className="language_dropdown">
            <ul>
                <li><a href=""></a></li>
            </ul>
        </div>  
        <div className="auth_links">
              <a href="/user/login" className="authbutton with_bg with_radius bordered no_text_decoration black_text">Login</a>
              <a href="/user/register" className="authbutton transparent bordered with_radius no_text_decoration white_text">Sign Up</a>
        </div>
    </div>
  )
}

export default TopBar
