import React from 'react';
import {Modal} from 'react-bootstrap';


export default function (props)
{
  let inventory = props.inventory;
    return <Modal show={props.show} onHide={props.handleClose} centered>
        <Modal.Body>
          <h3>{props.user?.username}</h3>
          <span>{props.user?.level}</span>
          <span>{props.user?.arena.elo}</span>
          <span>{Math.floor((props.user?.arena.wins/props.user?.arena.losses) * 100)} wr</span>
        </Modal.Body>
      </Modal>
}