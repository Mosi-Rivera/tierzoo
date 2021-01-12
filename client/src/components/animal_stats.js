import React from 'react';
const keys = [
    'health',
    'attack',
    'intelligence',
    'mobility',
    'stealth',
    'defence',
];

function StatBars(props)
{
    return <ul className='stat-bars'>
        {
            keys.map((key,i) => <li key={i}>
                <div style={{width: Math.min((props.stats[key] / props.max) * 100,100) + '%'}}></div>
                <span>{props.stats[key]}</span>
                <h3>{key}</h3>
            </li>)
        }
    </ul>
}

export default function (props)
{
    return <div className='animal-stats'>
        <div className='c-stat-bars' style={{paddingRight: '1rem'}}>
            <h3>Stats</h3>
            <StatBars max={props.stats.health} stats={props.stats}/>
        </div>
        <div className='c-gv-bars'>
            <h3>Genes</h3>
            <StatBars max={60} stats={props.gv}/>
        </div>
    </div>
}