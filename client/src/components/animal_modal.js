import React from 'react';
import { Modal } from 'react-bootstrap';
import AnimalStats from './animal_stats';

export default function (props)
{
    return <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
            <img key={0} src={'/assets/animals/' + props.data?.species +'.png'}/><span>{props.data?.species}</span>
            </Modal.Title>
        </Modal.Header>
        <Modal.Body className='animal-modal-body'>
            <h3>Lvl. {props.data?.level}</h3>
            { props.data && 
                <AnimalStats stats={props.data.stats} gv={props.data.gv}/>
            }
        </Modal.Body>
    </Modal>
}