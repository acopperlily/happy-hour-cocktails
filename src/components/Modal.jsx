import React from 'react';
import { FaTimes } from 'react-icons/fa';

const Modal = props => {
  return (
    <div className="modal">
      <div className="exitContainer">
        <FaTimes className='exit' onClick={props.toggleModal} />
      </div>
      <h1 className='modalTitle'>Welcome to Happy Hour Cocktails!</h1>
      <p>Quench your thirst on drinks served up by <a href="https://www.thecocktaildb.com/api.php" target='_blank' rel='noopener noreferrer'>TheCocktailDB</a> API.*</p>

      <p>You can search for a type of drink by name or by letter. There may be multiple results you can scroll through using the navigation arrows or dots.</p>

      <p>You can filter your results by ingredient using the dropdown. Select "None" if you wish to return to your original list of results.</p>

      <p><small>* All results are retrieved from <a href="https://www.thecocktaildb.com/api.php" target='_blank' rel='noopener noreferrer'>TheCocktailDB</a> on an "as is" basis. Please forgive any errors in spelling, grammar, syntax, or mixology.</small></p>
    </div>
  );
};

export default Modal;
