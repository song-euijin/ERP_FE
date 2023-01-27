import React, { useState, useEffect } from "react";
import customAxios from "../../components/axios/axios";
import { Col, Form, Label, Row, Button, Input, FormGroup } from "reactstrap";
import { DatePicker } from "reactstrap-date-picker";
import axios from "axios";

const Starter = () => {
  const [startDate, setStartDate] = useState(new Date().toISOString());
  const [endDate, setEndDate] = useState(new Date().toISOString());
  const [fmtstartDate, setFmtstartDate] = useState(undefined);

  const handleChange = (startDate, formattedstartDate) => {
    setStartDate(startDate);
    setFmtstartDate(formattedstartDate);
  };
  const handleChange2 = (endDate, formattedstartDate) => {
    setEndDate(endDate);
    setFmtstartDate(formattedstartDate);
  };

  const createProject = () => {
    if (startDate > endDate) {
      alert("프로젝트 시작일자와 마감일자 형식이 올바르지 않습니다.");
      return;
    }

    customAxios({
      url:"/createProject.do",
      method:"POST",
      data:{
        foo:'diary',
        startData:startDate,
        endDate:endDate
      }
    }).then(re=>{
      alert(re.data);
    })



  }

  useEffect(() => {}, [fmtstartDate]);

  return (
    <Form md={6}>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="projectName">Project Name</Label>
            <Input
              id="projectName"
              name="projectName"
              placeholder="프로젝트 이름을 입력해주세요."
              type="text"
            />
          </FormGroup>
        </Col>
      </Row>

      <FormGroup>
        <Label for="projectDescription">Project Description</Label>
        <Input
          type="textarea"
          id="projectDescription"
          name="projectDescription"
          rows="5"
          placeholder="프로젝트 설명"
          style={{ resize: "none" }}
        />
      </FormGroup>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="projectStartDate">프로젝트 시작일자</Label>
            <DatePicker
              id="projectStartDate"
              onChange={(v, f) => handleChange(v, f)}
              value={startDate}
              dateFormat="YYYY/MM/DD"
              monthLabels={[
                "1월",
                "2월",
                "3월",
                "4월",
                "5월",
                "6월",
                "7월",
                "8월",
                "9월",
                "10월",
                "11월",
                "12월",
              ]}
              showClearButton={false}
              showTodayButton={true}
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="projectEndDate">프로젝트 마감일자</Label>
            <DatePicker
              id="projectEndDate"
              onChange={(v, f) => handleChange2(v, f)}
              value={endDate}
              dateFormat="YYYY/MM/DD"
              minDate={startDate}
              monthLabels={[
                "1월",
                "2월",
                "3월",
                "4월",
                "5월",
                "6월",
                "7월",
                "8월",
                "9월",
                "10월",
                "11월",
                "12월",
              ]}
              showClearButton={false}
              showTodayButton={true}
            />
          </FormGroup>
        </Col>
      </Row>
      <Button onClick={createProject}>프로젝트 생성</Button>
    </Form>
  );
};

export default Starter;
