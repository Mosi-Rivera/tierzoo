import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { is_logged_in } from '../api/routes/auth';
import { Row, Col } from 'react-bootstrap';
import qs from 'query-string';
import { hero_info } from '../api/routes/hero';
import { error_handler } from '../api/environment';
import image_configs from '../sprites/config';
const stat_keys = [
    'hp',
    'atk',
    'def',
    'power',
    'crit',
    'dodge',
    'acc',
    'haste',
    'hp_recovery',
    'pr',
    'll',
];

export default function (props)
{
    console.log(props.show,props.info);
    return <div>
        <div className={'backdrop ' + (props.show ? 'show' : '')} onClick={props.handle_close}></div>
        <div  id='hero-info' className={'slider-right ' + (props.show ? 'show' : '')}>
            <Row>
                <Col sm={6}>
                    <div className='hero-left'>
                        <h3>{props.info?.name}</h3>
                        <h4>{props.info?.tier}</h4>
                        <span className='image-container info-image'>
                            {props.info && <img src={image_configs[props.info?.name]?.src}/>}
                        </span>
                    </div>
                </Col>
                <Col sm={6}>
                    <h4 className='power'><span>power:</span> <span>{props.info?.power}</span></h4>
                    <ul>
                        {
                            stat_keys.map((key,i) => <li key={i}>
                                <span>{key}</span> <span>{props.info?.[key]}</span>
                            </li>)
                        }
                    </ul>
                </Col>
            </Row>
        </div>
    </div>
    return 
}