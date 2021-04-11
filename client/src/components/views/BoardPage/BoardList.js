import React ,{useEffect, useState}from 'react';
import { Link } from 'react-router-dom';

function dateForm(date){
    date = String(date);
    const _date = date.substring(0,8);
    return _date.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
}


function BoardList(props) {

    const onClickHandler = (e) => {
        console.log(e)
        const seq = e.target.dataset.seq;
        props.history.push('/board-update');
        
    }

    return (
        <tr>
            <td> {props.value.seq} </td>
            <td><Link to={`/board-update/${props.value.seq}`} seq={props.value.seq}>{props.value.title}</Link></td>
            <td> {props.value.writer} </td>
            <td> {dateForm(props.value.writeDate)} </td>
            <td> {dateForm(props.value.updateDate)} </td>
            <td> {props.value.like} </td>
            <td> {props.value.view} </td>
        </tr>
    )
}


export default BoardList;