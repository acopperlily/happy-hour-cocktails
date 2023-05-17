import React from "react";
import { FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa';

function Footer() {

  return (

    <footer className="footer">

      <div className="footer__container container">

        {/* <p><span>&copy; 2022—2023 </span> <a href="https://aprilcopley.netlify.app" target='_blank'>April Copley</a></p> */}

        <div className="footer__info">
          <span className="footer__dates">&copy; 2022—2023</span>
          <a href="https://aprilcopley.netlify.app" target="_blank" className="footer__portfolio footer__link clickable">
            April Copley
          </a>
        </div>

        <div className="footer__links">

          <a className="footer__link clickable" href="https://twitter.com/aprilcopley_dev" target='_blank'>
            <i><FaTwitter /></i>
          </a>

          <a className="footer__link clickable" href="https://github.com/acopperlily" target='_blank'>
            <i><FaGithub /></i>
          </a>

          <a className="footer__link clickable" href="https://www.linkedin.com/in/april-copley/" target='_blank'>
            <i><FaLinkedin /></i>
          </a>

        </div>
      </div>
      
    </footer>
  );
};

export default Footer;