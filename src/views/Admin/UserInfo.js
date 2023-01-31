import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import userImg from '../../assets/images/users/user2.jpg';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ComponentCard from '../../components/ComponentCard';

const StyledTd = styled.td`
    width: 30%; 
    text-align: center;
    color: white;
`;

const UserInfo = (args) => {
    
    //target 정보 가져오기 start
    const getParams = new URLSearchParams(window.location.search);
    let getUserId = getParams.get("userId");

    const [user, setUser] = useState([{
        userName: '',
        userId: '',
        userDept: '',
        userRank: '',
        userPosition: '',
        userAuthority: '',
        userStatus: '',
        userPhone: '',
        userLandLineNumber: '',
        userAddr: '',
        userAddrDetail: ''
      }]);

    useEffect(() => {
      console.log(getUserId);
      axios.get("http://localhost:8080/CMN/userInfo.do?userId="+ getUserId)
      .then((response) => {
        setUser(response.data);
        console.log(response.data, 'veiw정보');
        })
    }, [getUserId])
    //target 정보 가져오기 end

    //회사 직급, 직책 등 정보 불러오기 start
    const [dept, setDept] = useState([{
        commonCode: '',
        codeName: ''
    }]);

    const [rank, setRank] = useState([{
        commonCode: '',
        codeName: ''
    }]);

    const [position, setPosition] = useState([{
        commonCode: '',
        codeName: ''
    }]);

    const [authority, setAuthority] = useState([{
        commonCode: '',
        codeName: ''
    }]);

    const [status, setStatus] = useState([{
        commonCode: '',
        codeName: ''
    }]);
    
    useEffect(() => {
        axios.get("http://localhost:8080/CMN/deptList.do")
          .then((response) => {
            setDept(response.data);
          })
      }, []);

      useEffect(() => {
        axios.get("http://localhost:8080/CMN/rankList.do")
          .then((response) => {
            setRank(response.data);
          })
      }, []);

      useEffect(() => {
        axios.get("http://localhost:8080/CMN/positionList.do")
          .then((response) => {
            setPosition(response.data);
          })
      }, []);

      useEffect(() => {
        axios.get("http://localhost:8080/CMN/authorityList.do")
          .then((response) => {
            setAuthority(response.data);
          })
      }, []);

      useEffect(() => {
        axios.get("http://localhost:8080/CMN/statusList.do")
          .then((response) => {
            setStatus(response.data);
          })
      }, []);
      //회사 직급, 직책 등 정보 불러오기 end

    //modal창 start
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);
    //modal창 end

    //수정 start
    const [targetCode, setTargetCode] = useState([{
        userDept: '',
        userRank: '',
        userPosition: '',
        userAuthority: '',
        userStatus: ''
    }]);

    useEffect(() => {
        axios.get("http://localhost:8080/CMN/targetCodeInfo.do?userId="+ getUserId)
        .then((response) => {
            setTargetCode(response.data);
        })
    }, []);  
    
    const [modifyDept, setModifyDept] = useState('')
    const [modifyRank, setModifyRank] = useState('')
    const [modifyPosition, setModifyPosition] = useState('')
    const [modifyAuthority, setModifyAuthority] = useState('')
    const [modifyStatus, setModifyStatus] = useState('')

    const modifyBtn =()=> {
        setModifyDept(targetCode.map(code=>(code.userDept)));
        setModifyRank(targetCode.map(code=>(code.userRank)));
        setModifyPosition(targetCode.map(code=>(code.userPosition)));
        setModifyAuthority(targetCode.map(code=>(code.userAuthority)));
        setModifyStatus(targetCode.map(code=>(code.userStatus)));
        toggle();
    }





    const onChangeInfo =(e)=>{
        console.log('value: ', e.target.value, 'name: ', e.target.name);
        let name = e.target.name,
            value = e.target.value;
        if(name === 'userDept'){
            setModifyDept(value);
        }else if(name === 'userRank'){
            setModifyRank(value);
        }else if(name === 'userPosition'){
            setModifyPosition(value);
        }else if(name === 'userAuthority'){
            setModifyAuthority(value);
        }else if(name === 'userStatus'){
            setModifyStatus(value);
            console.log(modifyStatus, 'S');
        }
    }

    useEffect(() => {
        setModifyDept(modifyDept);
        console.log(modifyDept, 'R');
    }, [modifyDept]);

    useEffect(() => {
        setModifyRank(modifyRank);
        console.log(modifyRank, 'R');
    }, [modifyRank]);

    useEffect(() => {
        setModifyPosition(modifyPosition);
        console.log(modifyPosition, 'P');
    }, [modifyPosition]);

    useEffect(() => {
        setModifyAuthority(modifyAuthority);
        console.log(modifyAuthority, 'A');
    }, [modifyAuthority]);

    useEffect(() => {
        setModifyStatus(modifyStatus);
        console.log(modifyStatus, 'S');
    }, [modifyStatus]);

    // 사용자 수정 정보 세팅 start
    const params = new URLSearchParams();
    params.append("userId", getUserId);
    params.append("userDept", modifyDept);
    params.append("userRank", modifyRank);
    params.append("userPosition", modifyPosition);
    params.append("userAuthority", modifyAuthority);
    params.append("userStatus", modifyStatus);
    // 사용자 수정 정보 세팅 End

    const onClickModify =()=>{
        console.log('부서>',modifyDept,'직급>',modifyRank,'직책>',modifyPosition,'권한>',modifyAuthority,'상태>',modifyStatus );
        axios.post("http://localhost:8080/CMN/userModify.do", params)
        .then(function() {
            alert('사용자 수정이 정상적으로 처리되었습니다!!!.');
            toggle();
            window.location.replace('/Admin/UserInfo?userId='+getUserId);
          })
          .catch((error) => {
            console.log(error);
          })
    }
    

