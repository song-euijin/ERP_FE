import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledForm = styled.form`
  background-color: white;
  padding: 50px;
  border: 1px solid #dddddd;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
`;

const StyledTable = styled.table`
  border-collapse: separate;
  border-spacing: 5px 20px;
  table-layout: fixed;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
`;

const CCodeReg = () => {
  //회사 직급, 직책 등 정보 불러오기 start
  const [ucode, setUCode] = useState([
    {
      upper_COMMON_CODE: "",
    },
  ]);

  useEffect(() => {
    axios.get("http://192.168.0.17:5001/CMN/CodeList.do").then((response) => {
      setUCode(response.data);
    });
  }, []);
  //회사 직급, 직책 등 정보 불러오기 end

  //사용자 정보 세팅 start
  const [codeInfo, setCodeInfo] = useState({
    upper_COMMON_CODE: "",
    common_CODE: "",
    code_NAME: "",
    code_DESCRIPTION: "",
  });

  useEffect(() => {
    setCodeInfo(codeInfo);
    console.log(codeInfo, "info");
  }, [codeInfo]);

  const onChangeInfo = (e) => {
    console.log("value: ", e.target.value, "name: ", e.target.name);
    let name = e.target.name,
      value = e.target.value;
    if (name === "upper_COMMON_CODE") {
      codeInfo.upper_COMMON_CODE = value;
    } else if (name === "common_CODE") {
      codeInfo.common_CODE = value;
    } else if (name === "code_NAME") {
      codeInfo.code_NAME = value;
    }
  };

  return (
    <div>
      <StyledTable id="userInfoTable">
        <tbody>
          <tr>
            <td>상위코드</td>
            <td>
              <select
                id="landLineNumF"
                className="form-select"
                style={{
                  marginRight: "10px",
                  float: "left",
                  width: "100px",
                }}
              >
                <option defaultChecked>02</option>
                {ucode.length < 1 ? (
                  // eslint-disable-next-line jsx-a11y/heading-has-content
                  <option>없음</option>
                ) : (
                  // eslint-disable-next-line jsx-a11y/heading-has-content
                  ucode.map((code, index) => (
                    <option>{code.upper_COMMON_CODE}</option>
                  ))
                )}{" "}
              </select>
            </td>
          </tr>
          <tr>
            <td>공통 코드</td>
            <td>
              <input
                type="text"
                className="form-control"
                id="common_CODE"
                name="common_CODE"
                onChange={onChangeInfo}
              />
            </td>
          </tr>
          <tr>
            <td>공통 코드명</td>
            <td>
              <input
                type="text"
                className="form-control"
                id="code_NAME"
                name="code_NAME"
                onChange={onChangeInfo}
              />
            </td>
          </tr>
          <tr>
            <td>공통 코드 설명</td>
            <td>
              <textarea
                type="text"
                className="form-control"
                id="code_DESCRIPTION"
                name="code_DESCRIPTION"
                onChange={onChangeInfo}
              />
            </td>
          </tr>
        </tbody>
      </StyledTable>
      <br />
      <br />
      <br />
      <div>
        <button
          type="button"
          className="btn btn btn-primary"
          id="userRegBtn"
          style={{ marginLeft: "40%", float: "left" }}
        >
          등록
        </button>
        <Link to={"/Admin/UserList"}>
          <button
            type="button"
            className="btn btn btn-secondary"
            id="cancle"
            style={{ marginLeft: "20px", float: "left" }}
          >
            취소
          </button>
        </Link>
      </div>
      <br />
    </div>
  );
};

export default CCodeReg;
