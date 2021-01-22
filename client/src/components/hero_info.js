import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { level_up } from '../api/routes/hero';
import image_configs from '../sprites/config';
import {close, modal_enum,set} from '../redux/reducers/r_modals';
import {inc_level, set_info} from '../redux/reducers/r_hero_info';
import {useSelector,useDispatch} from 'react-redux'
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
    const dispatch = useDispatch();
    const info = useSelector(state => state.hero_info);
    const active = useSelector(state => state.modals.active);
    const handle_close = () => dispatch(close());
    const handle_level_up = async () => {
        dispatch(inc_level(1));
        try
        {
            let _info = await level_up(info?._id);
            console.log(_info);
            dispatch(set_info(_info));
        }
        catch(err)
        {
            console.log(err);
            dispatch(inc_level(-1));
        }
    }
    return <div>
        <div className={'backdrop ' + (active === modal_enum.info ? 'show' : '')} onClick={handle_close}></div>
        <div  id='hero-info' className={'slider-right ' + (active === modal_enum.info ? 'show' : '')}>
            <div onClick={handle_close} className="close-button"></div>
            <Row>
                <Col sm={12}>
                    <div className='hero-left'>
                        <h3>{info?.name}</h3>
                        <h4>{info?.level}</h4>
                        <h4>{info?.tier}</h4>
                        <span className='image-container info-image'>
                            {info && <img src={image_configs[info?.name]?.src}/>}
                        </span>
                    </div>
                </Col>
                <Col sm={12}>
                    <h4 className='power'><span>power:</span> <span>{info?.power}</span></h4>
                    <ul>
                        {
                            stat_keys.map((key,i) => <li key={i}>
                                <span>{key}</span> <span>{info?.[key]}</span>
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