return (
        <div>
            <ComponentCard title={'사용자 정보'} >
                <div style={{display:"block", height:"50px"}}>
                    <Link to={'/Admin/UserList'}>
                        <button type="button" className="btn btn btn-secondary" id="back" style={{float:"right", marginBottom:"10px", marginLeft:"10px"}}>뒤로</button>
                    </Link>
                    <button type="button" className="btn btn btn-primary" id="modifyBtn" style={{float:"right", marginBottom:"10px"}} onClick={modifyBtn}>수정</button>
                </div>
                <Modal isOpen={modal} toggle={toggle} {...args}>
                    <ModalHeader toggle={toggle} tag="h6">사용자 정보 수정</ModalHeader>
                    <ModalBody>
                        {user.map((info, index)=> (
                            <table key={index} style={{borderSpacing: '5px 10px', borderCollapse:'separate'}}>
                                <tbody>
                                    <tr>
                                        <td>아이디</td>
                                        <td><input type="text" className="form-control" id="userId" name="userId" style={{width:"200px", float:"left", backgroundColor: "lightgrey"}} value={info.userId} readOnly/></td>
                                    </tr>
                                    <tr>
                                        <td>소속 부서</td>
                                        <td>
                                            <select style={{width:'200px'}} className="form-select" id="userDept" name="userDept" onChange={onChangeInfo}>
                                                {dept.map((d, index) => (
                                                    <option key={index} value={d.commonCode} selected={info.userDept === d.codeName}>{d.codeName}</option>
                                                ))}
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>직급</td>
                                        <td>
                                            <select style={{width:'200px'}} className="form-select" id="userRank" name="userRank" onChange={onChangeInfo}>
                                                {rank.map((r, index) => (
                                                    <option key={index} value={r.commonCode} selected={info.userRank === r.codeName}>{r.codeName}</option>
                                                ))}
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>직책</td>
                                        <td>
                                            <select style={{width:'200px'}} className="form-select" id="userPosition" name="userPosition" onChange={onChangeInfo}>
                                                {position.map((p, index) => (
                                                    <option key={index} value={p.commonCode} selected={info.userPosition === p.codeName}>{p.codeName}</option>
                                                ))}
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>권한</td>
                                        <td>
                                            <select style={{width:'200px'}} className="form-select" id="userAuthority" name="userAuthority" onChange={onChangeInfo}>
                                            {authority.map((a, index) => (
                                                    <option key={index} value={a.commonCode} selected={info.userAuthority === a.codeName}>{a.codeName}</option>
                                                ))}
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>상태</td>
                                        <td>
                                            <select style={{width:'200px'}} className="form-select" id="userStatus" name="userStatus" onChange={onChangeInfo}>
                                            {status.map((s, index) => (
                                                    <option key={index} value={s.commonCode} selected={info.userStatus === s.codeName}>{s.codeName}</option>
                                                ))}
                                            </select>
                                        </td>
                                    </tr>
                                </tbody>
                                
                            </table>
                        ))}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={onClickModify}>
                            수정
                        </Button>{' '}
                        <Button color="secondary" onClick={toggle}>
                            취소
                        </Button>
                    </ModalFooter>
                </Modal>
                <img alt='user1' src={userImg} style={{width:"25%", height:"80%", marginLeft:"2%"}} />          
                <table className="table table-bordered table-hover" style={{width:"70%", height:"80%", float:"right"}}>
                    {user.map((info, index) => (
                        <tbody key={index}>  
                        <tr>
                            <StyledTd style={{backgroundColor:"#2962ff"}}>이름</StyledTd>
                            <td style={{width:"70%"}}>{info.userName}</td>
                        </tr>
                        <tr>
                            <StyledTd style={{backgroundColor:"#2962ff"}}>아이디</StyledTd>
                            <td style={{width:"70%"}}>{info.userId}</td>
                        </tr>
                        <tr>
                            <StyledTd style={{backgroundColor:"#2962ff"}}>부서</StyledTd>
                            <td style={{width:"70%"}}>{info.userDept}</td>
                        </tr>
                        <tr>
                            <StyledTd style={{backgroundColor:"#2962ff"}}>직급</StyledTd>
                            <td style={{width:"70%"}}>{info.userRank}</td>
                        </tr>
                        <tr>
                            <StyledTd style={{backgroundColor:"#2962ff"}}>직책</StyledTd>
                            <td style={{width:"70%"}}>{info.userPosition}</td>
                        </tr>
                        <tr>
                            <StyledTd style={{backgroundColor:"#2962ff"}}>권한</StyledTd>
                            <td style={{width:"70%"}}>{info.userAuthority}</td>
                        </tr>
                        <tr>
                            <StyledTd style={{backgroundColor:"#2962ff"}}>상태</StyledTd>
                            <td style={{width:"70%"}}>{info.userStatus}</td>
                        </tr>
                        <tr>
                            <StyledTd style={{backgroundColor:"#2962ff"}}>연락처</StyledTd>
                            <td style={{width:"70%"}}>{info.userPhone}</td>
                        </tr>
                        <tr>
                            <StyledTd style={{backgroundColor:"#2962ff"}}>내선번호</StyledTd>
                            <td style={{width:"70%"}}>{info.userLandLineNumber}</td>
                        </tr>
                        <tr>
                            <StyledTd style={{backgroundColor:"#2962ff"}}>주소</StyledTd>
                            <td style={{width:"70%"}}>{info.userAddr} {info.userAddrDetail}</td>
                        </tr>
                    </tbody>
                    ))}
                </table>      
            </ComponentCard>      
        </div>
    );
};

export default UserInfo;