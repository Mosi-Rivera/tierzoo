import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { is_logged_in } from '../api/routes/auth';
import { Row, Col } from 'react-bootstrap';
import qs from 'query-string';
import { hero_info, level_up } from '../api/routes/hero';
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
    const handle_level_up = async () => {
        let _info = props.info;
        if (_info)
        {
            _info.level++;
            props.set_info(_info);
        }
        try
        {
            console.log(props.info);
            await level_up(props.info?._id);
        }
        catch(err)
        {
            console.log(err);
            let _info = props.info;
            if (_info)
            {
                _info.level--;
                props.set_info(_info);
            }
        }
    }
    return <div>
        <div className={'backdrop ' + (props.show ? 'show' : '')} onClick={props.handle_close}></div>
        <div  id='hero-info' className={'slider-right ' + (props.show ? 'show' : '')}>
            <div onClick={props.handle_close} className="close-button"></div>
            <Row>
                <Col sm={12}>
                    <div className='hero-left'>
                        <h3>{props.info?.name}</h3>
                        {console.log(props.info)}
                        <h4>{props.info?.level}</h4>
                        <h4>{props.info?.tier}</h4>
                        <span className='image-container info-image'>
                            {props.info && <img src={image_configs[props.info?.name]?.src}/>}
                        </span>
                    </div>
                </Col>
                <Col sm={12}>
                    <h4 className='power'><span>power:</span> <span>{props.info?.power}</span></h4>
                    <ul>
                        {
                            stat_keys.map((key,i) => <li key={i}>
                                <span>{key}</span> <span>{props.info?.[key]}</span>
                            </li>)
                        }
                    </ul>
                </Col>
                <Col sm={12}>
                    <div className='level-up' onClick={handle_level_up}>Level Up!</div>
                </Col>
            </Row>
        </div>
    </div>
    return 
}