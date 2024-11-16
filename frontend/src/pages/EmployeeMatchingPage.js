import React, { useState } from "react";
import {
  Layout,
  Typography,
  Space,
  List,
  Avatar,
  Progress,
  Select,
  Button,
} from "antd";
import { useQuery } from "@tanstack/react-query";

import { useParams } from "react-router-dom";
import axios from "axios";
import { candidates, employees, teams } from "../data";
import { useQueryParams } from "../hooks";
import { isEmpty } from "../utils";

const { Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

const getReport = async (employee, candidate) => {
  // axios.get(`${API_URL}/oracle/match/p2p`, {
  //     params: {
  //         employee,
  //         candidate,
  //     }
  // })

  //   scores: [
  //     { employee: 0, score: 0.8 },
  //     { employee: 1, score: 0.3 },
  //     { employee: 2, score: 0.1 },
  //   ],

  return {
    employee: employee.id,
    candidate: candidate.id,
    score: Math.random(),
  };
};

const calculateTeamScore = (report) => {
  const totalScore = Object.values(report).reduce((acc, x) => acc + x.score, 0);
  const count = Object.keys(report).length;
  const averageScore = totalScore / count;
  return Math.round(100 * averageScore);
};

const EmployeeMatching = ({ employee, candidates }) => {
  const [report, setReport] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const candidate =
    selectedCandidate !== null ? candidates[selectedCandidate] : null;

  const onCandidateChange = (value) => {
    setSelectedCandidate(value);
  };

  const onDoMatch = async () => {
    const report = await getReport(employee, candidate);
    setReport(report);
  };

  const score = report ? Math.round(100 * report.score) : 0;

  return (
    <Layout style={{ padding: "20px" }}>
      <Content style={{ display: "flex", gap: "20px" }}>
        {/* Single User Large Card */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Title level={4}>Сотрудник</Title>
          <Avatar size={120} src={employee.avatar}>
            {employee.name[0]}
          </Avatar>
          <Title level={4}>{employee.name}</Title>
          <Text type="secondary">{employee.role}</Text>
        </div>

        {/* Column 2: Round Progress Bar */}
        <div style={{ flex: 1, textAlign: "center" }}>
          <Title level={4}>Совпадение</Title>
          <Progress
            type="circle"
            percent={score}
            width={120}
            strokeColor="#1890ff"
          />
        </div>

        {/* Column 3: Candidate Selection */}
        <div style={{ flex: 1 }}>
          <Title level={4}>Кандидат</Title>
          <Select
            style={{ width: "100%" }}
            placeholder="Выберите кандидата"
            onChange={onCandidateChange}
          >
            {candidates.map((candidate) => (
              <Option key={candidate.id} value={candidate.id}>
                {candidate.name}
              </Option>
            ))}
          </Select>
        </div>
      </Content>

      {/* Trigger Button */}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <Button
          type="primary"
          size="large"
          onClick={onDoMatch}
          disabled={selectedCandidate === null}
        >
          🔮 Оценить
        </Button>
      </div>
    </Layout>
  );
};

export const EmployeeMatchingPage = () => {
  const { id = undefined } = useParams();

  const { data: employee = undefined } = useQuery({
    queryKey: [id],
    queryFn: async () => {
      if (!isEmpty(id)) {
        return employees.find((employee) => employee.id === parseInt(id));
      }
    },
  });

  if (isEmpty(employee)) {
    return <div>Fuck</div>;
  }

  return <EmployeeMatching employee={employee} candidates={candidates} />;
};
