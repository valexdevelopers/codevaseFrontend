import React from "react";

import PythonSnippet2 from "../../../assets/images/codeSnippet/python2.jpg";
import JavaSnippet from "../../../assets/images/codeSnippet/javasnippet2.jpg";
import JavascriptSnippet from "../../../assets/images/codeSnippet/javascript2.jpg";
import PythonSnippet from "../../../assets/images/codeSnippet/python3.jpg";
import "../../../assets/styles/homepage.styles.css";

function HomePage() {
  return (
    <div className="homePageContent">
      <div className="content_wrapper">
        <div>
          <div className="intro_header">
            <h1>
              &nbsp;&nbsp;The best place to learn , practice, test, and store
              code online.
            </h1>
          </div>
          <div className="intro_parag">
            <p>
              CodePen is a social development environment for front-end
              designers and developers. Build and deploy a website, show off
              your work, build test cases to learn and debug, and find
              inspiration.
            </p>
          </div>
          <div className="intro_action">
            <a
              href="/signup"
              className="black_text with_bg with_radius bordered no_text_decoration btn_link "
            >
              Sign Up for free
            </a>
          </div>
        </div>
        <div>
          <div className="code_snippets_wrap">
            <div className="code_snippet">
              <img
                src={PythonSnippet2}
                alt=""
                className="firstSnippet code_snippet_img"
              />
            </div>
            <div className="code_snippet">
              <img
                src={JavaSnippet}
                alt=""
                className="secondSnippet code_snippet_img"
              />
            </div>
            <div className="code_snippet">
              <img
                src={JavascriptSnippet}
                alt=""
                className="thirdSnippet code_snippet_img"
              />
            </div>
            <div className="code_snippet">
              <img
                src={PythonSnippet}
                alt=""
                className="fourthnippet code_snippet_img"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
