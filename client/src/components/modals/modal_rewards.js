import React from 'react';
import {Modal} from 'react-bootstrap';


export default function (props)
{
  let rewards = props.rewards;
    return <Modal show={props.show} onHide={props.handleClose} centered>
        <Modal.Body>
          <ul>
            {
              rewards && Object.keys(rewards).map((key,i) => {
                let value = rewards[key];
                if (value > 0)
                  return <li key={i}>{rewards[key]}</li>
                return null;
              })
            }
          </ul>
        </Modal.Body>
      </Modal>
}