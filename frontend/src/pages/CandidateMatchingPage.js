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
import { candidates, employees } from "../data";
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

const CandidateMatching = ({ candidate, employees }) => {
  const [report, setReport] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const employee = !isEmpty(selectedEmployee)
    ? employees[selectedEmployee]
    : null;

  const onEmployeeChange = (value) => {
    setSelectedEmployee(value);
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
          <Title level={4}>Кандидат</Title>
          <Avatar size={120} src={candidate.avatar}>
            {candidate.name[0]}
          </Avatar>
          <Title level={4}>{candidate.name}</Title>
          <Text type="secondary">{candidate.role}</Text>
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
          <Title level={4}>Сотрудник</Title>
          <Select
            style={{ width: "100%" }}
            placeholder="Выберите сотрудника"
            onChange={onEmployeeChange}
          >
            {employees.map((candidate) => (
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
          disabled={selectedEmployee === null}
        >
          🔮 Оценить
        </Button>
      </div>
    </Layout>
  );
};

export const CandidateMatchingPage = () => {
  const { id = undefined } = useParams();

  const { data: candidate = undefined } = useQuery({
    queryKey: [id],
    queryFn: async () => {
      if (!isEmpty(id)) {
        return candidates.find((candidate) => candidate.id === parseInt(id));
      }
    },
  });

  if (isEmpty(candidate)) {
    return <div>Fuck</div>;
  }

  return <CandidateMatching candidate={candidate} employees={employees} />;
};
