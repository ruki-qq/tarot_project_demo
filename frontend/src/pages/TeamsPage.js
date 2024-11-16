import { Avatar, Button, Card, List, Space, Typography } from "antd";
import React from "react";
import { teams } from "../data";
import { useNavigate } from "react-router-dom";
import { searchTeam } from "../business";
import { useState } from "react";
import Search from "antd/es/input/Search";

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
          <Text type="secondary">Размер команды: {team.members.length}</Text>
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
          Подробнее
        </Button>
      </Space>
    </Card>
  );
};

const TeamCardList = ({ teams, onOpen }) => {
  const navigate = useNavigate();

  const [search, setSearch] = useState();

  const onSearch = (text) => {
    setSearch(text);
  };

  const onCreateClick = () => {
    navigate(`/teams/new`);
  };

  const filtered = search ? searchTeam(teams, search) : teams;

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
