import React from 'react'

const SocialLink = ({ link, icon }) => {

  return (
    <a 
      href={link}
      target='_blank'
      className='footer__link clickable'
    >
      <i className='footer__icon'>{icon}</i>
    </a>
  )
}

export default SocialLink;
