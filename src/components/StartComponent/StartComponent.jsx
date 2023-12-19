import React from 'react';
import "./StartComponent.css";
import LeftSide from '../LeftSide/LeftSide';

const StartComponent = () => {
  return (
    <div className='start_component'>
        <div className='left_side'>
            <LeftSide />
        </div>
        <div className='right_side'>
            <div className='part_one'>
            right 1
            </div>
            <div className='part_two'>
            right 2
            </div>
        </div>
    </div>
  )
}

export default StartComponent