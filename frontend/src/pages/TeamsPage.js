import { Avatar, Button, Card, List, Space, Typography } from "antd";
import React from "react";
import { teams } from "../data";
import { useNavigate } from "react-router-dom";

const { Text, Title } = Typography;

const TeamCard = ({ team, onOpen }) => {
  return (
    <Card
      style={{
        marginBottom: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Space direction="vertical" style={{ width: "100%" }}>
        {/* Team Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Title level={4} style={{ margin: 0 }}>
            {team.name}
          </Title>
          <Text type="secondary">{team.members.length} Members</Text>
        </div>

        {/* Description */}
        <Text>{team.description}</Text>

        {/* Member Avatars */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {team.members.slice(0, 5).map((member, index) => (
            <Avatar
              key={index}
              src={member.avatar}
              size="small"
              style={{
                backgroundColor: "#87d068",
              }}
            >
              {member.name[0]}
            </Avatar>
          ))}
          {team.members.length > 5 && (
            <Text type="secondary">+{team.members.length - 5}</Text>
          )}
        </div>

        {/* Open Button */}
        <Button
          type="primary"
          onClick={() => onOpen(team.id)}
          style={{ marginTop: "10px" }}
        >
          Open
        </Button>
      </Space>
    </Card>
  );
};

const TeamCardList = ({ teams, onOpen }) => {
  return (
    <div style={{ padding: "20px", background: "#f0f2f5" }}>
      <List
        itemLayout="vertical"
        dataSource={teams}
        renderItem={(team) => (
          <TeamCard key={team.id} team={team} onOpen={onOpen} />
        )}
      />
    </div>
  );
};

export const TeamsPage = () => {
  const navigate = useNavigate();

  const onOpen = (id) => {
    navigate(`/team/${id}`);
  };

  return <TeamCardList teams={teams} onOpen={onOpen} />;
};
