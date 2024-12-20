import React, { useState } from "react";
import {
  Layout,
  Typography,
  Avatar,
  Progress,
  Select,
  Button,
  Alert,
  Spin,
} from "antd";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { isEmpty } from "../utils";
import { getCandidate } from "../business/candidate";
import { getEmployees, getEmployee } from "../business/employee";
import { getOrCreateReport } from "../business/report";

const { Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

const CandidateMatching = ({ candidate, employees }) => {
  const [report, setReport] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onEmployeeChange = (value) => {
    setReport(null);
    setSelectedEmployee(value);
  };

  const onDoMatch = async () => {
    setIsLoading(true);
    const employee = await getEmployee(selectedEmployee);
    const report = await getOrCreateReport({ employee, candidate });
    setReport(report);
    setIsLoading(false);
  };

  const score = report ? Math.round(100 * report.score) : 0;

  return (
    <>
      {isLoading && <Spin fullscreen />}
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
              {candidate.full_name[0]}
            </Avatar>
            <Title level={4}>{candidate.full_name}</Title>
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
              style={{ width: "100%", marginBottom: "20px" }}
              placeholder="Выберите сотрудника"
              onChange={onEmployeeChange}
            >
              {employees.map((employee) => (
                <Option key={employee.id} value={employee.id}>
                  {employee.full_name}
                </Option>
              ))}
            </Select>

            {report && (
              <div style={{ flex: 1 }}>
                <Text>{report.tarot_reading}</Text>
              </div>
            )}
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
    </>
  );
};

export const CandidateMatchingPage = () => {
  const { id = undefined } = useParams();

  const candidateQuery = useQuery({
    queryKey: ["candidate", id],
    queryFn: async () => {
      if (!isEmpty(id)) {
        return getCandidate(id);
      }
    },
  });

  const employeesQuery = useQuery({
    queryKey: ["employees"],
    queryFn: async () => getEmployees(),
  });

  const { data: candidate = undefined } = candidateQuery;
  const { data: employees = undefined } = employeesQuery;

  if (candidateQuery.isLoading || employeesQuery.isLoading) {
    return <Spin fullscreen />;
  }

  if (
    isEmpty(candidate) ||
    isEmpty(employees) ||
    candidateQuery.isError ||
    employeesQuery.isError
  ) {
    return <Alert message={"Возникла ошибка при загрузке"} type="error" />;
  }

  return <CandidateMatching candidate={candidate} employees={employees} />;
};
