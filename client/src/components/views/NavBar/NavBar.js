import React ,{useState}from 'react';
import { Link } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import {logout} from "../../../_actions/user_action";
import { withRouter } from 'react-router-dom';

function NavBar(props) {

    const dispatch = useDispatch();
    const user = useSelector(state => state);
    let flag = user.user.isLogin;
    
    const onClickHandler = ()=>{
        dispatch(logout()).then(res => {
            if(res.payload.success){
                props.history.push('/login');
            }else{
                alert('error')
            }
        })
    }
    
    return (
        
        <header>
            <div style={{float:'right'}}>
                헤더영역
                {flag ? (
                    <button onClick={onClickHandler}>로그아웃</button>
                    ) : (
                    <Link to="/login"> 
                        <button>로그인</button>
                    </Link>)
                }
            </div>
        </header>
    );
}

export default withRouter(NavBar);
