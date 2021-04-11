import React ,{useEffect, useState,useRef}from 'react';
import axios from "axios";
import {withRouter} from "react-router-dom";

function dateForm(num){
    return num.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
}

function getFormatDate(date){
    var year = date.getFullYear();              //yyyy
    var month = (1 + date.getMonth());          //M
    month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
    var day = date.getDate();                   //d
    day = day >= 10 ? day : '0' + day;          //day 두자리로 저장
    return  year + '' + month + '' + day;       //'-' 추가하여 yyyy-mm-dd 형태 생성 가능
}

function validation(data){

    // 타이틀
    if(!data.title){
        alert('내용을 입력해 주세요');
        return false;
    }
    // 내용
    if(!data.content){
        alert('내용을 입력해 주세요');
        return false;
    }
    return true;
}

function addView(seq){
    return axios.put(`/api/board/${seq}`);
}

function getDetail(seq){
    return axios.get(`/api/board/${seq}`);
}

function BoardPage(props) {
    const [seq, setSeq] = useState(props.match.params.id);
    const [type, setType] = useState('1');
    const [title, setTitle] = useState('');
    const [content, setContents] = useState('');
    const titleInput = useRef(null);
    const contentInput = useRef(null);


    const changeTypeHandler = (e) => {
        setType(e.target.value);
    }

    const changeTitleHandler = (e) => {
        setTitle(e.target.value);
    }

    const changeContentHandler = (e) => {
        setContents(e.target.value);
    }

    const registClick = (e) => {
        console.log('등록')
        const reqData = {
            title : title,
            content : content,
            //writeDate : getFormatDate(new Date),
            //updateDate : getFormatDate(new Date),
            //like : 0, 
            //view : 0
        };

        if(!validation(reqData)){
            return;
        }

        axios.post('/api/board',reqData).then(res =>{
            if(res && res.data.success) {
                alert('게시글이 등록되었습니다.');
                props.history.push('/board');
            }else{
                alert('게시글 등록 실패하였습니다.');
            }
        });
    }

    const cancelClick = (e) => {
        props.history.push('/board');
    }

    const deleteClick = (e) => {
        if(window.confirm('삭제하시겠습니까?')){
            axios.delete(`/api/board/${seq}`).then(res =>{
                if(res && res.data.success) {
                    alert('게시글이 삭제되었습니다.');
                    props.history.push('/board');
                }else{
                    alert('게시글 삭제 실패하였습니다.');
                }
            });
        }
    }


    useEffect(() => {
        axios.get(`/api/board/${seq}`).then(res => {
            if(res) {
                console.log(res)
                const list = res.data.list;
                setTitle(list.title);
                setContents(list.content);
            }
        });
    },[])

    return (
        <div>
            <div className = "container">
                <div className = "row">
                    <div className = "card col-md-6 offset-md-3 offset-md-3">
                        <h3 className="text-center">새글을 작성해주세요</h3>
                        <div className = "card-body">
                            
                                <div className = "form-group">
                                    <label> Type </label>
                                    <select placeholder="type" name="type" className="form-control" value={type} onChange={changeTypeHandler}>
                                        <option value="1"   >자유게시판</option>
                                    </select>
                                </div>
                                <div className = "form-group">
                                    <label> Title </label>
                                    <input type="text" placeholder="title" name="title" className="form-control" value={title} onChange={changeTitleHandler} ref={titleInput}/>
                                </div>
                                <div className = "form-group">
                                    <label> Contents  </label>
                                    <textarea placeholder="contents" name="contents" className="form-control" value={content} onChange={changeContentHandler} ref={contentInput}/>
                                </div>
                                <button className="btn btn-success" onClick={registClick}>Save</button>
                                <button className="btn btn-danger" style={{marginLeft:"10px"}} onClick={cancelClick}>Cancel</button>
                                <button className="btn btn-danger" style={{marginLeft:"10px"}} onClick={deleteClick}>Delete</button>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}


export default withRouter(BoardPage);