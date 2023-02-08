import {
  Input,
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  CardHeader,
  CardText,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Container,
  Label,
  FormGroup,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import customAxios from "../../components/axios/axios";
import ComponentCard from "../../components/ComponentCard";
import styled from "styled-components";

const Li = styled.li`
  list-style-type: "┕  ";
`;

const ProjectUserList = (props) => {
  const [deptInfo, setDeptInfo] = useState([
    {
      commonCode: "",
      codeName: "",
    },
  ]);
  const [dept, setDept] = useState([
    {
      commonCode: "",
      codeName: "",
    },
  ]);

  const [projectIndex, setProjectIndex] = useState(props.project.porjectIndex);
  const [checkedList, setCheckedList] = useState([]);
  const [userList, setUserList] = useState([]);

  const [checkTempMangerList, setCheckTempMangerList] = useState([]);
  const [tempMangerList, setTempManagerList] = useState([]);

  const [checkTempParticipantList, setCheckTempParticipantList] = useState([]);
  const [tempParticipantList, setTempParticipantList] = useState([]);

  const [modal, setModal] = useState(false);

  const [open, setOpen] = useState(true);

  const [userInfo, setUserInfo] = useState([
    {
      userName: "",
      userId: "",
      userImg: "",
      userDept: "",
      userRank: "",
      userPosition: "",
      userAuthority: "",
      userStatus: "",
      userPhone: "",
      userLandLineNumber: "",
      userAddr: "",
      userAddrDetail: "",
    },
  ]);

  const onClickFolder = () => {
    open === true ? setOpen(false) : setOpen(true);
  };

  const [selectDept, setSelectDept] = useState("D0000");
  const [deptArr, setDeptArr] = useState("D0000");

  const onClickDept = (e) => {
    console.log(e.target.value);
    const value = e.target.value;
    setSelectDept(value);
    setDeptArr(value);
    setCheckedList([]);
    console.log(deptArr, "da");
  };

  const toggle = () => {
    setModal(!modal);
  };

  useEffect(() => {
    console.log(props);
    customAxios({
      url: "/projectUserList.do",
      method: "GET",
      params: {
        projectIndex: props.project.projectIndex,
      },
    }).then((re) => {
      setTempManagerList(re.data);
      // setUserList(re.data, {
      //   userName: re.data.userFirstName + re.data.userLastName,
      // });
    });
  }, [props]);

  useEffect(() => {
    customAxios({
      url: "/selectUserList.do",
      method: "GET",
      params: {},
    }).then((re) => {
      // setUserList(re.data, {
      //   userName: re.data.userFirstName + re.data.userLastName,
      // });
    });

    customAxios({
      url: "/CMN/organi/deptList.do",
      method: "GET",
    }).then((response) => {
      setDept(response.data);
    });

    customAxios({
      url: "/CMN/organi/deptInfo.do?commonCode=" + selectDept,
      method: "GET",
    }).then((response) => {
      setDeptInfo(response.data);
    });

    customAxios({
      url: "/CMN/organi/userInfo.do?userDept=" + selectDept,
      method: "GET",
    }).then((response) => {
      console.log(response.data);
      const newArray = [...tempMangerList, ...tempParticipantList];
      setUserList(
        response.data.filter((el) => {
          return !newArray.some((other) => {
            return el.userId === other.userId;
          });
        })
      );
    });
  }, [modal, selectDept]);

  const managerAdd = () => {
    setTempManagerList([...tempMangerList, ...checkedList]);

    setUserList(
      userList.filter((el) => {
        return !checkedList.some((other) => other.userId === el.userId);
      })
    );
    setCheckedList([]);
  };

  const participantListAdd = () => {
    setTempParticipantList([...tempParticipantList, ...checkedList]);

    setUserList(
      userList.filter((el) => {
        return !checkedList.some((other) => other.userId === el.userId);
      })
    );
    setCheckedList([]);
  };

  const participantListDelete = () => {
    setUserList([...userList, ...checkTempParticipantList]);

    setTempParticipantList(
      tempParticipantList.filter((el) => {
        return !checkTempParticipantList.some(
          (other) => other.userId === el.userId
        );
      })
    );
    setCheckTempParticipantList([]);
  };

  const managerDelete = () => {
    setUserList([...userList, ...checkTempMangerList]);

    setTempManagerList(
      tempMangerList.filter((el) => {
        return !checkTempMangerList.some((other) => other.userId === el.userId);
      })
    );
    setCheckTempMangerList([]);
  };

  const userCheck = (checked, item, item2) => {
    if (checked) {
      setCheckedList((prev) => [...prev, { userName: item, userId: item2 }]);
    } else if (!checked) {
      setCheckedList(
        checkedList.filter((el) => {
          return el.userId !== item2;
        })
      );
    }
  };

  const deleteUserCheck = (checked, item, item2) => {
    if (checked) {
      setCheckTempMangerList((prev) => [
        ...prev,
        { userName: item, userId: item2 },
      ]);
    } else if (!checked) {
      setCheckTempMangerList(
        checkTempMangerList.filter((el) => {
          return el.userId !== item2;
        })
      );
    }
  };
  const deleteParticipantUserCheck = (checked, item, item2) => {
    if (checked) {
      setCheckTempParticipantList((prev) => [
        ...prev,
        { userName: item, userId: item2 },
      ]);
    } else if (!checked) {
      setCheckTempParticipantList(
        checkTempParticipantList.filter((el) => {
          return el.userId !== item2;
        })
      );
    }
  };

  const batchSave = () => {
    console.log("batchSave");
    console.log("tempMangerList", tempMangerList);
    console.log("tempParticipantList", tempParticipantList);
  };
  const isActTaps = () => {};

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">
          프로젝트 투입 인력
          <i
            className="bi bi-person-plus"
            style={{
              position: "absolute",
              top: 10,
              right: 30,
              cursor: "pointer",
            }}
            onClick={toggle}
          ></i>
        </CardTitle>
        <CardSubtitle className="text-muted" tag="h6"></CardSubtitle>
        <Modal
          isOpen={modal}
          toggle={toggle}
          // size="lg"
          size="xl"
        >
          <ModalHeader toggle={toggle}>프로젝트 투입 인력 배치</ModalHeader>
          <ModalBody>
            <Container>
              <Row>
                <Col xs="5">
                  <Card
                    style={{
                      minHeight: "650px",
                      maxHeight: "650px",
                      backgroundColor: "#fdfdfd",
                    }}
                  >
                    <br></br>
                    <CardHeader style={{ color: "black", fontWeight: "bold" }}>
                      부서
                    </CardHeader>
                    <CardBody
                      style={{ overflowY: "auto", border: "1px solid #e3e3e3" }}
                    >
                      <div
                        style={{
                          display: "flex",
                          marginBottom: "10px",
                          height: "30px",
                        }}
                      >
                        {open === true ? (
                          <>
                            <button
                              style={{
                                width: "30px",
                                marginRight: "20px",
                                border: "0",
                              }}
                              onClick={onClickFolder}
                            >
                              <i
                                className="bi bi-dash-lg"
                                style={{ float: "left" }}
                              />
                            </button>
                            <span style={{ fontWeight: "bold" }}>
                              세연아이넷
                            </span>
                          </>
                        ) : (
                          <>
                            <button
                              style={{
                                width: "30px",
                                marginRight: "20px",
                                border: "0",
                              }}
                              onClick={onClickFolder}
                            >
                              <i
                                className="bi bi-plus-lg"
                                style={{ float: "left" }}
                              />
                            </button>
                            <span>세연아이넷</span>
                          </>
                        )}
                      </div>

                      {/* 부서목록 */}
                      {dept.map((d, index) =>
                        open === true ? (
                          <ul key={index} style={{ display: "block" }}>
                            <Li
                              style={{
                                marginLeft: "40px",
                                width: "80%",
                                fontSize: "13px",
                              }}
                              value={d.commonCode}
                            >
                              <button
                                className={
                                  deptArr === d.commonCode
                                    ? "bg-light p-2 border"
                                    : "button"
                                }
                                style={
                                  deptArr === d.commonCode
                                    ? {
                                        border: "0",
                                        backgroundColor: "white",
                                        width: "150px",
                                        textAlign: "left",
                                        fontWeight: "bold",
                                      }
                                    : {
                                        border: "0",
                                        backgroundColor: "white",
                                        width: "150px",
                                        textAlign: "left",
                                      }
                                }
                                value={d.commonCode}
                                onClick={onClickDept}
                              >
                                {d.codeName}
                              </button>
                            </Li>
                          </ul>
                        ) : (
                          <ul key={index} style={{ display: "none" }}></ul>
                        )
                      )}
                      {/* 부서목록 */}
                    </CardBody>
                  </Card>
                </Col>
                <Col xs="3">
                  <Card
                    style={{
                      minHeight: "650px",
                      maxHeight: "650px",
                      backgroundColor: "#fdfdfd",
                    }}
                  >
                    <br></br>
                    <CardHeader style={{ color: "black", fontWeight: "bold" }}>
                      사용자 목록
                    </CardHeader>
                    <CardBody
                      style={{ overflowY: "auto", border: "1px solid #e3e3e3" }}
                    >
                      {userList.map((user, idx) => {
                        return (
                          <div
                            key={idx}
                            style={{
                              fontSize: "13px",
                              color: "black",
                            }}
                          >
                            <FormGroup check>
                              <Input
                                type="checkbox"
                                onChange={(e) => {
                                  userCheck(
                                    e.target.checked,
                                    user.userFirstName
                                      ? user.userFirstName
                                      : user.userName,
                                    user.userId
                                  );
                                }}
                                checked={
                                  checkedList.some(
                                    (item) => item.userId === user.userId
                                  )
                                    ? true
                                    : false
                                }
                              />
                              <Label check>
                                {user.userFirstName}
                                {user.userName}
                              </Label>
                            </FormGroup>
                          </div>
                        );
                      })}
                    </CardBody>
                  </Card>
                </Col>
                <Col xs="1">
                  <Row
                    style={{
                      minHeight: "310px",
                      maxHeight: "310px",
                      alignContent: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      style={{
                        fontSize: "10px",
                        height: "30px",
                        width: "100px",
                      }}
                      onClick={managerAdd}
                    >
                      추가 ▶
                    </Button>

                    <Button
                      style={{
                        fontSize: "10px",
                        height: "30px",
                        width: "100px",
                        marginTop: "10px",
                      }}
                      onClick={managerDelete}
                    >
                      ◀ 삭제
                    </Button>
                  </Row>
                  <br></br>
                  <Row
                    style={{
                      minHeight: "310px",
                      maxHeight: "310px",
                      alignContent: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      style={{
                        fontSize: "10px",
                        height: "30px",
                        width: "100px",
                      }}
                      onClick={participantListAdd}
                    >
                      추가 ▶
                    </Button>
                    <Button
                      style={{
                        fontSize: "10px",
                        height: "30px",
                        width: "100px",
                        marginTop: "10px",
                      }}
                      onClick={participantListDelete}
                    >
                      ◀ 삭제
                    </Button>
                  </Row>
                </Col>
                <Col xs="3">
                  <Row>
                    <Card
                      style={{
                        minHeight: "310px",
                        maxHeight: "310px",
                        backgroundColor: "#fdfdfd",
                      }}
                    >
                      <br></br>
                      <CardHeader
                        style={{ color: "black", fontWeight: "bold" }}
                      >
                        관리자
                      </CardHeader>
                      <CardBody
                        style={{
                          overflowY: "auto",
                          border: "1px solid #e3e3e3",
                        }}
                      >
                        {tempMangerList.map((user, idx) => {
                          return (
                            <div
                              key={idx}
                              style={{
                                fontSize: "13px",
                                color: "black",
                              }}
                            >
                              <FormGroup check>
                                <Input
                                  type="checkbox"
                                  onChange={(e) => {
                                    deleteUserCheck(
                                      e.target.checked,
                                      user.userName,
                                      user.userId
                                    );
                                  }}
                                  checked={
                                    checkTempMangerList.some(
                                      (item) => item.userId === user.userId
                                    )
                                      ? true
                                      : false
                                  }
                                />
                                <Label check>
                                  {user.userFirstName}
                                  {user.userName}
                                </Label>
                              </FormGroup>
                            </div>
                          );
                        })}
                      </CardBody>
                    </Card>
                  </Row>
                  <Row>
                    <Card
                      style={{
                        minHeight: "310px",
                        maxHeight: "310px",
                        backgroundColor: "#fdfdfd",
                      }}
                    >
                      <br></br>
                      <CardHeader
                        style={{ color: "black", fontWeight: "bold" }}
                      >
                        참여자
                      </CardHeader>
                      <CardBody
                        style={{
                          overflowY: "auto",
                          border: "1px solid #e3e3e3",
                        }}
                      >
                        {tempParticipantList.map((user, idx) => {
                          return (
                            <CardText
                              key={idx}
                              style={{
                                fontSize: "13px",
                                color: "black",
                              }}
                            >
                              <FormGroup check>
                                <Input
                                  type="checkbox"
                                  onChange={(e) => {
                                    deleteParticipantUserCheck(
                                      e.target.checked,
                                      user.userName,
                                      user.userId
                                    );
                                  }}
                                  checked={
                                    checkTempParticipantList.some(
                                      (item) => item.userId === user.userId
                                    )
                                      ? true
                                      : false
                                  }
                                />
                                <Label check>
                                  {user.userFirstName}
                                  {user.userName}
                                </Label>
                              </FormGroup>
                            </CardText>
                          );
                        })}
                      </CardBody>
                    </Card>
                  </Row>
                </Col>
              </Row>
            </Container>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={batchSave}>
              저장
            </Button>{" "}
            <Button color="secondary" onClick={toggle}>
              취소
            </Button>
          </ModalFooter>
        </Modal>
        <div style={{ height: "338px" }}>
          <Row
            style={{
              minHeight: "50%",
              maxHeight: "50%",
              overflow: "hidden",
            }}
          >
            <Card>
              <CardTitle tag="h6">관리자</CardTitle>
              <CardBody
                style={{
                  overflowY: "auto",
                  border: "1px solid #e3e3e3",
                  minHeight: "120px",
                  maxHeight: "120px",
                }}
              >
                <Container>
                  <Row xs="2" style={{ color: "grey", fontWeight: "bold" }}>
                    {/*관리자 명단 map*/}
                    {tempMangerList.map((data, idx) => {
                      return (
                        <Col style={{ color: "black" }} key={idx}>
                          {data.userFirstName}
                        </Col>
                      );
                    })}
                  </Row>
                </Container>
              </CardBody>
            </Card>
          </Row>
          <br></br>
          <Row>
            <Card>
              <CardTitle tag="h6">참여자</CardTitle>
              <CardBody
                style={{
                  overflowY: "auto",
                  border: "1px solid #e3e3e3",
                  minHeight: "120px",
                  maxHeight: "120px",
                }}
              >
                <Container>
                  <Row
                    xs="2"
                    style={{
                      color: "grey",
                      fontWeight: "bold",
                    }}
                  >
                    {/*참여자 명단 map*/}
                    <Col>Max</Col>
                    <Col>John</Col>
                    <Col>Kim</Col>
                    <Col>Angelina</Col>
                    <Col>James</Col>
                    <Col>Nick</Col>
                    <Col>Mark</Col>
                    <Col>Hol</Col>
                    <Col>Max</Col>
                    <Col>John</Col>
                    <Col>Kim</Col>
                    <Col>Angelina</Col>
                    <Col>James</Col>
                    <Col>Nike</Col>
                    <Col>Mark</Col>
                    <Col>Hol</Col>
                  </Row>
                </Container>
              </CardBody>
            </Card>
          </Row>
        </div>
      </CardBody>
    </Card>
  );
};

export default ProjectUserList;
