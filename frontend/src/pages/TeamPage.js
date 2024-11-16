import React from "react";
import { teams } from "../data";
import {
  Link,
  useNavigate,
  useParams,
  createSearchParams,
} from "react-router-dom";
import { Button, Typography, Card, Space, Avatar, Divider } from "antd";
import { isEmpty } from "../utils";

const { Text, Title } = Typography;

export const TeamPage = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const team = teams.find((team) => team.id === parseInt(id));

  if (isEmpty(team)) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Title level={3}>Такой команды не существует!</Title>
        <Button type="primary" onClick={() => navigate(-1)}>
          Назад
        </Button>
      </div>
    );
  }

  const onSearch = () => {
    navigate({
      pathname: `/team-matching/${team.id}`,
      //   search: `${createSearchParams({ team: })}`,
    });
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      {/* Top Action Buttons */}
      <Space style={{ marginBottom: "20px" }}>
        <Button onClick={() => navigate(-1)}>Назад</Button>
        <Button type="primary" onClick={onSearch}>
          🔮 Подобрать сотрудника
        </Button>
      </Space>

      {/* Team Details */}
      <Card
        title={team.name}
        style={{
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          {/* Description */}
          <div>
            <Title level={5}>Description</Title>
            <Text>{team.description}</Text>
          </div>

          {/* Members */}
          <div>
            <Title level={5}>Members ({team.members.length})</Title>
            <Space wrap size="small">
              {team.members.map((member, index) => (
                <Link to={`/employee/${member.id}`}>
                  <Space key={index} direction="vertical" align="center">
                    <Avatar src={member.avatar} size="large">
                      {member.name[0]}
                    </Avatar>
                    <Text>{member.name}</Text>
                  </Space>
                </Link>
              ))}
            </Space>
          </div>

          {/* Divider for further sections */}
          <Divider />
          <div>
            <Title level={5}>Additional Information</Title>
            <Text>This section can include more details or actions.</Text>
          </div>
        </Space>
      </Card>
    </div>
  );
};
