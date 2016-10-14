'use strict';

import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

const PinLikes = ({ liked, handleClick, likes }) => {
  const likeClassName = liked ? 'user-liked' : 'user-not-liked';
  return (
    <p className='likes' onClick={handleClick}>
      <span className={likeClassName}>
        <FontAwesome
          className=''
          name='heart'
        />
      </span>
      <span className='likes-counter'>{likes}</span>
    </p>
  );
}

export default PinLikes;

