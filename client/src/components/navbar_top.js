import React from 'react';

export default function (props)
{
    return <nav id='navbar-top'>
        <ul>
            <li>profile {props.user?.level}</li>
            <li>{props.user?.username}</li>
        </ul>
        <ul>
            <li>{props.inventory?.scrolls}</li>
            <li>{props.inventory?.gold}</li>
            <li>{props.inventory?.gems}</li>
        </ul>
    </nav>
}