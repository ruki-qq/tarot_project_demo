import React, { useState } from "react";
import {
  Layout,
  Typography,
  Avatar,
  Progress,
  Select,
  Button,
  Spin,
  Alert,
} from "antd";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { isEmpty } from "../utils";
import { getCandidate, getCandidates } from "../business/candidate";
import { getEmployee } from "../business/employee";
import { getOrCreateReport } from "../business/report";

const { Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

const EmployeeMatching = ({ employee, candidates }) => {
  const [report, setReport] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onCandidateChange = (value) => {
    setReport(null);
    setSelectedCandidate(value);
  };

  const onDoMatch = async () => {
    setIsLoading(true);
    const candidate = await getCandidate(selectedCandidate);
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
            <Title level={4}>Сотрудник</Title>
            <Avatar size={120} src={employee.avatar}>
              {employee.full_name[0]}
            </Avatar>
            <Title level={4}>{employee.full_name}</Title>
            <Text type="secondary">{employee.position}</Text>
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
              style={{ width: "100%", marginBottom: "20px" }}
              placeholder="Выберите кандидата"
              onChange={onCandidateChange}
            >
              {candidates.map((candidate) => (
                <Option key={candidate.id} value={candidate.id}>
                  {candidate.full_name}
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
            disabled={selectedCandidate === null}
          >
            🔮 Оценить
          </Button>
        </div>
      </Layout>
    </>
  );
};

export const EmployeeMatchingPage = () => {
  const { id = undefined } = useParams();

  const candidatesQuery = useQuery({
    queryKey: ["candidates"],
    queryFn: async () => getCandidates(),
  });

  const employeeQuery = useQuery({
    queryKey: ["employes", id],
    queryFn: async () => {
      if (!isEmpty(id)) {
        return getEmployee(id);
      }
    },
  });

  const { data: candidates = undefined } = candidatesQuery;
  const { data: employee = undefined } = employeeQuery;

  if (candidatesQuery.isLoading || employeeQuery.isLoading) {
    return <Spin fullscreen />;
  }

  if (
    isEmpty(candidates) ||
    isEmpty(employee) ||
    candidatesQuery.isError ||
    employeeQuery.isError
  ) {
    return <Alert message={"Возникла ошибка при загрузке"} type="error" />;
  }

  return <EmployeeMatching employee={employee} candidates={candidates} />;
};
