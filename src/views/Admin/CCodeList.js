import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Input } from "reactstrap";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
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

const CCodeList = () => {
  //사용자 목록
  const [codes, setCodes] = useState([
    {
      upper_COMMON_CODE: "",
      common_CODE: "",
      code_NAME: "",
      code_DESCRIPTION: "",
      code_REG_DATE: "",
      code_MODIFY_DATE: "",
    },
  ]);

  //사용자 목록 axios
  useEffect(() => {
    axios.get("http://192.168.0.17:5001/CMN/CodeList.do").then((response) => {
      setCodes(response.data);
    });
  }, []);

  // searchKey, Value
  const [searchKey, setSearchKey] = useState("common_CODE");
  const [searchValue, setSearchValue] = useState("");

  // searchKey 변경
  const onChangeSearchKey = (e) => {
    let key = e.target.value;
    console.log(key);
    setSearchKey(key);
  };

  // searchValue 변경
  const onChangeSearchValue = (e) => {
    let value = e.target.value;
    console.log(value);
    setSearchValue(value);
  };

  // 검색 axios
  useEffect(() => {
    axios
      .get(
        //       "http://192.168.0.17:5001/CMN/CodeList.do?searchKey=" +
        "http://192.168.0.17:2000/CodeList.do?searchKey=" +
          searchKey +
          "&searchValue=" +
          searchValue
      )
      .then((response) => {
        setCodes(response.data);
      });
    console.log(codes);
  }, [searchKey, searchValue]);

  return (
    <div>
      <div className="col-lg-12">
        <div className="card">
          <h6 className="border-bottom p-3 mb-0 card-title">
            <i className="bi bi-card-text me-2"> </i>공통 코드 목록
          </h6>
          <div className="card-body">
            <Input
              type="select"
              style={{ width: "150px", display: "inline", marginRight: "10px" }}
              onChange={onChangeSearchKey}
            >
              <option value={"upper_COMMON_CODE"}>상위 공통 코드</option>
              <option value={"common_CODE"}>공통 코드</option>
              <option value={"code_NAME"}>공통 코드명</option>
              <option value={"code_DESCRIPTION"}>코드 설명</option>
              <option value={"code_REG_DATE"}>등록 일자</option>
              <option value={"code_MODIFY_DATE"}>수정 일자</option>
            </Input>
            <Input
              type={"text"}
              style={{ width: "500px", display: "inline" }}
              value={searchValue}
              onChange={onChangeSearchValue}
              placeholder={"Search..."}
            ></Input>
            <button
              type={"button"}
              className="btn btn btn-danger"
              style={{ float: "right" }}
            >
              삭제
            </button>
            <Link to={"/Admin/UserModify?userId="}>
              <button
                type={"button"}
                className="btn btn btn-primary"
                style={{ float: "right", marginRight: "10px" }}
              >
                수정
              </button>
            </Link>
            <br />
            <br />
            <table className="table table-bordered table-hover">
              <StyledThead>
                <tr>
                  <th style={{ width: "2%", textAlign: "center" }}>
                    <input type={"checkbox"} />
                  </th>
                  <th style={{ width: "14%" }}>상위 공통 코드</th>
                  <th style={{ width: "14%" }}>공통 코드</th>
                  <th style={{ width: "14%" }}>공통 코드명</th>
                  <th style={{ width: "14%" }}>코드 설명</th>
                  <th style={{ width: "14%" }}>등록 일자</th>
                  <th style={{ width: "14%" }}>수정 일자</th>
                </tr>
              </StyledThead>
              <tbody>
                {codes.length < 1 ? (
                  <tr>
                    <td colSpan={9} style={{ textAlign: "center" }}>
                      검색 결과가 없습니다.
                    </td>
                  </tr>
                ) : (
                  codes.map((code, index) => (
                    <tr key={index}>
                      <td style={{ textAlign: "center" }}>
                        <input type={"checkbox"} />
                      </td>
                      <td>{code.upper_COMMON_CODE}</td>
                      <td className="target">
                        <StyledLink
                          to={"/Admin/UserInfo?userId=" + code.common_CODE}
                        >
                          {code.common_CODE}
                        </StyledLink>
                      </td>
                      <td>{code.code_NAME}</td>
                      <td>{code.code_DESCRIPTION}</td>
                      <td>{code.code_REG_DATE}</td>
                      <td>{code.code_MODIFY_DATE}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CCodeList;
