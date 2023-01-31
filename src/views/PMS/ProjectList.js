import React, { useState, useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  CardText,
  Container,
  Row,
  Col,
} from "reactstrap";
import customAxios from "../../components/axios/axios";

const ProjectList = () => {
  
  const [projectList, setProjectList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    customAxios({
      url: "/selectProjectList.do",
      method: "GET",
    }).then((re) => {
      const project = re.data.map((item, index) => {
        if (item.projectDescription.length > 80) {
          item.projectDescription =
            item.projectDescription.substring(0, 79) + " ...";
        }
        if (item.projectName.length > 13) {
          item.projectName =
            item.projectName.substring(0, 11) + " ...";
        }

        return {
          projectName: item.projectName,
          projectDescription: item.projectDescription,
          projectStartDate: item.projectStartDate,
          projectEndDate: item.projectEndDate,
          src: "https://picsum.photos/id/"+ (210+index) + "/200/110",
          projectIndex: item.projectIndex
        };
      });
      setProjectList(project);
    });
  }, []);


  const projectClick=(projectIndex)=>{
    navigate('/PMS/ProjectDashboard',{state:{projectIndex:projectIndex}});
    console.log(projectIndex);
  }

  return (
    <Container>
      <Row xs="4">
        {projectList.map((item, index) => {
          return (
            <Col key={index}>
              <Card
                style={{
                  width: "18rem",
                  lineHeight: 1.3,
                }}
              >
                <img alt="Sample" src={item.src} />
                <CardBody>
                  <CardTitle tag="h5">{item.projectName}</CardTitle>
                  <CardSubtitle className="mb-2 text-muted" tag="h6">
                    {item.projectStartDate.substring(0, 10)} ~{" "}
                    {item.projectEndDate.substring(0, 10)}
                  </CardSubtitle>
                  <CardText style={{ maxHeight: "90px", minHeight: "90px" }}>
                    {item.projectDescription}
                  </CardText>
                  <Button
                  onClick={e=>projectClick(item.projectIndex)}
                  >프로젝트 보기</Button>
                </CardBody>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default ProjectList;
