import {
  Avatar,
  Button,
  Tag,
  Card,
  List,
  Space,
  Typography,
  Spin,
  Alert,
} from "antd";
import Search from "antd/es/input/Search";
import { useNavigate } from "react-router-dom";
import { searchEmployee } from "../business";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getEmployees } from "../business/employee";
import { isEmpty } from "../utils";

const { Text, Title } = Typography;

const EmployeeCard = ({ employee, onOpen }) => {
  return (
    <Card
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: "10px",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        marginBottom: "20px",
      }}
    >
      <Space
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        {/* Avatar Section */}
        <Avatar
          size={100}
          src={employee.avatar}
          style={{ marginRight: "20px" }}
        >
          {employee.full_name[0]}
        </Avatar>

        {/* Main Content */}
        <div>
          {/* Employee Name */}
          <Title level={4}>{employee.full_name}</Title>
          <Text type="secondary">{employee.position}</Text>

          {/* Description */}
          <div style={{ marginTop: "15px" }}>
            <Text>{employee.bio}</Text>
          </div>

          {/* Skills Section */}
          <div style={{ marginTop: "10px" }}>
            <Text strong>Hard Skills: </Text>
            <Space wrap>
              {employee.hard_skills.split(", ").map((skill, index) => (
                <Tag color="blue" key={index}>
                  {skill}
                </Tag>
              ))}
            </Space>
          </div>
          <div style={{ marginTop: "10px" }}>
            <Text strong>Soft Skills: </Text>
            <Space wrap>
              {employee.soft_skills.split(", ").map((skill, index) => (
                <Tag color="green" key={index}>
                  {skill}
                </Tag>
              ))}
            </Space>
          </div>
        </div>
      </Space>

      <Space>
        <Button type="primary" onClick={() => onOpen(employee.id)}>
          Подробнее
        </Button>
      </Space>
    </Card>
  );
};

const EmployeesCardList = ({ employees, onOpen }) => {
  const navigate = useNavigate();

  const [search, setSearch] = useState();

  const onSearch = (text) => {
    setSearch(text);
  };

  const onCreateClick = () => {
    navigate(`/employees/new`);
  };

  const filtered = search ? searchEmployee(employees, search) : employees;

  return (
    <div
      style={{
        padding: "20px",
        background: "#f0f2f5",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Space style={{ marginBottom: "20px" }}>
        <Button type="primary" onClick={onCreateClick}>
          Добавить
        </Button>
      </Space>

      <Space style={{ marginBottom: "20px" }}>
        <Search style={{ width: "100%" }} onSearch={onSearch} />
      </Space>

      <List
        itemLayout="vertical"
        dataSource={filtered}
        renderItem={(employee) => (
          <EmployeeCard key={employee.id} employee={employee} onOpen={onOpen} />
        )}
      />
    </div>
  );
};

export const EmployeesPage = () => {
  const navigate = useNavigate();

  const onOpen = (id) => navigate(`/employee/${id}`);

  const {
    data: employees,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => getEmployees(),
  });

  if (isLoading) {
    return <Spin fullscreen />;
  }

  if (isError || isEmpty(employees)) {
    return <Alert message={"Возникла ошибка при загрузке"} type="error" />;
  }

  return <EmployeesCardList employees={employees} onOpen={onOpen} />;
};
