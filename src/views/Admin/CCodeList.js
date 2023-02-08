import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Accordion from "react-bootstrap/Accordion";
import customAxios from "../../components/axios/axios";

const CCodeList = () => {
  // 코드 정보 원본
  const [codes, setCodes] = useState([
    {
      upper_COMMON_CODE: "",
      common_CODE: "",
      code_NAME: "",
      code_DESCRIPTION: "",
      code_REG_DATE: "",
      code_MODIFY_DATE: "",
      isused: "",
    },
  ]);

  const [upper, setUpper] = useState([
    {
      upper_COMMON_CODE: "",
      common_CODE: "",
      code_NAME: "",
      code_DESCRIPTION: "",
      code_REG_DATE: "",
      code_MODIFY_DATE: "",
      isused: "",
    },
  ]);

  const [select, setSelect] = useState({
    upper_COMMON_CODE: "",
    common_CODE: "",
    code_NAME: "",
    code_DESCRIPTION: "",
    code_REG_DATE: "",
    code_MODIFY_DATE: "",
    isused: "",
  });

  const [state, setState] = useState("new");
  const [sidePage, setSidePage] = useState("Detail");

  // 원본 불러오기
  useEffect(() => {
    axios
      .get("http://192.168.0.37:2000/CodeList.do?searchKey=' '&searchValue= ")
      .then((Response) => {
        setCodes(Response.data);
      });
  }, [state]);

  useEffect(() => {
    var x = 0;
    for (var i = 0; i < codes.length; i++) {
      if (codes[i].upper_COMMON_CODE === null) {
        upper[x] = {
          upper_COMMON_CODE: codes[i].upper_COMMON_CODE,
          common_CODE: codes[i].common_CODE,
          code_NAME: codes[i].code_NAME,
          code_DESCRIPTION: codes[i].code_DESCRIPTION,
          code_REG_DATE: codes[i].code_REG_DATE,
          code_MODIFY_DATE: codes[i].code_MODIFY_DATE,
          isused: codes[i].isused,
        };
        x++;
      }
    }
    setState("upper");
  }, [codes]);

  // 검색
  useEffect(() => {}, []);

  const click = document.getElementsByClassName("nonClick");

  const clickHandler = (e, common) => {
    setSidePage("Detail");
    for (var i = 0; i < click.length; i++) {
      click[i].classList.remove("active");
    }
    e.target.classList.add("active");

    setSelect({
      upper_COMMON_CODE: common.upper_COMMON_CODE,
      common_CODE: common.common_CODE,
      code_NAME: common.code_NAME,
      code_DESCRIPTION: common.code_DESCRIPTION,
      code_REG_DATE: common.code_REG_DATE,
      code_MODIFY_DATE: common.code_MODIFY_DATE,
      isused: common.isused,
    });
  };

  const init = () => {
    for (let i = 0; i < click.length; i++) {
      click[i].addEventListener("click", clickHandler);
    }
  };

  init();

  // 선택될 코드 변경 정보 추적
  const onChange = (e) => {
    if (e.target.name === "common_CODE") {
      setSelect({
        rownum: select.rownum,
        upper_COMMON_CODE: select.upper_COMMON_CODE,
        common_CODE: e.target.value,
        code_NAME: select.code_NAME,
        code_DESCRIPTION: select.code_DESCRIPTION,
        code_REG_DATE: select.code_REG_DATE,
        code_MODIFY_DATE: select.code_MODIFY_DATE,
        isused: select.isused,
      });
    }

    if (e.target.name === "upper_COMMON_CODE") {
      setSelect({
        rownum: select.rownum,
        upper_COMMON_CODE: e.target.value,
        common_CODE: select.common_CODE,
        code_NAME: select.code_NAME,
        code_DESCRIPTION: select.code_DESCRIPTION,
        code_REG_DATE: select.code_REG_DATE,
        code_MODIFY_DATE: select.code_MODIFY_DATE,
        isused: select.isused,
      });
    }

    if (e.target.name === "code_NAME") {
      setSelect({
        rownum: select.rownum,
        upper_COMMON_CODE: select.upper_COMMON_CODE,
        common_CODE: select.common_CODE,
        code_NAME: e.target.value,
        code_DESCRIPTION: select.code_DESCRIPTION,
        code_REG_DATE: select.code_REG_DATE,
        code_MODIFY_DATE: select.code_MODIFY_DATE,
        isused: select.isused,
      });
    }

    if (e.target.name === "code_DESCRIPTION") {
      setSelect({
        rownum: select.rownum,
        upper_COMMON_CODE: select.upper_COMMON_CODE,
        common_CODE: select.common_CODE,
        code_NAME: select.code_NAME,
        code_DESCRIPTION: e.target.value,
        code_REG_DATE: select.code_REG_DATE,
        code_MODIFY_DATE: select.code_MODIFY_DATE,
        isused: select.isused,
      });
    }

    if (e.target.name === "isused") {
      setSelect({
        rownum: select.rownum,
        upper_COMMON_CODE: select.upper_COMMON_CODE,
        common_CODE: select.common_CODE,
        code_NAME: select.code_NAME,
        code_DESCRIPTION: select.code_DESCRIPTION,
        code_REG_DATE: select.code_REG_DATE,
        code_MODIFY_DATE: select.code_MODIFY_DATE,
        isused: e.target.value,
      });
    }
  };

  // 선택된 코드 정보 기록 제거
  const codeRemove = () => {
    for (var i = 0; i < click.length; i++) {
      click[i].classList.remove("active");
    }
    setSelect({
      upper_COMMON_CODE: "",
      common_CODE: "",
      code_NAME: "",
      code_DESCRIPTION: "",
      code_REG_DATE: "",
      code_MODIFY_DATE: "",
      isused: "",
    });
  };

  // 코드 추가 axios
  const codeAdd = () => {
    axios({
      method: "post",
      url: "http://192.168.0.37:2000/CodeRegist.do",
      data: {
        upper_COMMON_CODE: select.upper_COMMON_CODE,
        common_CODE: select.common_CODE,
        code_NAME: select.code_NAME,
        code_DESCRIPTION: select.code_DESCRIPTION,
        isused: select.isused,
      },
    }).then(function (response) {
      axios
        .get("http://192.168.0.37:2000/CodeList.do?searchKey=' '&searchValue= ")
        .then((Response) => {
          setCodes(Response.data);
        });
      setState("add");
    });
  };

  // 코드 수정 axios
  const codeUpdate = () => {
    axios({
      method: "post",
      url: "http://192.168.0.37:2000/CodeUpdate.do",
      data: {
        common_CODE: select.common_CODE,
        code_NAME: select.code_NAME,
        code_DESCRIPTION: select.code_DESCRIPTION,
        isused: select.isused,
      },
    }).then(function (response) {
      axios
        .get("http://192.168.0.37:2000/CodeList.do?searchKey=' '&searchValue= ")
        .then((Response) => {
          setCodes(Response.data);
        });
      setState("update");
    });
  };

  const pageMove = () => {
    setSidePage("create");
    console.log(sidePage);
  };

  return (
    <div>
      <div className="card-body">
        <div className="row">
          <div className="col-sm-3 col-lg-3">
            <div className="card">
              <h6 className="border-bottom p-3 mb-0 card-title card-cus">
                <div>
                  <i className="bi bi-card-text me-2"> </i>공통 코드 목록
                </div>
                <div>
                  <i
                    class="bi bi-plus icon-add"
                    onClick={(e) => pageMove(e)}
                  ></i>
                </div>
              </h6>
              <div className="card-body scroll">
                <div>
                  <Accordion defaultActiveKey="0" alwaysOpen flush>
                    {upper.length < 1 ? (
                      <div>코드가 존재하지 않습니다. </div>
                    ) : (
                      upper.map((up, index) => (
                        <div>
                          <Accordion.Item eventKey={index}>
                            <Accordion.Header
                              onClick={(e) => clickHandler(e, up)}
                            >
                              {up.code_NAME}
                            </Accordion.Header>
                            {codes.filter(
                              (code) =>
                                code.upper_COMMON_CODE === up.common_CODE
                            ).length < 1 ? (
                              <Accordion.Body>
                                <button class="accordion-box nonClick">
                                  하위 코드 없습니다
                                </button>
                              </Accordion.Body>
                            ) : (
                              codes
                                .filter(
                                  (code) =>
                                    code.upper_COMMON_CODE === up.common_CODE
                                )
                                .map((code, index) => (
                                  <Accordion.Body class="box non-click">
                                    <button
                                      class="accordion-box nonClick"
                                      onClick={(e) => clickHandler(e, code)}
                                    >
                                      <i class="bi bi-arrow-return-right"> </i>
                                      {code.code_NAME}
                                    </button>
                                  </Accordion.Body>
                                ))
                            )}
                          </Accordion.Item>
                        </div>
                      ))
                    )}
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-lg-6">
            <div className="card">
              {sidePage === "Detail" ? (
                <div>
                  <h6 className="border-bottom p-3 mb-0 card-title">
                    <i className="bi bi-card-text me-2"> </i>공통 코드 상세
                  </h6>
                  <div className="card-body">
                    <div>
                      <table>
                        <tbody>
                          <tr>
                            <td>상위코드</td>
                            <td>
                              <select
                                disabled
                                name="upper_COMMON_CODE"
                                id="landLineNumF"
                                className="form-select"
                                style={{
                                  marginRight: "10px",
                                  float: "left",
                                }}
                                key={select.upper_COMMON_CODE}
                                defaultValue={select.upper_COMMON_CODE}
                                onChange={onChange}
                              >
                                <option
                                  key={select.upper_COMMON_CODE}
                                  defaultValue={select.upper_COMMON_CODE}
                                  value=""
                                >
                                  ====
                                </option>
                                {upper.length < 1 ? (
                                  // eslint-disable-next-line jsx-a11y/heading-has-content
                                  <option>상위코드 없음</option>
                                ) : (
                                  // eslint-disable-next-line jsx-a11y/heading-has-content
                                  upper.map((up, index) => (
                                    <option value={up.common_CODE}>
                                      {up.common_CODE}
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
                                readOnly
                                className="form-control"
                                id="common_CODE"
                                name="common_CODE"
                                value={select.common_CODE}
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
                                value={select.code_NAME}
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
                                value={select.code_DESCRIPTION}
                                onChange={onChange}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>사용 여부</td>
                            <td>
                              <select
                                name="isused"
                                id="landLineNumF"
                                className="form-select"
                                style={{
                                  marginRight: "10px",
                                  float: "left",
                                }}
                                key={select.isused}
                                defaultValue={select.isused}
                                onChange={onChange}
                              >
                                <option
                                  value=""
                                  selected
                                  style={{ display: "none" }}
                                >
                                  사용 여부 선택
                                </option>
                                <option value="Y">Yes</option>
                                <option value="N">No</option>
                              </select>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div>
                      <table>
                        <tr>
                          <td>
                            <button
                              type={"button"}
                              className="btn btn btn-outline-warning"
                              style={{ float: "right" }}
                              onClick={codeUpdate}
                            >
                              수정
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
                </div>
              ) : (
                <div>
                  <h6 className="border-bottom p-3 mb-0 card-title">
                    <i className="bi bi-card-text me-2"> </i>공통 코드 등록
                  </h6>
                  <div className="card-body">
                    <div>
                      <table>
                        <tbody>
                          <tr>
                            <td>상위코드</td>
                            <td>
                              <select
                                name="upper_COMMON_CODE"
                                id="landLineNumF"
                                className="form-select"
                                style={{
                                  marginRight: "10px",
                                  float: "left",
                                }}
                                key={select.upper_COMMON_CODE}
                                defaultValue={select.upper_COMMON_CODE}
                                onChange={onChange}
                              >
                                <option
                                  key={select.upper_COMMON_CODE}
                                  defaultValue={select.upper_COMMON_CODE}
                                  value=""
                                >
                                  ====
                                </option>
                                {upper.length < 1 ? (
                                  // eslint-disable-next-line jsx-a11y/heading-has-content
                                  <option>상위코드 없음</option>
                                ) : (
                                  // eslint-disable-next-line jsx-a11y/heading-has-content
                                  upper.map((up, index) => (
                                    <option value={up.common_CODE}>
                                      {up.common_CODE}
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
                                value={select.common_CODE}
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
                                value={select.code_NAME}
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
                                value={select.code_DESCRIPTION}
                                onChange={onChange}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>사용 여부</td>
                            <td>
                              <select
                                name="isused"
                                id="landLineNumF"
                                className="form-select"
                                style={{
                                  marginRight: "10px",
                                  float: "left",
                                }}
                                key={select.isused}
                                defaultValue={select.isused}
                                onChange={onChange}
                              >
                                <option
                                  value=""
                                  selected
                                  style={{ display: "none" }}
                                >
                                  사용 여부 선택
                                </option>
                                <option value="Y">Yes</option>
                                <option value="N">No</option>
                              </select>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div>
                      <table>
                        <tr>
                          <td>
                            <button
                              type={"button"}
                              className="btn btn btn-outline-success"
                              style={{ float: "right" }}
                              onClick={codeAdd}
                            >
                              저장
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
                        </tr>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CCodeList;
