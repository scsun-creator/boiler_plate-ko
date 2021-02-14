import React,{useEffect} from "react";
import axios from "axios";
import {useDispatch} from "react-redux";
import {auth} from "../_actions/user_action";

export default function (SpecificComponent, option, adminRoute = null){

    // option : null  아무나
    // option : true  로그인한 유저만
    // option : false  로그인 유저는 출입 불가
    
    function AuthenticationCheck(props) {
        const  dispatch = useDispatch();
        useEffect(() => {

            dispatch(auth()).then(res => {
                console.log(res)
                // 로그인 하지 않은 상태
                if (!res.payload.isAuth){
                    if (option){
                        props.history.push('/login')
                    }
                }else{
                    // 로그인 한 상태
                    if (adminRoute && res.payload.isAuth){
                        props.history.push('/')
                    }else{
                        if (!option){
                            props.history.push('/')
                        }
                    }

                }
            })

        },[])

        return (
            <SpecificComponent/>
        )
    }

    return AuthenticationCheck
}