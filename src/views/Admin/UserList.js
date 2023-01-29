import React from 'react';
import { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Input } from 'reactstrap';

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;

  &:focus, &:hover, &:visited, &:link, &:active {
      text-decoration: none;
  }
  &:active {
    color: blue;
  }
`;

const StyledThead = styled.thead`
    text-align: center;
    color: white;
    background-color: #2962ff;
`;

const UserList = () => {

    //사용자 목록
    const [users, setUsers] = useState([{
        useName: '',
        userId: '',
        userDept: '',
        userRank: '',
        userPosition: '',
        userAuthority: '',
        userStatus: ''
      }]);
    
    //사용자 목록 axios
    useEffect(() => {
    axios.get("http://localhost:8080/CMN/userList.do")
        .then((response) => {
        setUsers(response.data);
        })
    }, []);

      // searchKey, Value
  const [searchKey, setSearchKey] = useState("userDept");
  const [searchValue, setSearchValue] = useState("");

  // searchKey 변경
  const onChangeSearchKey =(e)=> {
    let key = e.target.value;
    console.log(key);
    setSearchKey(key);
  }

  // searchValue 변경
  const onChangeSearchValue =(e)=> {
    let value = e.target.value;
    console.log(value);
    setSearchValue(value);
  }

  // 검색 axios
  useEffect(() => {
    axios.get("http://localhost:8080/CMN/userSearch.do?searchKey="+searchKey+"&searchValue="+searchValue)
    .then((response) => {
        setUsers(response.data)
    })
  }, [searchKey, searchValue]);

    return (
        <div>
            <div className="col-lg-12">
                <div className="card">
                <h6 className="border-bottom p-3 mb-0 card-title"><i className="bi bi-card-text me-2"> </i>사원 목록</h6>
                <div className="card-body">
                    <Input type='select' style={{width:"150px", display:"inline", marginRight:"10px"}} onChange={onChangeSearchKey}>
                        <option value={"userDept"}>부서</option>
                        <option value={"userName"}>이름</option>
                        <option value={"userId"}>아이디</option>
                        <option value={"userRank"}>직급</option>
                        <option value={"userPosition"}>직책</option>
                        <option value={"userStatus"}>상태</option>
                    </Input>
                    <Input type={"text"} style={{width:"500px", display:"inline"}} value={searchValue} onChange={onChangeSearchValue} placeholder={"Search..."}></Input>  
                    <button type={'button'} className="btn btn btn-danger" style={{float:"right"}}>삭제</button> 
                    <Link to={"/Admin/UserModify?userId="}>
                        <button type={'button'} className="btn btn btn-primary" style={{float:"right", marginRight:"10px"}}>수정</button>
                    </Link>
                    <br/><br/>
                    <table className="table table-bordered table-hover">
                    <StyledThead>
                        <tr>
                            <th style={{width:"2%", textAlign:"center"}}><input type={"checkbox"}/></th>
                            <th style={{width:"10%"}}>이름</th>
                            <th style={{width:"18%"}}>아이디</th>
                            <th style={{width:"14%"}}>부서</th>
                            <th style={{width:"14%"}}>직급</th>
                            <th style={{width:"14%"}}>직책</th>
                            <th style={{width:"14%"}}>상태</th>
                        </tr>
                    </StyledThead>
                    <tbody>
                        {users.length < 1 ?
                            (
                                <tr>
                                    <td colSpan={9} style={{textAlign:"center"}}>검색 결과가 없습니다.</td>
                                </tr>
                            ):
                            (   
                                users.map((user, index) => (
                                    <tr key={index}>
                                        <td style={{textAlign:"center"}}><input type={"checkbox"}/></td>
                                        <td>{user.userName}</td>
                                        <td className="target">
                                            <StyledLink to={"/Admin/UserInfo?userId="+user.userId}>{user.userId}</StyledLink>
                                        </td>
                                        <td>{user.userDept}</td>
                                        <td>{user.userRank}</td>
                                        <td>{user.userPosition}</td>
                                        <td>{user.userStatus}</td>
                                    </tr>
                                ))
                            )
                        }
                    </tbody>
                    </table>
                </div>
                </div>
            </div>
        </div>
    );
};

export default UserList;