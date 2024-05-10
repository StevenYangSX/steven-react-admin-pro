import TechIconCard from "@/components/techIconCard/TechIconCard";
import { useEffect, useRef, useState } from "react";
import { ApiFilled, Html5Filled } from "@ant-design/icons";
import { Card, Tag, Typography, Divider, Button, Row, Tooltip } from "antd";
const { Meta } = Card;
const { Title, Paragraph, Link } = Typography;

import reactLogo from "@/assets/icons/React.png";
import reduxLogo from "@/assets/icons/Redux.png";
import vueLogo from "@/assets/icons/Vue.js.png";
import javascriptLogo from "@/assets/icons/JavaScript.png";
import typescirptLogo from "@/assets/icons/TypeScript.png";
import webpackLogo from "@/assets/icons/Webpack.png";
import javaLogo from "@/assets/icons/Java.png";
import phpLogo from "@/assets/icons/PHP.png";
import springLogo from "@/assets/icons/Spring.png";
import mysqlLogo from "@/assets/icons/MySQL.png";
import dockerLogo from "@/assets/icons/Docker.png";
import jestLogo from "@/assets/icons/Jest.png";

import gitHubLogo from "@/assets/icons/GitHub.png";
import linkedLogo from "@/assets/icons/LinkedIn.png";

import ResumeLogo from "@/assets/icons/Resume.png";

const LandingPage = () => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [elementWidth, setElementWidth] = useState("25%");
  const [mobile, setMobile] = useState(false);
  let gridStyle: React.CSSProperties = {
    width: elementWidth,
    textAlign: "center",
  };
  useEffect(() => {
    // Update width on window resize
    const handleResize = () => {
      if (elementRef.current) {
        const width = elementRef.current.getBoundingClientRect().width;
        if (width >= 1000) {
          setElementWidth("25%");
          setMobile(false);
        }
        if (width < 1000 && width >= 600) {
          setElementWidth("33.33%");
          setMobile(false);
        }
        if (width < 600 && width >= 400) {
          setElementWidth("50%");
          setMobile(false);
        }
        if (width < 400) {
          setElementWidth("100%");
          setMobile(true);
        }
      }
    };
    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleButtonIconClicked = (buttonId: number) => {
    switch (buttonId) {
      case 0:
        // Open google.ca in a new tab
        window.open("https://github.com/StevenYangSX", "_blank");
        return;
      case 1:
        // Open google.ca in a new tab
        window.open("https://www.linkedin.com/in/steven-yang-30063a193/", "_blank");
        return;
      case 2:
        // Open google.ca in a new tab
        window.open(
          "https://drive.google.com/file/d/1IsTa0A1nxrmkOLrq33W1-_GDj6HO_T12/view?usp=drive_link",
          "_blank"
        );
        return;
    }
  };
  return (
    <>
      <Card>
        <Meta
          title={
            <div>
              <Row>
                <h1>Steven Yang</h1>
                <div
                  style={{
                    marginLeft: "30px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Tooltip title="Github">
                    <Button
                      type="text"
                      shape="circle"
                      onClick={() => handleButtonIconClicked(0)}
                      icon={<img src={gitHubLogo} style={{ width: "100%", height: "100%" }} />}
                    />
                  </Tooltip>
                </div>

                <div
                  style={{
                    marginLeft: "30px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Tooltip title="Linkedin">
                    <Button
                      type="text"
                      shape="circle"
                      onClick={() => handleButtonIconClicked(1)}
                      icon={<img src={linkedLogo} style={{ width: "100%", height: "100%" }} />}
                    />
                  </Tooltip>
                </div>

                <div
                  style={{
                    marginLeft: "30px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Tooltip title="Resume">
                    <Button
                      type="text"
                      shape="circle"
                      onClick={() => handleButtonIconClicked(2)}
                      icon={<img src={ResumeLogo} style={{ width: "100%", height: "100%" }} />}
                    />
                  </Tooltip>
                </div>
              </Row>
              {mobile ? (
                <div
                  style={{
                    marginTop: "16px",
                    marginBottom: "16px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Tag
                    color="geekblue"
                    style={{
                      marginTop: "16px",
                      width: "200px",
                    }}
                  >
                    Intermediate Frontend Developer
                  </Tag>
                  <Tag
                    color="geekblue"
                    style={{
                      marginTop: "16px",
                      width: "200px",
                    }}
                  >
                    Junior Backend Developer
                  </Tag>
                </div>
              ) : (
                <div
                  style={{
                    marginTop: "16px",
                    marginBottom: "16px",
                    display: "flex",
                  }}
                >
                  <Tag
                    color="geekblue"
                    icon={<Html5Filled />}
                    style={{
                      marginTop: "16px",
                    }}
                  >
                    Intermediate Frontend Developer
                  </Tag>
                  <Tag
                    color="geekblue"
                    icon={<ApiFilled />}
                    style={{
                      marginTop: "16px",
                    }}
                  >
                    Junior Backend Developer
                  </Tag>
                </div>
              )}
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
                <Card title="Tech Stacks" ref={elementRef}>
                  <Card.Grid style={gridStyle}>
                    <TechIconCard imgSrc={reactLogo} altImgSrc={reactLogo} title="React" />
                  </Card.Grid>
                  <Card.Grid style={gridStyle}>
                    <TechIconCard imgSrc={reduxLogo} altImgSrc={reduxLogo} title="Redux" />
                  </Card.Grid>
                  <Card.Grid style={gridStyle}>
                    <TechIconCard imgSrc={vueLogo} altImgSrc={vueLogo} title="Vue" />
                  </Card.Grid>
                  <Card.Grid style={gridStyle}>
                    <TechIconCard
                      imgSrc={javascriptLogo}
                      altImgSrc={javascriptLogo}
                      title="Javascript"
                    />
                  </Card.Grid>
                  <Card.Grid style={gridStyle}>
                    <TechIconCard
                      imgSrc={typescirptLogo}
                      altImgSrc={typescirptLogo}
                      title="Typescirpt"
                    />
                  </Card.Grid>
                  <Card.Grid style={gridStyle}>
                    <TechIconCard imgSrc={jestLogo} altImgSrc={jestLogo} title="Jest" />
                  </Card.Grid>
                  <Card.Grid style={gridStyle}>
                    <TechIconCard imgSrc={webpackLogo} altImgSrc={webpackLogo} title="Webpack" />
                  </Card.Grid>
                  <Card.Grid style={gridStyle}>
                    <TechIconCard imgSrc={javaLogo} altImgSrc={javaLogo} title="Java" />
                  </Card.Grid>
                  <Card.Grid style={gridStyle}>
                    <TechIconCard imgSrc={phpLogo} altImgSrc={phpLogo} title="Php" />
                  </Card.Grid>
                  <Card.Grid style={gridStyle}>
                    <TechIconCard imgSrc={springLogo} altImgSrc={springLogo} title="Springboot" />
                  </Card.Grid>
                  <Card.Grid style={gridStyle}>
                    <TechIconCard imgSrc={mysqlLogo} altImgSrc={mysqlLogo} title="My SQL" />
                  </Card.Grid>
                  <Card.Grid style={gridStyle}>
                    <TechIconCard imgSrc={dockerLogo} altImgSrc={dockerLogo} title="Docker" />
                  </Card.Grid>
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
