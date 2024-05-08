import TechIconCard from "@/components/techIconCard/TechIconCard";
import {
  ApiFilled,
  EditOutlined,
  EllipsisOutlined,
  Html5Filled,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Tag, Typography, Divider } from "antd";
const { Meta } = Card;
const { Title, Paragraph, Text, Link } = Typography;
const gridStyle: React.CSSProperties = {
  width: "25%",
  textAlign: "center",
};
import reactLogo from "@/assets/icons/React.png";
const LandingPage = () => {
  return (
    <>
      <Card
        actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
      >
        <Meta
          avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
          title={
            <div>
              <h1>Shixin Yang</h1>
              <Tag color="geekblue" icon={<Html5Filled />}>
                Intermediate Front-end Developer
              </Tag>
              <Tag color="geekblue" icon={<ApiFilled />}>
                Junior Back-end Developer
              </Tag>
            </div>
          }
          description={
            <div>
              <Typography>
                <Title level={5}>
                  Hello and welcome to my portfolio! With three years of experience in frontend
                  development and one year in backend development, I'm deeply passionate about
                  coding. My primary focus revolves around crafting stable, maintainable, and
                  expandable web applications. Presently, my journey is dedicated to enhancing my
                  skills to evolve into a proficient full-stack developer. Let's explore the
                  exciting world of web development together!
                </Title>

                <Divider />
                <Paragraph>
                  <Title level={5}>PROFESSIONLA IDEAS</Title>
                  <ul>
                    <li>
                      <Link>Self-motivated for improving</Link>
                    </li>
                    <li>
                      <Link>Team-playing to be more productivity</Link>
                    </li>
                    <li>
                      <Link>Coding is mainly about testing and revision</Link>
                    </li>
                    <li>
                      <Link>Fundamentals are more difficult than we thought</Link>
                    </li>
                  </ul>
                </Paragraph>

                <Divider />
                <Card title="Tech Stacks">
                  <Card.Grid style={gridStyle}>
                    <TechIconCard imgSrc={reactLogo} altImgSrc={reactLogo} title="React" />
                  </Card.Grid>
                  <Card.Grid style={gridStyle}>Content</Card.Grid>
                  <Card.Grid style={gridStyle}>Content</Card.Grid>
                  <Card.Grid style={gridStyle}>Content</Card.Grid>
                  <Card.Grid style={gridStyle}>Content</Card.Grid>
                  <Card.Grid style={gridStyle}>Content</Card.Grid>
                  <Card.Grid style={gridStyle}>Content</Card.Grid>
                </Card>
              </Typography>
            </div>
          }
        />
      </Card>
    </>
  );
};

export default LandingPage;
