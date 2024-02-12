import React from "react";
import { FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa';
import SocialLink from "./SocialLink";

const socialInfo = [
  { link: 'https://twitter.com/aprilcopley_dev', icon: FaTwitter },
  { link: 'https://github.com/acopperlily', icon: FaGithub },
  { link: 'https://www.linkedin.com/in/april-copley', icon: FaLinkedin}
];

function Footer() {

  const startYear = 2022;
  const currentYear = new Date().getFullYear();

  let dateRange = startYear;

  if (currentYear > startYear) {
    // En dash unicode: \u2013
    dateRange += `\u2013${currentYear}`; 
  }

  return (

    <footer className="footer">

      <div className="footer__container container">

        <div className="footer__info">
          <span className="footer__dates">&copy; {dateRange}</span>
          <a href="https://aprilcopley.netlify.app" target="_blank" className="footer__portfolio footer__link clickable">
            April Copley
          </a>
        </div>

        <div className="footer__links">

          {socialInfo.map((social, i) => (
            <SocialLink key={i} link={social.link} icon={<social.icon />} />
          ))}

        </div>
      </div>
      
    </footer>
  );
};

export default Footer;
