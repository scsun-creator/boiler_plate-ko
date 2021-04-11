import React ,{useState, useRef}from 'react';
import {withRouter} from 'react-router-dom';
import axios from "axios";
import {useDispatch} from "react-redux";
import {loginUser} from "../../../_actions/user_action";

function LoginPage(props) {
    const dispatch = useDispatch();

    const [Email,setEmail] = useState("");
    const [Password,setPassword] = useState("");
    const emailRef = useRef(null);
    const pwdRef = useRef(null);


    const onEmailHandler = function (event){
        setEmail(event.currentTarget.value);
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }

    const onsubmitHandler = (event) => {
        event.preventDefault();

        if(!Email){
            alert('이메일을 입력해 주세요.');
            emailRef.current.focus();
            return;
        }

        if(!Password){
            alert('패스워드를 입력해 주세요.');
            pwdRef.current.focus();
            return;
        }

        let body = {
            email : Email,
            password : Password
        }

        dispatch(loginUser(body)).then(res => {
            if (res.payload.loginSuccess){
                // 게시판 이동
                props.history.push('/board');

            }else{
                alert(res.payload.message);
            }
        })
    }

    const goRestPageHandler = (event) => {
        event.preventDefault();
        console.log('이동');
        props.history.push('/register')

    }
    return (
        <div style={{
            display:"flex",justifyContent : 'center',alignItems : 'center'
            ,width:'100%',height:'100vh'
        }}>
            <form style={{display : 'flex',flexDirection : 'column'}} >
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} ref={emailRef} />
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} ref={pwdRef} />
                <br/>
                <button type="submit" onClick={onsubmitHandler}>로그인</button>
                <button type="button" onClick={goRestPageHandler}>가입</button>
            </form>
            
        </div>
    );
}

export default withRouter(LoginPage);
