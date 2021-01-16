import React from 'react';
import {Modal} from 'react-bootstrap';


export default function (props)
{
    return <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Body>
            <ul>
                {
                    props.summons && props.summons.map((hero,i) => 
                        <li key={i}>{hero.name}</li>
                    )
                }
            </ul>
        </Modal.Body>
    </Modal>
}