import React ,{useEffect}from 'react';
import axios from "axios";
import {withRouter} from "react-router-dom";
import Footer from '../Footer/Footer';

function LandingPage(props) {

    const onClickHandler = ()=>{
        axios.get('/api/users/logout').then(res => {

            if(res.data.success){
                props.history.push('/login')
            }else{
                alert('error')
            }
        })
    }

    // const onClickHandler = ()=>{

    //     props.history.push('/login')
    // }


    useEffect(() => {
        axios.get('/api/hello').then(res => {
            console.log('처음 랜딩 페이지');
            console.log(res)
        })

    },[])


    return (
        <div style={{
            display:"flex",justifyContent : 'center',alignItems : 'center'
            ,width:'100%',height:'100vh'
        }}>
            <h2>안녕하세요!</h2>
            <button onClick={onClickHandler} >로그인</button>
        </div>
    );
}

export default withRouter(LandingPage);
