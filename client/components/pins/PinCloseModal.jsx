'use strict';

import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

const PinCloseModal = ({ owner, handleTogglePopup, confirmPopup, handleDeletePin}) => {
  return (
    <div className='pin-close-box-container'>
      {owner &&
      <p className='pin-close-box' onClick={handleTogglePopup}>
        <FontAwesome
          className='pin-close'
          name='times'
        />
      </p>
      }
      {confirmPopup && 
      <div className='confirm-remove-modal'>
        <p 
          className='confirm-remove-yes' 
          onClick={handleDeletePin}
        >
          <span>REMOVE</span>
        </p>
        <p 
          className='confirm-remove-no'
          onClick={handleTogglePopup}
        >
          <span>CANCEL</span>
        </p>
      </div>
      }
    </div>
  );
}

export default PinCloseModal;
