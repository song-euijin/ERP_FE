import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { postcodeScriptUrl } from "react-daum-postcode/lib/loadPostcode";

const StyledForm = styled.form`
  background-color: white;
  padding: 50px;
  border: 1px solid #dddddd;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0,0,0,.25);
`;

const StyledTable = styled.table`
  border-collapse: separate;
  border-spacing: 5px 20px;
  table-layout: fixed;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
`;

const UserReg = () => {

    //회사 직급, 직책 등 정보 불러오기 start
    const [dept, setDept] = useState([{
        commonCode: '',
        codeName: ''
    }])

    const [rank, setRank] = useState([{
        commonCode: '',
        codeName: ''
    }])

    const [position, setPosition] = useState([{
        commonCode: '',
        codeName: ''
    }])

    const [authority, setAuthority] = useState([{
        commonCode: '',
        codeName: ''
    }])

    const [companyInfo, setCompanyInfo] = useState([{
        companyCode: '',
        companyName: '',
        companyDomain: ''
    }])
    
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
        axios.get("http://localhost:8080/CMN/companyInfo.do")
          .then((response) => {
            setCompanyInfo(response.data);
          })
      }, []);
      //회사 직급, 직책 등 정보 불러오기 end

      //사용자 정보 세팅 start
      const [userInfo, setUserInfo] = useState({
        userFirstName: '',
        userLastName: '',
        userId: '',
        userPw: '',
        userPwCheck: '',
        userPhone: '',
        userLandLineNumber: '',
        userEmail: '',
        userZipCode: '',
        userAddr: '',
        userAddrDetail: '',
        userDept: '',
        userRank: '',
        userPosition: '',
        userAuthority: ''
    });

    const [selectPhone, setSelectPhone] = useState("010");
    const selectPhoneChange =(e)=>{
        console.log(e.target.value);
        setSelectPhone(e.target.value);
    }

    const [selectLandLineNum, setSelectLandLineNum] = useState("02");
    const selectLandLineNumChange =(e)=>{
        console.log(e.target.value);
        setSelectLandLineNum(e.target.value);
    } 
    
    const userInfoChange =(e)=>{
        const {name, value} = e.target;
    
        if(name === 'userPhone'){
    
          let phoneVal = selectPhone.concat(value);
          const nextInputs = { ...userInfo, [name]: phoneVal, };
          setUserInfo(nextInputs);
    
        }else if(name === 'userLandLineNumber'){
    
          let landLineNumVal = selectLandLineNum.concat(value);
          const nextInputs = { ...userInfo, [name]: landLineNumVal, };
          setUserInfo(nextInputs);
        
        }else if(name === 'userId'){
    
            let userIdVal = value.concat('@',companyInfo.map(cp=>(cp.companyDomain)));
            const nextInputs = { ...userInfo, [name]: userIdVal, };
            setUserInfo(nextInputs);
      
        }else{
          const nextInputs = { ...userInfo, [name]: value, };
          setUserInfo(nextInputs);
        }
        
      }

      useEffect(() => {
        setUserInfo(userInfo);
        console.log(userInfo, 'info')
      }, [userInfo])
    
      const params = new URLSearchParams();
      params.append("userFirstName", userInfo.userFirstName);
      params.append("userMiddleName", userInfo.userMiddleName);
      params.append("userId", userInfo.userId);
      params.append("userPw", userInfo.userPw);
      params.append("userPhone", userInfo.userPhone);
      params.append("userHomePhone", userInfo.userHomePhone);
      params.append("userEmail", userInfo.userEmail);
      params.append("userZipCode", userInfo.userZipCode);
      params.append("userAddr", userInfo.userAddr);
      params.append("userAddrDetail", userInfo.userAddrDetail);
      params.append("userDept", userInfo.userDept);
      params.append("userRank", userInfo.userRank);
      params.append("userPosition", userInfo.userPosition);
      // 사용자 등록 정보 세팅 End

    // 우편번호(주소) 검색 이벤트 Start
    const open = useDaumPostcodePopup(postcodeScriptUrl);
    const handleComplete = (e) => {
        let zipCode = e.zonecode;
        let fullAddress = e.address;
        let extraAddress = '';


        if (e.addressType === 'R') {
        if (e.bname !== '') {
            extraAddress += e.bname;
        }
        if (e.buildingName !== '') {
            extraAddress += extraAddress !== '' ? `, ${e.buildingName}` : e.buildingName;
        }
        fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
        }

        setUserInfo({...userInfo, "userZipCode": zipCode, "userAddr": fullAddress})
        
    };

    const handleClick = () => {
        open({ onComplete: handleComplete });
    };
    // 우편번호(주소) 검색 이벤트 End

    // 유효성 검사 Start

    // 이름
    const [isNameValid, setIsNameValid] = useState(false);

    const nameVaild =(e)=>{
        let name = e.target.name;
        let val = e.target.value;
        console.log(name, val);

        const nameCheck = /([^가-힣\x20])/i;
        if(nameCheck.test(val)){
        setIsNameValid(true);
        }else{
        setIsNameValid(false);
        }
    }

    // 아이디
    const [isIdValid, setIsIdValid] = useState(false);

    const idVaild =(e)=>{
        let name = e.target.name;
        let val = e.target.value;
        console.log(name, val);

        if(e.key.match(/[^0-9]/g)){
        e.target.value =  e.target.value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/gi, '');
        }

        const idCheck =	/^[A-Za-z0-9]{6,12}$/;
        if(idCheck.test(val)){
        setIdCheckPass(false);
        setIdCheckFail(false);
        setIsIdValid(false);
        setIdDuplCheck(true);
            
        }else{
        setIdCheckPass(false);
        setIdCheckFail(false);
        setIdDuplCheck(false);
        setIsIdValid(true);
        }

        if(val === ''){
        setIdCheckPass(false);
        setIdCheckFail(false);
        setIsIdValid(false);
        setIdDuplCheck(false);
        }
    }

    // 아이디 중복확인
    const [idDuplCheck, setIdDuplCheck] = useState(false);
    const [idCheckFail, setIdCheckFail] = useState(false);
    const [idCheckPass, setIdCheckPass] = useState(false)

    const onClickIdCheck =()=> {
        axios.post("http://localhost:8080/CMN/idDupleCheck.do?userId="+userInfo.userId)
        .then((response) => {
        console.log(response.data);
        if(idDuplCheck === true){
            if(response.data > 0){
            setIsIdValid(false);
            setIdDuplCheck(false);
            setIdCheckPass(false);
            setIdCheckFail(true);
            }else{
            setIsIdValid(false);
            setIdDuplCheck(false);
            setIdCheckFail(false);
            setIdCheckPass(true);
            }
        }else{
            alert('아이디 유효성 검사 후 중복검사를 진행하세요.')
        }
        })
        .catch((error) => {
        alert('실패ㅠㅠㅠ');
        })
    }

    return (
        <div>
            <div className="col-lg-12" style={{width:"850px"}}>
                <div className="card">
                    <h6 className="border-bottom p-3 mb-0 card-title"><i className="bi bi-card-text me-2"> </i>사원 등록!!!!!!!</h6>
                    <div className="card-body">
                    <StyledForm id="userRegForm" style={{width:"800px"}}>
                        <StyledTable id="userInfoTable">
                            <tbody>
                                <tr>
                                    <td>사용자 성</td>
                                    <td><input type="text" className="form-control" id="userFirstName" name="userFirstName" onChange={userInfoChange} onKeyUp={nameVaild}/></td>
                                    <td>사용자 이름</td>
                                    <td><input type="text" className="form-control" id="userLastName" name="userLastName" onChange={userInfoChange} onKeyUp={nameVaild}/></td>
                                </tr>
                                {isNameValid && <tr><td></td><td className="invalid-input" colSpan={5} style={{color:"red", textAlign:"center"}}>유효한 한글값을 입력하세요.</td></tr>}
                                <tr>
                                    <td>아이디</td>
                                    {companyInfo.map((info, index)=>(
                                         <td key={index} colSpan={4}>
                                            <input type="text" className="form-control" id="userId" name="userId" style={{width:"200px", float:"left"}} onChange={userInfoChange} onKeyUp={idVaild}/>
                                            <span style={{float:"left", margin:"10px", height:"10px"}}>@</span>
                                            <input type="text" className="form-control" id="cpDomain" name="cpDomain" style={{width:"200px", float:"left", backgroundColor: "lightgrey"}} defaultValue={info.companyDomain} readOnly/>
                                            <button type="button" className="btn btn btn-primary" style={{width:'126px'}} onClick={onClickIdCheck}>중복 확인</button>
                                     </td> 
                                    ))}   
                                    
                                </tr>
                                {isIdValid && <tr><td></td><td className="invalid-input" colSpan={3} style={{color:"red", textAlign:"left"}}>6~12자 사이의 영문,숫자 값을 입력하세요.</td></tr>}
                                {idDuplCheck && <tr><td></td><td className="invalid-input" colSpan={3} style={{color:"red", textAlign:"left"}}>아이디 중복확인을 진행해주세요.</td></tr>}
                                {idCheckFail && <tr><td></td><td className="invalid-input" colSpan={3} style={{color:"red", textAlign:"left"}}>아이디가 존재합니다. 다른아이디를 사용하세요.</td></tr>}
                                {idCheckPass && <tr><td></td><td className="invalid-input" colSpan={3} style={{color:"green", textAlign:"left"}}>사용가능한 아이디입니다.</td></tr>}
                                <tr>
                                    <td>비밀번호</td>
                                    <td><input type="password" className="form-control" id="userPw" name="userPw" autoComplete="off" onChange={userInfoChange}/></td>
                                    <td>비밀번호 확인</td>
                                    <td><input type="password" className="form-control" id="userPwCheck" name="userPwCheck" autoComplete="off" onChange={userInfoChange}/></td>  
                                </tr>
                                <tr>
                                    <td>연락처</td>
                                    <td colSpan={2}>
                                        <select id="phoneF" className="form-select" style={{marginRight:"10px", float:"left", width:"100px"}} onChange={selectPhoneChange}>
                                            <option defaultChecked>010</option>
                                            <option>011</option>
                                            <option>016</option>
                                            <option>017</option>
                                            <option>018</option>
                                            <option>019</option>
                                        </select>
                                        <input type="text" className="form-control" id="userPhone" name="userPhone" style={{width:"200px", float:"left"}} maxLength="8" onChange={userInfoChange}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>내선번호</td>
                                    <td colSpan={2}>
                                        <select id="landLineNumF" className="form-select" style={{marginRight:"10px", float:"left", width:"100px"}} onChange={selectLandLineNumChange}>
                                            <option defaultChecked>02</option>
                                            <option>031</option>
                                            <option>032</option>
                                            <option>042</option>
                                            <option>044</option>
                                            <option>051</option>
                                            <option>052</option>
                                            <option>062</option>
                                            <option>063</option>
                                            <option>064</option>
                                        </select>
                                        <input type="text" className="form-control" id="userLandLineNumber" name="userLandLineNumber" style={{width:"200px", float:"left"}} maxLength="8" onChange={userInfoChange}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>자택 주소</td>
                                    <td><input type="text" style={{backgroundColor: "lightgrey"}} className="form-control" id="userZipCode" name="userZipCode"  value={userInfo.userZipCode||''} readOnly/></td>
                                    <td>
                                        <button type="button" className="btn btn btn-primary" onClick={handleClick}>우편번호 검색</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td><input type="hidden"/></td>
                                    <td colSpan={3}><input type="text" style={{backgroundColor: "lightgrey"}} className="form-control" id="userAddr" name="userAddr" value={userInfo.userAddr||''} readOnly/></td>
                                </tr>
                                <tr>
                                    <td><input type="hidden"/></td>
                                    <td colSpan={3}><input type="text" className="form-control" id="userAddrDetail" name="userAddrDetail" onChange={userInfoChange}/></td>
                                </tr>
                                <tr>
                                    <td>소속 부서</td>
                                    <td>
                                        <select style={{width:'200px'}} className="form-select" id="userDept" name="userDept">
                                            <option value={"default"} hidden>: : : 부서 선택 : : :</option>
                                            {dept.map((d, index) => (
                                                <option key={index} value={d.commonCode}>{d.codeName}</option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>직급</td>
                                    <td>
                                        <select style={{width:'200px'}} className="form-select" id="userRank" name="userRank">
                                            <option value={"default"} hidden>: : : 직급 선택 : : :</option>
                                            {rank.map((r, index) => (
                                                <option key={index} value={r.commonCode}>{r.codeName}</option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>직책</td>
                                    <td>
                                        <select style={{width:'200px'}} className="form-select" id="userPosition" name="userPosition">
                                            <option value={"default"} hidden>: : : 직책 선택 : : :</option>
                                            {position.map((p, index) => (
                                                <option key={index} value={p.commonCode}>{p.codeName}</option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>권한</td>
                                    <td>
                                        <select style={{width:'200px'}} className="form-select" id="userAuthority" name="userAuthority">
                                        <option value={"default"} hidden>: : : 권한 선택 : : :</option>
                                        {authority.map((a, index) => (
                                                <option key={index} value={a.commonCode}>{a.codeName}</option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                            </tbody>
                        </StyledTable><br/><br/><br/>
                        <div>
                            <button type="button" className="btn btn btn-primary" id="userRegBtn" style={{marginLeft:"40%", float:"left"}}>등록</button>
                            <Link to={'/Admin/UserList'}>
                                <button type="button" className="btn btn btn-secondary" id="cancle" style={{marginLeft:"20px", float:"left"}}>취소</button>
                            </Link>
                        </div><br/>
                    </StyledForm>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserReg;