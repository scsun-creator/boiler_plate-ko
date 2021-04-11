import React ,{useEffect, useState}from 'react';
import axios from "axios";
import {withRouter} from "react-router-dom";
import BoardList from './BoardList'

function dateForm(num){
    return num.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
}

function BoardPage(props) {

    const [board,setBoard] = useState([]);
    
    useEffect(() => {
        axios.get('/api/board').then(res => {
            if(res) {
                const list = res.data.list;
                setBoard(list);
            }
        });
    },[])

    const onClickHandler = (e) => {
        //e.preventDefault();
        props.history.push('/board-regist');
    }

    return (
        <div>
            <h2 className="text-center">Boards List</h2>
            <div className = "row" style={{marginBottom : "20px"}}>
                <button className="btn btn-primary" onClick={onClickHandler}> 글 작성</button>
            </div>
            <div className ="row">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>글 번호</th>
                            <th>타이틀 </th>
                            <th>작성자 </th>
                            <th>작성일 </th>
                            <th>갱신일 </th>
                            <th>좋아요수</th>
                            <th>조회수</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            board.map((k,index)=>{
                                return (
                                    <BoardList value={k} index={index} key={k.seq}></BoardList>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );

}


export default withRouter(BoardPage);