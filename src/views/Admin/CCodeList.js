import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Input } from "reactstrap";

const StyledThead = styled.thead`
  text-align: center;
  color: white;
  background-color: #2962ff;
`;

const CCodeList = () => {
  return (
    <div>
      <div className="col-lg-12">
        <div className="card">
          <h6 className="border-bottom p-3 mb-0 card-title">
            <i className="bi bi-card-text me-2"> </i>공통 코드 목록
          </h6>
          <div className="card-body"></div>
          <CCodeDetail></CCodeDetail>
        </div>
      </div>
    </div>
  );
};

const CCodeDetail = () => {
  const Head = { display: "flex" };
  const Head_BT = { width: "30%", display: "flex" }; //사용자 목록

  const [codes, setCodes] = useState([
    {
      rownum: "",
      upper_COMMON_CODE: "",
      common_CODE: "",
      code_NAME: "",
      code_DESCRIPTION: "",
      code_REG_DATE: "",
      code_MODIFY_DATE: "",
    },
  ]);

  const [cmm, setCmm] = useState("");
  const [up, setUp] = useState("");
  const [name, setName] = useState("");
  const [des, setDes] = useState("");

  // 상위 코드
  const [Ucodes, setUCodes] = useState([
    {
      common_CODE: "",
      code_NAME: "",
      code_DESCRIPTION: "",
    },
  ]);

  // 일반 공통 코드
  const [Dcodes, setDCodes] = useState([
    {
      rownum: "",
      upper_COMMON_CODE: "",
      common_CODE: "",
      code_NAME: "",
      code_DESCRIPTION: "",
      code_REG_DATE: "",
      code_MODIFY_DATE: "",
    },
  ]);

  for (var i = 0; i < codes.length; i++) {
    if (codes[i].upper_COMMON_CODE === null) {
      if (Ucodes[0].common_CODE.length < 2) {
        Ucodes[0] = {
          common_CODE: codes[i].common_CODE,
          code_NAME: codes[i].code_NAME,
          code_DESCRIPTION: codes[i].code_DESCRIPTION,
        };
      } else {
        Ucodes[i] = {
          common_CODE: codes[i].common_CODE,
          code_NAME: codes[i].code_NAME,
          code_DESCRIPTION: codes[i].code_DESCRIPTION,
        };
      }
    }
  }

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

  // 상위 코드 선택
  const codeClick = (param, e) => {
    console.log(param);

    Dcodes.length = 0;
    for (var i = 0; i < codes.length; i++) {
      if (codes[i].common_CODE === param) {
        setUp("");
        setCmm(codes[i].common_CODE);
        setName(codes[i].code_NAME);
        setDes(codes[i].code_DESCRIPTION);
      }
      if (codes[i].upper_COMMON_CODE === param) {
        Dcodes.push({
          rownum: i,
          upper_COMMON_CODE: codes[i].upper_COMMON_CODE,
          common_CODE: codes[i].common_CODE,
          code_NAME: codes[i].code_NAME,
          code_DESCRIPTION: codes[i].code_DESCRIPTION,
          code_REG_DATE: codes[i].code_REG_DATE,
          code_MODIFY_DATE: codes[i].code_MODIFY_DATE,
        });
      }
    }
  };

  // 공통 코드 선택
  const ccodeClick = (param, e) => {
    for (var i = 0; i < codes.length; i++) {
      if (codes[i].common_CODE === param) {
        setCmm(codes[i].common_CODE);
        setName(codes[i].code_NAME);
        setDes(codes[i].code_DESCRIPTION);
        setUp(codes[i].upper_COMMON_CODE);
      }
    }
  };

  // 검색 axios
  useEffect(() => {
    axios
      .get(
        //       "http://192.168.0.17:5001/CMN/CodeList.do?searchKey=" +
        "http://192.168.0.37:2000/CodeList.do?searchKey=" +
          searchKey +
          "&searchValue=" +
          searchValue
      )
      .then((response) => {
        setCodes(response.data);
      });
  }, [searchKey, searchValue]);

  const codeRemove = (e) => {
    console.log("지우기");

    setCmm("");
    setName("");
    setDes("");
    setUp("");
  };

  const codeAdd = (e) => {
    axios
      .post(
        "http://192.168.0.37:2000/CodeRegist.do?COMMON_CODE=" +
          cmm +
          "&UPPER_COMMON_CODE=" +
          up +
          "&CODE_NAME=" +
          name +
          "&CODE_DESCRIPTION=" +
          des
      )
      .then((response) => {
        console.log(response);
      });
  };

  const onChange = (e) => {
    console.log(e.target);
    if (e.target.name === "common_CODE") {
      setCmm(e.target.value);
    }
    if (e.target.name === "code_NAME") {
      setName(e.target.value);
    }
    if (e.target.name === "code_DESCRIPTION") {
      setDes(e.target.value);
    }
    if (e.target.name === "upper_COMMON_CODE") {
      setUp(e.target.value);
    }
  };
  console.log("up" + up);

  return (
    <div>
      <div className="card-body">
        <div style={Head}>
          <div>
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
          </div>
          <div style={Head_BT}>
            <table>
              <tr>
                <td>
                  <button
                    type={"button"}
                    className="btn btn btn-outline-success"
                    style={{ float: "right" }}
                    onClick={codeAdd}
                  >
                    추가
                  </button>
                </td>
                <td>
                  <button
                    type={"button"}
                    className="btn btn btn-outline-warning"
                    style={{ float: "right" }}
                  >
                    수정
                  </button>
                </td>
                <td>
                  <button
                    type={"button"}
                    className="btn btn btn-outline-secondary"
                    style={{ float: "right" }}
                    onClick={codeRemove}
                  >
                    지우기
                  </button>
                </td>
                <td>
                  <button
                    type={"button"}
                    className="btn btn btn-outline-danger"
                    style={{ float: "right" }}
                  >
                    삭제
                  </button>
                </td>
              </tr>
            </table>
          </div>
        </div>

        <div>
          <table>
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
                    key={up}
                    defaultValue={up}
                  >
                    <option
                      key={up}
                      defaultValue={up}
                      onChange={onChange}
                    ></option>
                    {Ucodes.length < 1 ? (
                      // eslint-disable-next-line jsx-a11y/heading-has-content
                      <option>없음</option>
                    ) : (
                      // eslint-disable-next-line jsx-a11y/heading-has-content
                      Ucodes.map((Ucodes, index) => (
                        <option value={Ucodes.common_CODE} onChange={onChange}>
                          {Ucodes.common_CODE}
                        </option>
                      ))
                    )}
                  </select>
                </td>
              </tr>
              <tr>
                <td>공통 코드</td>
                <td>
                  <input
                    className="form-control"
                    id="common_CODE"
                    name="common_CODE"
                    value={cmm}
                    onChange={onChange}
                  />
                </td>
              </tr>
              <tr>
                <td>공통 코드명</td>
                <td>
                  <input
                    className="form-control"
                    id="code_NAME"
                    name="code_NAME"
                    value={name}
                    onChange={onChange}
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
                    value={des}
                    onChange={onChange}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={Head}>
          <table
            className="table table-bordered table-hover"
            style={{ width: "30%" }}
          >
            <StyledThead>
              <tr>
                <th style={{ width: "2%", textAlign: "center" }}>
                  <input type={"checkbox"} />
                </th>
                <th style={{ width: "14%" }}>공통 코드</th>
                <th style={{ width: "14%" }}>코드명</th>
              </tr>
            </StyledThead>
            <tbody>
              {Ucodes.length < 1 ? (
                <tr>
                  <td colSpan={9} style={{ textAlign: "center" }}>
                    검색 결과가 없습니다.
                  </td>
                </tr>
              ) : (
                Ucodes.map((ucode, index) => (
                  <tr key={index}>
                    <td style={{ textAlign: "center" }}>
                      <input type={"checkbox"} />
                    </td>
                    <td
                      className="target"
                      onClick={(e) => {
                        codeClick(ucode.common_CODE, e);
                      }}
                    >
                      {ucode.common_CODE}
                    </td>
                    <td
                      className="target"
                      onClick={(e) => {
                        codeClick(ucode.common_CODE, e);
                      }}
                    >
                      {ucode.code_NAME}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <table className="table table-bordered table-hover">
            <StyledThead>
              <tr>
                <th style={{ width: "2%", textAlign: "center" }}>
                  <input type={"checkbox"} />
                </th>
                <th style={{ width: "14%" }}>공통 코드</th>
                <th style={{ width: "14%" }}>공통 코드명</th>
                <th style={{ width: "14%" }}>코드 설명</th>
              </tr>
            </StyledThead>
            <tbody>
              {Dcodes.length < 1 ? (
                <tr>
                  <td colSpan={9} style={{ textAlign: "center" }}>
                    검색 결과가 없습니다.
                  </td>
                </tr>
              ) : (
                Dcodes.map((dcode, index) => (
                  <tr key={index}>
                    <td style={{ textAlign: "center" }}>
                      <input type={"checkbox"} />
                    </td>
                    <td
                      className="target"
                      onClick={(e) => ccodeClick(dcode.common_CODE)}
                    >
                      {dcode.common_CODE}
                    </td>
                    <td onClick={(e) => ccodeClick(dcode.common_CODE)}>
                      {dcode.code_NAME}
                    </td>
                    <td onClick={(e) => ccodeClick(dcode.common_CODE)}>
                      {dcode.code_DESCRIPTION}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CCodeList;
