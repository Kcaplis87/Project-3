import React from 'react';

import './CharityList.css';

const CharityList = props => (
  <ul className="charity__list">
    {props.charities.map(charity => {
      return (
        <li key={charity._id} className="charities__item">
          <div className="charities__item-data">
            {charity.event.title} -{' '}
            {new Date(charity.createdAt).toLocaleDateString()}
          </div>
          <div className="charities__item-actions">
            <button className="btn" onClick={props.onDelete.bind(this, charity._id)}>Cancel</button>
          </div>
        </li>
      );
    })}
  </ul>
);

export default CharityList;