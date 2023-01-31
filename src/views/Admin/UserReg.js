import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { postcodeScriptUrl } from "react-daum-postcode/lib/loadPostcode";
import ComponentCard from '../../components/ComponentCard';

const StyledForm = styled.form`
  background-color: white;
  padding: 50px;
  border-radius: 10px;
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

        const idCheck =	/^[A-Za-z0-9]{5,15}$/;
        if(idCheck.test(val)){
            setIdCheckPass(false);
            setIdCheckFail(false);
            setIsIdValid(false);
            setIdDuplCheck(true);
            
        } else {
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
            } else {
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

    // 비밀번호
    const [isPwValid, setIsPwValid] = useState(false);

    const pwVaild =(e)=>{
        let name = e.target.name;
        let val = e.target.value;
        console.log(name, val);

        const pwCheck =	/^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
        const againCheck = /(\w)\1\1\1/;
        let ascSeqCharCnt = 0; // 오름차순 연속 문자 카운트
            let descSeqCharCnt = 0; // 내림차순 연속 문자 카운트  
            let char_0;
            let char_1;
            let char_2; 
            let diff_0_1;
            let diff_1_2;

        for(var i = 0; i < val.length; i++){
        // charAt(): 문자값 반환
        char_0 = val.charAt(i);
        char_1 = val.charAt(i+1);
        char_2 = val.charAt(i+2);
            
        // charCodeAt(): 유니코드값 반환
        diff_0_1 = char_0.charCodeAt(0) - char_1.charCodeAt(0);
        diff_1_2 = char_1.charCodeAt(0) - char_2.charCodeAt(0);
        
        if(diff_0_1 === 1 && diff_1_2 === 1){
            ascSeqCharCnt += 1;
        }
        
        if(diff_0_1 === -1 && diff_1_2 === -1){
            descSeqCharCnt += 1;
        }
        }

        if(userInfo.userPwCheck === ''){
        if(pwCheck.test(val) || val === ''){
            setIsPwValid(false);
        } else {
            setIsPwValid(true);
        }
    
        if(isPwValid === false){
            if(againCheck.test(val)){
             setIsPwValid(true);
            }
    
            if(ascSeqCharCnt > 1 || descSeqCharCnt > 1){
                setIsPwValid(true);
            }
        }
        } else if(userInfo.userPwCheck !== '') {
            if(pwCheck.test(userInfo.userPw)){
                setIsPwValid(false);
            } else {
                setIsPwValid(true);
                setIsPwChkValid(false);
            }

            if(againCheck.test(val)){
                setIsPwValid(true);
                setIsPwChkValid(false);
            }
    
            if(ascSeqCharCnt > 1 || descSeqCharCnt > 1){
                setIsPwValid(true);
                setIsPwChkValid(false);
            }
        }     
    }

    // 비밀번호 확인
    const [isPwChkValid, setIsPwChkValid] = useState(false);
    const [isPwChkPass, setIsPwChkPass] = useState(false);

    useEffect(() => {
        if(userInfo.userPw !== '' && userInfo.userPwCheck !== ''){
            if(isPwValid === false){
            if(userInfo.userPw === userInfo.userPwCheck){
                setIsPwChkPass(true);
                setIsPwChkValid(false);
            } else {
                setIsPwChkPass(false);
                setIsPwChkValid(true);
            }
            } else {
                setIsPwChkPass(false);
                setIsPwChkValid(false);
            }

        }
    }, [userInfo.userPw, userInfo.userPwCheck])

    // 연락처
    const [isPhoneValid, setIsPhoneValid] = useState(false);

    const phoneValid =(e)=>{
        let name = e.target.name;
        let val = e.target.value;
        console.log(name, val);

        const phoneCheck = /^\d{3,4}\d{4}$/;
        if(phoneCheck.test(val)){
         setIsPhoneValid(false);
        } else {
         setIsPhoneValid(true);
        }

        if(val === ''){
         setIsPhoneValid(false);
        }
    }

    // 내선번호
    const [isLandLineNumValid, setIsLandLineNumValid] = useState(false);

    const landLineNumValid =(e)=>{
        let name = e.target.name;
        let val = e.target.value;
        console.log(name, val);

        const LandLineNumCheck = /^\d{3,4}\d{4}$/;
        if(LandLineNumCheck.test(val)){
            setIsLandLineNumValid(false);
        }else{
            setIsLandLineNumValid(true);
        }

        if(val === ''){
            setIsLandLineNumValid(false);
        }
    }

    // 유효성 검사 end

    // 사용자 등록 정보 세팅 start
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
      params.append("userLastName", userInfo.userLastName);
      params.append("userId", userInfo.userId);
      params.append("userPw", userInfo.userPw);
      params.append("userPhone", userInfo.userPhone);
      params.append("userLandLineNumber", userInfo.userLandLineNumber);
      params.append("userZipCode", userInfo.userZipCode);
      params.append("userAddr", userInfo.userAddr);
      params.append("userAddrDetail", userInfo.userAddrDetail);
      params.append("userDept", userInfo.userDept);
      params.append("userRank", userInfo.userRank);
      params.append("userPosition", userInfo.userPosition);
      params.append("userAuthority", userInfo.userAuthority);
      // 사용자 등록 정보 세팅 End

    // 사용자 등록 실행 Start
    useEffect(() => {
        console.log(userInfo)
    }, [userInfo]);

    const regUserInfo =(e)=> {
        e.preventDefault();

        // 등록 전 유효성 검사 Start
        if(userInfo.userFirstName === ''){
            alert('사용자 성을 입력하세요.');
            return false;
        }

        if(userInfo.userLastName === ''){
            alert('사용자 이름을 입력하세요.');
            return false;
        }

        if(userInfo.userId === ''){
            alert('사용자 아이디를 입력하세요.');
            return false;
        }

        if(isIdValid === true){
            alert('아이디를 형식에 맞게 작성해주세요.');
            return false;
        }

        if(idCheckPass === false){
            alert('아이디 중복확인을 진행해주세요.');
            setIdDuplCheck(true);
        return false;
        }

        if(userInfo.userPw === ''){
            alert('사용자 암호를 입력하세요.');
            return false;
        }

        if(isPwValid === true){
            alert('암호를 형식에 맞춰 입력하세요.');
            setIsPwValid(true);
        return false;
        }

        if(isPwChkPass === false || userInfo.userPw !== userInfo.userPwCheck){
            alert('암호확인이 일치하지 않습니다.');
            setIsPwChkValid(true);
        return false;
        }

        if(userInfo.userPhone === ''){
            alert('사용자 연락처를 입력하세요.');
            return false;
        }

        if(userInfo.userLandLineNumber === ''){
            alert('사용자 내선 번호를 입력하세요.');
            return false;
        }

        if(isPhoneValid === true || isLandLineNumValid === true){
            alert('연락처를 형식에 맞게 입력하세요.');
            return false;
        }

        if(userInfo.userZipCode === '' || userInfo.userAddrDetail === ''){
            alert('주소를 입력하세요.');
            return false;
        }

        if(userInfo.userDept === 'default' || userInfo.userDept === ''){
            alert('부서를 선택하세요.');
            return false;
        }

        if(userInfo.userRank === 'default' || userInfo.userRank === ''){
            alert('직급을 선택하세요.');
            return false;
        }

        if(userInfo.userPosition === 'default' || userInfo.userPosition === ''){
            alert('직책을 선택하세요.');
            return false;
        }

        if(userInfo.userAuthority === 'default' || userInfo.userAuthority === ''){
            alert('권한을 선택하세요.');
            return false;
        }
        // 등록 전 유효성 검사 End

        axios.post("http://localhost:8080/CMN/userReg.do", params)
        .then(function() {
        alert('사용자 등록이 정상적으로 처리되었습니다.');
        window.location.replace('/Admin/UserList');
        })
        .catch((error) => {
        console.log(error);
        })
    }
    // 사용자 등록 실행 End

    return (
        <div style={{display:'flex', justifyContent:'space-evenly'}}>
            <ComponentCard title={'사용자 등록'}>
                <StyledForm id="userRegForm">
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
                            {isIdValid && <tr><td></td><td className="invalid-input" colSpan={3} style={{color:"red", textAlign:"left"}}>5~15자 사이의 영문,숫자 값을 입력하세요.</td></tr>}
                            {idDuplCheck && <tr><td></td><td className="invalid-input" colSpan={3} style={{color:"red", textAlign:"left"}}>아이디 중복확인을 진행해주세요.</td></tr>}
                            {idCheckFail && <tr><td></td><td className="invalid-input" colSpan={3} style={{color:"red", textAlign:"left"}}>아이디가 존재합니다. 다른아이디를 사용하세요.</td></tr>}
                            {idCheckPass && <tr><td></td><td className="invalid-input" colSpan={3} style={{color:"green", textAlign:"left"}}>사용가능한 아이디입니다.</td></tr>}
                            <tr>
                                <td>비밀번호</td>
                                <td><input type="password" className="form-control" id="userPw" name="userPw" autoComplete="off" onChange={userInfoChange} onKeyUp={pwVaild}/></td>
                                <td>비밀번호 확인</td>
                                <td><input type="password" className="form-control" id="userPwCheck" name="userPwCheck" autoComplete="off" onChange={userInfoChange}/></td>  
                            </tr>
                            {isPwValid && <tr><td></td><td className="invalid-input" colSpan={5} style={{color:"red", textAlign:"left"}}>반복, 연속되지 않은 영문, 숫자, 특문을 포함한 8~15자 값을 입력하세요.</td></tr>}
                            {isPwChkValid && <tr><td></td><td className="invalid-input" colSpan={5} style={{color:"red", textAlign:"left"}}>비밀번호 확인이 다릅니다.</td></tr>}
                            {isPwChkPass && <tr><td></td><td className="invalid-input" colSpan={5} style={{color:"green", textAlign:"left"}}>사용가능한 비밀번호입니다.</td></tr>}
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
                                    <input type="text" className="form-control" id="userPhone" name="userPhone" style={{width:"200px", float:"left"}} maxLength="8" onChange={userInfoChange} onKeyUp={phoneValid}/>
                                </td>
                                {isPhoneValid && <td className="invalid-input" colSpan={2} style={{color:"red", textAlign:"left"}}>-를 제외한 7~8자리 숫자를 입력해주세요.</td>}
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
                                    <input type="text" className="form-control" id="userLandLineNumber" name="userLandLineNumber" style={{width:"200px", float:"left"}} maxLength="8" onChange={userInfoChange} onKeyUp={landLineNumValid}/>
                                </td>
                                {isLandLineNumValid && <td className="invalid-input" colSpan={2} style={{color:"red", textAlign:"left"}}>-를 제외한 7~8자리 숫자를 입력해주세요.</td>}
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
                                    <select style={{width:'200px'}} className="form-select" id="userDept" name="userDept" onChange={userInfoChange}>
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
                                    <select style={{width:'200px'}} className="form-select" id="userRank" name="userRank" onChange={userInfoChange}>
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
                                    <select style={{width:'200px'}} className="form-select" id="userPosition" name="userPosition" onChange={userInfoChange}>
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
                                    <select style={{width:'200px'}} className="form-select" id="userAuthority" name="userAuthority" onChange={userInfoChange}>
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
                        <button type="button" className="btn btn btn-primary" id="userRegBtn" style={{marginLeft:"40%", float:"left"}} onClick={regUserInfo}>등록</button>
                        <Link to={'/Admin/UserList'}>
                            <button type="button" className="btn btn btn-secondary" id="cancle" style={{marginLeft:"20px", float:"left"}}>취소</button>
                        </Link>
                    </div><br/>
                </StyledForm>
            </ComponentCard>           
        </div>
    );
};

export default UserReg;