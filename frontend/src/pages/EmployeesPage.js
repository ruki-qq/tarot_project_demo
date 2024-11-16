import { Avatar, Button, Tag, Card, List, Space, Typography } from "antd";
import { employees } from "../data";
import { useNavigate } from "react-router-dom";

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
          {employee.name[0]}
        </Avatar>

        {/* Main Content */}
        <div>
          {/* Employee Name */}
          <Title level={4}>{employee.name}</Title>
          <Text type="secondary">{employee.role}</Text>

          {/* Description */}
          <div style={{ marginTop: "15px" }}>
            <Text>{employee.description}</Text>
          </div>



          {/* Skills Section */}
          <div style={{ marginTop: "10px" }}>
            <Text strong>Hard Skills: </Text>
            <Space wrap>
              {employee.hardSkills.map((skill, index) => (
                <Tag color="blue" key={index}>
                  {skill}
                </Tag>
              ))}
            </Space>
          </div>
          <div style={{ marginTop: "10px" }}>
            <Text strong>Soft Skills: </Text>
            <Space wrap>
              {employee.softSkills.map((skill, index) => (
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
  return (
    <div style={{ padding: "20px", background: "#f0f2f5" }}>
      <List
        itemLayout="vertical"
        dataSource={employees}
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
  return <EmployeesCardList employees={employees} onOpen={onOpen} />;
};
