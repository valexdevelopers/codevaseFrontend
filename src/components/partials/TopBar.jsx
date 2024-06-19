import React, { useState } from 'react'
import { languageOptions } from "../../custom/languageOptions";
import * as BIcons from 'react-bootstrap-icons';

function TopBar() {
    const langauages = languageOptions.map(language => <li key={language.id} className="no_list_style">{language.name}</li>);
    const [languageVisibility, setLanguageVisibility] = useState(false)
   
  return (
      <div className="topBar">
        <div className="search_container">
            <div>
                <form action="">
                      <div className="search_group">
                          <input type="search" name="" id="" className="search_input" placeholder='Search Code and Challenges ...' />
                      </div>
                </form>
            </div>
        </div>
          <div className="right_side_nav">
            <div className="drop_down_container">
                <button type="button"
                      className="language_dropdown_btn"
                      onClick={(event) => setLanguageVisibility((prevState) => !prevState)}
                >
                    <span>Supported Languages</span>
                    {
                        languageVisibility ? <BIcons.CaretUpFill /> : <BIcons.CaretDownFill className="dropdown_carret"/>
                    }
                      
                    
                </button> 
                  <div className={languageVisibility ? "language_dropdown show" : "language_dropdown hide"} >
                    <ul>
                        {langauages}
                    </ul>
                </div>
                
            </div>
            
            <div className="auth_links">
                <a href="/login" className="authbutton with_bg with_radius bordered no_text_decoration black_text" >Login</a>
                <a href="/register" className="authbutton transparent bordered with_radius no_text_decoration white_text">Sign Up</a>
            </div> 
        </div>
        
    </div>
  )
}

export default TopBar
