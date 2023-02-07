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
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import customAxios from "../../components/axios/axios";

const ProjectUserList = (props) => {
  const [checkedList, setCheckedList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [tempMangerList, setTempManagerList] = useState([]);
  const [tempParticipantList, setTempParticipantList] = useState([]);

  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };

  useEffect(() => {
    customAxios({
      url: "/selectUserList.do",
      method: "GET",
      params: {},
    }).then((re) => {
      setUserList(re.data);
    });
    setTempManagerList([]);
  }, [modal]);

  const managerAdd = () => {
    console.log(checkedList);
    setTempManagerList([...tempMangerList, ...checkedList]);
    console.log(userList);
    setUserList(
      userList.filter((el) => {
        return !checkedList.some((other) => other.userId === el.userId);
      })
    );
    setCheckedList([]);
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
        <Modal isOpen={modal} toggle={toggle} size="lg">
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
                      사용자 목록
                    </CardHeader>
                    <CardBody
                      style={{ overflowY: "auto", border: "1px solid #e3e3e3" }}
                    >
                      {userList.map((user, idx) => {
                        return (
                          <CardText key={idx}>
                            <FormGroup check>
                              <Input
                                type="checkbox"
                                onClick={(e) => {
                                  userCheck(
                                    e.target.checked,
                                    user.userFirstName + user.userLastName,
                                    user.userId
                                  );
                                }}
                              />
                              <Label check>
                                {user.userFirstName}
                                {user.userLastName}
                              </Label>
                            </FormGroup>
                          </CardText>
                        );
                      })}
                    </CardBody>
                  </Card>
                </Col>
                <Col xs="2">
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
                        fontSize: "13px",
                        height: "30px",
                        width: "100px",
                      }}
                      onClick={managerAdd}
                    >
                      추가 ▶
                    </Button>

                    <Button
                      style={{
                        fontSize: "13px",
                        height: "30px",
                        width: "100px",
                        marginTop: "10px",
                      }}
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
                        fontSize: "13px",
                        height: "30px",
                        width: "100px",
                      }}
                    >
                      추가 ▶
                    </Button>
                    <Button
                      style={{
                        fontSize: "13px",
                        height: "30px",
                        width: "100px",
                        marginTop: "10px",
                      }}
                    >
                      ◀ 삭제
                    </Button>
                  </Row>
                </Col>
                <Col xs="5">
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
                            <CardText key={idx}>
                              <FormGroup check>
                                <Input type="checkbox" />
                                <Label check>{user.userName}</Label>
                              </FormGroup>
                            </CardText>
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
                        {/* {userList.map((user, idx) => {
                          return (
                            <CardText index={idx}>
                              <FormGroup check>
                                <Input type="checkbox" />
                                <Label check>
                                  {user.userFirstName}
                                  {user.userLastName}
                                </Label>
                              </FormGroup>
                            </CardText>
                          );
                        })} */}
                      </CardBody>
                    </Card>
                  </Row>
                </Col>
              </Row>
            </Container>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toggle}>
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
              <CardBody>
                <CardTitle tag="h6">관리자</CardTitle>
                <Container>
                  <Row xs="4" style={{ color: "grey", fontWeight: "bold" }}>
                    {/*관리자 명단 map*/}
                    <Col>Max</Col>
                    <Col>John</Col>
                    <Col>Kim</Col>
                    <Col>Angelina</Col>
                    <Col>James</Col>
                    <Col>Nick</Col>
                    <Col>Mark</Col>
                    <Col>Hol</Col>
                  </Row>
                </Container>
              </CardBody>
            </Card>
          </Row>
          <Row
            style={{
              minHeight: "50%",
              maxHeight: "50%",
              overflowY: "auto",
            }}
          >
            <Card>
              <CardBody>
                <CardTitle tag="h6">참여자</CardTitle>
                <Container>
                  <Row xs="4" style={{ color: "grey", fontWeight: "bold" }}>
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
