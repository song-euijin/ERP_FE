import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Row,
  Col,
  ButtonGroup,
  Button,
  Container,
  Table,
} from "reactstrap";
import customAxios from "../../components/axios/axios";
import PmsChart from "./PmsChart";
import ProjectUserList from "./ProjectUserList";

const ProjectDashboard = () => {


  const location = useLocation();
  const index = location.state.projectIndex;

  const [project, setProject] = useState({
    projectName: "",
    ProjectDscription: "",
    projectStartDate: "",
    projectEndDate: "",
  });
  const [cSelected, setCSelected] = useState([]);
  const [rSelected, setRSelected] = useState(1);

  const [mangerList, setManagerList] = useState([]);
  const [participantList, setParticipantList] = useState([]);

  const onCheckboxBtnClick = (selected) => {
    const index = cSelected.indexOf(selected);
    if (index < 0) {
      cSelected.push(selected);
    } else {
      cSelected.splice(index, 1);
    }
    setCSelected([...cSelected]);
  };
  useEffect(() => {
    
    customAxios({
      url: "/selectProject.do",
      method: "GET",
      params: {
        projectIndex: index,
      },
    }).then((re) => {
      
      setProject({
        projectIndex: re.data.projectIndex,
        projectName: re.data.projectName,
        projectDescription: re.data.projectDescription,
        projectStartDate: re.data.projectStartDate,
        projectEndDate: re.data.projectEndDate,
      });
    });
  }, []);



  return (
    <>
      <div style={{overflow:"hidden"}}>
        <Row>
          <Col sm="6" lg="6" xl="6" xxl="8">
            <PmsChart project={project} setProject={setProject} />
          </Col>
          <Col sm="6" lg="6" xl="6" xxl="4">
          <ProjectUserList></ProjectUserList>
          </Col>
        </Row>
        <Row>
          <Col sm="6" lg="6" xl="7" xxl="12">
            <Card>
              <CardBody>
                <CardTitle tag="h5"></CardTitle>
                <CardSubtitle className="text-muted" tag="h6"></CardSubtitle>
                <ButtonGroup style={{ width: "100%" }}>
                  <Button
                    color="secondary"
                    outline
                    onClick={() => setRSelected(1)}
                    active={rSelected === 1}
                    style={{ maxWidth: "100px" }}
                  >
                    공지사항
                  </Button>
                  <Button
                    color="secondary"
                    outline
                    onClick={() => setRSelected(2)}
                    active={rSelected === 2}
                    style={{ maxWidth: "100px" }}
                  >
                    업무
                  </Button>
                  <Button
                    color="secondary"
                    outline
                    onClick={() => setRSelected(3)}
                    active={rSelected === 3}
                    style={{ maxWidth: "100px", borderRadius: "3px" }}
                  >
                    일정
                  </Button>
                  <Button
                    style={{
                      maxWidth: "100px",
                      position: "absolute",
                      top: 5,
                      right: 10,
                    }}
                    color="primary"
                  >
                    등록하기
                  </Button>
                </ButtonGroup>
              </CardBody>
              <CardBody style={{}}>
                <Table bordered>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Username</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td>@fat</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>Larry</td>
                      <td>the Bird</td>
                      <td>@twitter</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ProjectDashboard;
