import {
  Input,
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";
import {  useNavigate } from "react-router-dom";
import Chart from "react-apexcharts";
import React, { useState, useEffect } from "react";
import customAxios from "../../components/axios/axios";



const PmsChart = (props) => {

  const navigate = useNavigate();
  const [projectDescription, setProjectDescription] = useState(
    props.project.projectDescription
  );

  const [deleteModal, setDeleteMoadl] = useState(false);

  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
    setProjectDescription(props.project.projectDescription);
  };

  const deleteToggle = () => {
    setDeleteMoadl(!deleteModal);
  };
  const deleteProject = () =>{
    customAxios({
      url:'deleteProject.do',
      method:"POST",
      params:{
        projectIndex: props.project.projectIndex,
      }
    }).then((re)=>{
      console.log(re.data)
      navigate('/PMS/ProjectList');
    })
  };

  const updateProject = () => {
    customAxios({
      url: "/updateProject.do",
      method: "POST",
      params: {
        projectIndex: props.project.projectIndex,
        projectDescription: projectDescription,
      },
    }).then((re) => {
      console.log(re.data);
      props.setProject({
        ...props.project,
        projectIndex: re.data.projectIndex,
        projectName: re.data.projectName,
        projectDescription: re.data.projectDescription,
        projectStartDate: re.data.projectStartDate,
        projectEndDate: re.data.projectEndDate,
      });
      setModal(!modal);
    });
  };

  useEffect(() => {
    setProjectDescription(props.project.projectDescription);
  }, []);

  const [a, setA] = useState(44);
  const [b, setB] = useState(55);
  const [c, setC] = useState(41);
  const [d, setD] = useState(16);
  const [e, setE] = useState(16);
  const optionsLable = ["요청: ", "진행: ", "피드백: ", "보류: ", "완료: "];
  const Chartcolors = ["#369789", "#369789", "#154112", "#369789", "#369789"];
  const chartoptions = {
    // series: [
    //   {
    //     name: "Iphone 13",
    //     data: [0, 31, 40, 28, 51, 42, 109, 100],
    //   },
    //   {
    //     name: "Oneplue 9",
    //     data: [0, 11, 32, 45, 32, 34, 52, 41],
    //   },
    // ],
    // options: {
    //   chart: {
    //     type: "area",
    //   },
    //   dataLabels: {
    //     enabled: false,
    //   },
    //   grid: {
    //     strokeDashArray: 3,
    //   },

    //   stroke: {
    //     curve: "smooth",
    //     width: 1,
    //   },
    //   xaxis: {
    //     categories: [
    //       "Jan",
    //       "Feb",
    //       "March",
    //       "April",
    //       "May",
    //       "June",
    //       "July",
    //       "Aug",
    //     ],
    //   },
    // },

    options: {
      labels: optionsLable,
      colors: ["#232312", "#992211", "#3721de", "#13d8aa", "#009121"],
      grid: {
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        },
      },
      plotOptions: {
        bar: {
          distributed: true,
          horizontal: false,
          barHeight: "85%",
        },
      },
    },
    series: [
      {
        data: [a, b, c, d, e],
      },
    ],
  };

  const projectDesChange = (v) => {
    setProjectDescription(v.target.value);
  };

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h4">
          {props.project.projectName}
          <i
            className="bi bi-brush"
            style={{
              position: "absolute",
              top: 10,
              right: 50,
              cursor: "pointer",
            }}
            onClick={toggle}
          ></i>
          <i
            className="bi bi-trash"
            style={{
              position: "absolute",
              top: 10,
              right: 20,
              cursor: "pointer",
            }}
            onClick={deleteToggle}
          ></i>
        </CardTitle>
        <CardSubtitle className="text-muted" tag="h6">
          {props.project.projectStartDate.substring(0, 10)} {` ~ `}
          {props.project.projectEndDate.substring(0, 10)}
        </CardSubtitle>
        <Chart
          type="bar"
          width="80%"
          height="300"
          options={chartoptions.options}
          series={chartoptions.series}
          style={{ fontSize: "25px", fontWeight: "bold" }}
        ></Chart>
      </CardBody>
      <Modal isOpen={modal} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>{props.project.projectName}</ModalHeader>
        <ModalBody>
          <Input
            type="textarea"
            rows="5"
            value={projectDescription}
            onChange={(v) => projectDesChange(v)}
          ></Input>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={updateProject}>
            수정
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            취소
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={deleteModal} toggle={deleteToggle} size="mm">
        <ModalHeader toggle={deleteToggle}>
          "{props.project.projectName}" 프로젝트를 삭제하겠습니까?
        </ModalHeader>
        <ModalFooter>
          <Button color="primary" onClick={deleteProject}>
            삭제
          </Button>{" "}
          <Button color="secondary" onClick={deleteToggle}>
            취소
          </Button>
        </ModalFooter>
      </Modal>
    </Card>
  );
};

export default PmsChart;
