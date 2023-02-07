import {Input, Card, CardBody, CardSubtitle, CardTitle, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Button} from "reactstrap";
import Chart from "react-apexcharts";
import React, { useState, useEffect } from "react";

const PmsChart = (props) => {

  console.log('pmschart');
  const name = props.project.projectName

  const [projectDescription,setProjectDescription] = useState(props.project.projectDescription); 

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  console.log('aaa:',projectDescription)
  useEffect(()=>{
    setProjectDescription(props.project.projectDescription)
  },[])

  const [a, setA] = useState(44);
  const [b, setB] = useState(55);
  const [c, setC] = useState(41);
  const [d, setD] = useState(16);
  const [e, setE] = useState(16);
  const optionsLable = [
    "요청: " + a,
    "진행: " + b,
    "피드백: " + c,
    "보류: " + d,
    "완료: " + e,
  ];
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

    options: { labels: optionsLable },
    series: [a, b, c, d, e],
  };

  const projectDesChange = (v) =>{
    setProjectDescription(v.target.value)
  }

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
          ></i>
        </CardTitle>
        <CardSubtitle className="text-muted" tag="h6">
          {props.project.projectStartDate.substring(0, 10)} {` ~ `}
          {props.project.projectEndDate.substring(0, 10)}
        </CardSubtitle>
        <Chart
          type="pie"
          width="75%"
          height="300"
          options={chartoptions.options}
          series={chartoptions.series}
          labels={chartoptions.labels}
          style={{ fontSize: "25px", fontWeight: "bold" }}
        ></Chart>
      </CardBody>
      <Modal isOpen={modal} toggle={toggle} size="lg" >
        <ModalHeader toggle={toggle}>{props.project.projectName}</ModalHeader>
        <ModalBody>
        <Input type="textarea" rows="5" value={projectDescription} onChange={(v)=>projectDesChange(v)}>
        </Input>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            수정
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            취소
          </Button>
        </ModalFooter>
      </Modal>
    </Card>
  );
};

export default PmsChart;
