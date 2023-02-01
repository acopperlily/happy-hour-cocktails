import React from "react";
import { FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa';

function Footer() {

  return (

    <footer>

      <p><span>&copy; 2022 &#8212; 2023 </span> <a href="https://aprilcopley.netlify.app" target='_blank'>April Copley</a></p>

      <div className="links">

        <a href="https://twitter.com/aprilcopley_dev" target='_blank'>
          <i><FaTwitter /></i>
        </a>

        <a href="https://github.com/acopperlily" target='_blank'>
          <i><FaGithub /></i>
        </a>

        <a href="https://www.linkedin.com/in/april-copley/" target='_blank'>
          <i><FaLinkedin /></i>
        </a>

      </div>
      
    </footer>
  );
};

export default Footer;