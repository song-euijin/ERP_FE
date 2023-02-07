import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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
        userImg: '',
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

    // 저장된 사진이 없을경우 기본사진 대체  
    const defaultImg = 'default_profile.jpg';

    const [phoneNum, setPhoneNum] = useState('');
    const [landLineNum, setLandLineNum] = useState('')

    useEffect(() => {
        setPhoneNum(user.map((u)=>u.userPhone.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`)));
        setLandLineNum(user.map((u)=>u.userLandLineNumber.substring(0,2) === '02'
                                    ? u.userLandLineNumber.replace(/^(\d{1,2})(\d{3,4})(\d{4})$/, `$1-$2-$3`)
                                    : u.userLandLineNumber.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`)));
        console.log(phoneNum);
        console.log(landLineNum);
    }, [user])
      

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
    }, [getUserId]);  
    
    const [modifyDept, setModifyDept] = useState('')
    const [modifyRank, setModifyRank] = useState('')
    const [modifyPosition, setModifyPosition] = useState('')
    const [modifyAuthority, setModifyAuthority] = useState('')
    const [modifyStatus, setModifyStatus] = useState('')
    const [modifyImg, setModifyImg] = useState('')

    const modifyBtn =()=> {
        setModifyDept(targetCode.map(code=>(code.userDept)));
        setModifyRank(targetCode.map(code=>(code.userRank)));
        setModifyPosition(targetCode.map(code=>(code.userPosition)));
        setModifyAuthority(targetCode.map(code=>(code.userAuthority)));
        setModifyStatus(targetCode.map(code=>(code.userStatus)));
        setModifyImg(user.map(u=>(u.userImg || defaultImg)));
        toggle();
    }

    const onChangeInfo =(e)=>{
        const {name, value} = e.target;

        if(name === 'userDept'){
            setModifyDept(value);
        }if(name === 'userImg'){
            let userImgVal = e.target.files[0].name;
            setModifyImg(userImgVal);
        }
        else if(name === 'userRank'){
            setModifyRank(value);
        }else if(name === 'userPosition'){
            setModifyPosition(value);
        }else if(name === 'userAuthority'){
            setModifyAuthority(value);
        }else if(name === 'userStatus'){
            setModifyStatus(value);
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

    useEffect(() => {
        setModifyImg(modifyImg);
        console.log(modifyImg, 'I');
    }, [modifyImg]);

    // 사용자 수정 정보 세팅 start
    const params = new URLSearchParams();
    params.append("userId", getUserId);
    params.append("userImg", modifyImg);
    params.append("userDept", modifyDept);
    params.append("userRank", modifyRank);
    params.append("userPosition", modifyPosition);
    params.append("userAuthority", modifyAuthority);
    params.append("userStatus", modifyStatus);
    // 사용자 수정 정보 세팅 End

    const onClickModify =()=>{
        console.log('부서>',modifyDept,'직급>',modifyRank,'직책>',modifyPosition,'권한>',modifyAuthority,'상태>',modifyStatus,'사진>',modifyImg);
        axios.post("http://localhost:8080/CMN/userModify.do", params)
        .then(function() {
            alert('사용자 수정이 정상적으로 처리되었습니다!!!!!!.');
            toggle();
            window.location.replace('/Admin/UserManage/UserInfo?userId='+getUserId);
          })
          .catch((error) => {
            console.log(error);
          })
    }

return (
        <div>
            <ComponentCard title={'사용자 정보'} >
                <div style={{display:"block", height:"50px"}}>
                    <Link to={'/Admin/UserManage/UserList'}>
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
                                        <td>프로필 사진</td>
                                        <td colSpan={3}>
                                            <tr>
                                                <img alt='user1' src={require(`../../assets/images/users/${modifyImg || defaultImg}`)} style={{width:"200px"}} /> 
                                                <input type="file" className="form-control" id="userImg" name="userImg" style={{width:"200px"}} onChange={onChangeInfo}/>
                                            </tr>
                                        </td>
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
                <div style={{display: "flex", justifyContent: "center"}}>   
                    {user.map((info, index) => (
                        <div style={{width: "100%", display:"flex", alignItems: "center", flexDirection: "column"}}> 
                            <img alt='user1' src={require(`../../assets/images/users/${info.userImg || defaultImg}`)} style={{width:"300px"}} /> 
                            <table className="table table-bordered table-hover" style={{marginTop:"50px", width: "80%"}}>
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
                                        <td style={{width:"70%"}}>{phoneNum}</td>
                                    </tr>
                                    <tr>
                                        <StyledTd style={{backgroundColor:"#2962ff"}}>내선번호</StyledTd>
                                        <td style={{width:"70%"}}>{landLineNum}</td>
                                    </tr>
                                    <tr>
                                        <StyledTd style={{backgroundColor:"#2962ff"}}>주소</StyledTd>
                                        <td style={{width:"70%"}}>{info.userAddr}, {info.userAddrDetail}</td>
                                    </tr>
                                </tbody>
                            </table> 
                        </div>     
                    ))}
                </div>
            </ComponentCard>      
        </div>
    );
};

export default UserInfo;