import React from 'react';
import { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Input } from 'reactstrap';
import Pagination from '../../components/Pagination';
import ComponentCard from '../../components/ComponentCard';

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

const PageSelect = styled.select`
  border: 1px solid #dddddd;
  border-radius: 5px;
  width: 150px;
  height: 40px; 
  text-align: center;
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

    // 리스트 출력 개수, 페이지네이션
    const [cntPerPage, setCntPerPage] = useState(5); //보여줄 리스트 row
    const [nowPage, setNowPage] = useState(1); //현재 페이지 num
    const offset = (nowPage - 1) * cntPerPage; //시작점과 끝점을 구하는 offset

    const onChangePageCnt =(e)=> {
        console.log(e.target.value, 'cntChange');
        let limit = Number(e.target.value);
        setCntPerPage(limit);
        setNowPage(1);
    }

    // 체크박스 이벤트 start
    const [checkedList, setCheckedList] = useState([]);

    // 개별체크
    const checkedInputs =(checked, item)=>{
        if(checked){
        setCheckedList([...checkedList, item]);
        } else if (!checked) {
        setCheckedList(checkedList.filter(el => el !== item));
        };
    }

    // 전체체크
    const allCheck =(checked)=>{
        if(checked){
        const idArray =[];
        users.slice(offset, offset + cntPerPage).forEach((el) => idArray.push(el.userId));
        console.log(idArray);
        setCheckedList(idArray);
        }else{
        setCheckedList([]);
        }
    }

    useEffect(() => {
        console.log(checkedList)
    }, [checkedList])
    // 체크박스 이벤트 end

    // 수정 버튼 클릭 이벤트 start
    const onClickModifyBtn =()=>{
        console.log(1)
        if(checkedList.length === 0){
            alert('수정 대상을 선택해주세요!');
        }else if(checkedList.length > 1){
            alert('수정 대상은 한명만 선택해주세요!');
        }else{
            console.log(checkedList.values);
            window.location.replace('/Admin/UserInfo?userId='+checkedList);
        }
    }
    // 수정 버튼 클릭 이벤트 end

   // 삭제 이벤트 Start
    const onClickDeleteBtn =()=>{
        console.log(checkedList);
        if(checkedList.length < 1){
        alert('삭제할 대상을 선택해주세요!')
        return false;
        }
       

        if(window.confirm("정말 삭제하시겠습니까?")){
            //yes
            checkedList.map(check => (
              axios.post("http://localhost:8080/CMN/userDelete.do?userId="+check)
              .then((response) => {
                window.location.replace('/Admin/UserList');
              })
              .catch((error) => {
                alert('웨실패')
              })
            ));
            alert('정상적으로 삭제되었습니다.');
          } else {
            //no
            alert('삭제를 취소합니다.');
          };
    }
    // 삭제 이벤트 End 

    return (
        <div>
            <ComponentCard title={'사용자 목록'}>
                <Input type='select' style={{width:"150px", display:"inline", marginRight:"10px"}} onChange={onChangeSearchKey}>
                    <option value={"userDept"}>부서</option>
                    <option value={"userName"}>이름</option>
                    <option value={"userId"}>아이디</option>
                    <option value={"userRank"}>직급</option>
                    <option value={"userPosition"}>직책</option>
                    <option value={"userStatus"}>상태</option>
                </Input>
                <Input type={"text"} style={{width:"500px", display:"inline"}} value={searchValue} onChange={onChangeSearchValue} placeholder={"Search..."}></Input>  
                <button type={'button'} className="btn btn btn-danger" style={{float:"right"}} onClick={onClickDeleteBtn}>삭제</button> 
                <button type={'button'} className="btn btn btn-primary" style={{float:"right", marginRight:"10px"}} onClick={onClickModifyBtn}>수정</button>
                <br/><br/>
                <table className="table table-bordered table-hover">
                <StyledThead>
                    <tr>
                        <th style={{width:"2%", textAlign:"center"}}>
                            <input type={"checkbox"} id={'checkAll'} onChange={(e) => allCheck(e.target.checked)} checked={checkedList.length === users.slice(offset, offset + cntPerPage).length && checkedList.length !== 0 ? true : false}/>
                        </th>
                        <th style={{width:"10%"}}>이름</th>
                        <th style={{width:"17%"}}>아이디</th>
                        <th style={{width:"18%"}}>부서</th>
                        <th style={{width:"12%"}}>직급</th>
                        <th style={{width:"12%"}}>직책</th>
                        <th style={{width:"15%"}}>상태</th>
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
                            users.slice(offset, offset + cntPerPage).map((user, index) => (
                                <tr key={index}>
                                    <td style={{textAlign:"center"}}>
                                        <input type={"checkbox"} name={'checked'+index} id={user.userId} onChange={(e)=> {checkedInputs(e.target.checked, e.target.id)}} checked={checkedList.includes(user.userId) ? true : false}/>
                                    </td>
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
                <PageSelect 
                    type="number"
                    value={cntPerPage}
                    onChange={onChangePageCnt}>
                    <option value={"5"}>5개씩 보기</option>
                    <option value={"10"}>10개씩 보기</option>
                    <option value={"15"}>15개씩 보기</option>
                    <option value={"20"}>20개씩 보기</option>
                </PageSelect>
                <Pagination 
                    total={users.length}
                    cntPerPage={cntPerPage}
                    nowPage={nowPage}
                    setNowPage={setNowPage}
                    allCheck={allCheck}
                />
            </ComponentCard>
        </div>
    );
};

export default UserList;