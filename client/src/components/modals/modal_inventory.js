import React from 'react';
import {Modal} from 'react-bootstrap';


export default function (props)
{
  let inventory = props.inventory;
    return <Modal show={props.show} onHide={props.handleClose} centered>
        <Modal.Body>
          <ul>
            {
              inventory && Object.keys(inventory).map((key,i) => {
                let value = inventory[key];
                if (value > 0)
                  return <li key={i}>{inventory[key]}</li>
                return null;
              })
            }
          </ul>
        </Modal.Body>
      </Modal>
}