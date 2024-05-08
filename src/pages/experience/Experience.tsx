import { Descriptions, Divider } from "antd";
import type { DescriptionsProps } from "antd";
import { Image, Tag } from "antd";
import adminDeliveryImg from "@/assets/images/unione-admin-delivery.png";
import adminReportImg from "@/assets/images/unione-admin-report.png";
const itemsUnione: DescriptionsProps["items"] = [
  {
    label: "Compony",
    children: (
      <a href="https://unionefoods.com/" target="_blank">
        Unione Food Group Inc.
      </a>
    ),
  },
  {
    label: "Position",
    children: "Full-stack Developer",
  },
  {
    label: "Time",
    children: "2021-11 ~ 2023-10",
  },
  {
    label: "Overview",
    span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 },
    children: (
      <>
        <ul>
          <li>
            Stack: <Tag color="processing">Uni-app</Tag> <Tag color="processing">Vue</Tag>
            <Tag color="processing">Vuex</Tag>
            <Tag color="processing">Php</Tag> <Tag color="processing">ThinkPhp</Tag>
            <Tag color="processing">Springboot</Tag>
          </li>
          <li>
            Developed and maintained multi-platform websites and mobile apps for clients, leveraging
            Uni-app, Vue, and Vuex to ensure seamless user experiences across various devices and
            platforms.
          </li>
          <li>
            Designed and implemented an intuitive and efficient admin site for internal company use,
            utilizing Vue.js and View Design.
          </li>
          <li>
            Played a key role in improving the performance of web applications through diligent
            optimization efforts and adherence to best practices.
          </li>
          <li>
            Collaborated closely with backend developers and tech leader, contributed efferts on
            Restful-API development when necessary.
          </li>
        </ul>
      </>
    ),
  },
  {
    label: "Accomplishment",
    span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 },
    children: (
      <>
        <ul>
          <li>
            Successfully built and deployed a multi-platform website and mobile app solution,
            enhancing accessibility and user engagement for clients.
          </li>
          <li>
            Developed an intuitive admin site with comprehensive functionality, streamlining
            internal processes and facilitating efficient management of client-side web activities.
          </li>
          <li>
            Implemented performance improvements resulting in enhanced speed and responsiveness
            across web platforms, contributing to improved user satisfaction and retention.
          </li>
          <li>
            Tailored the admin site to meet the specific needs of different departments, enhancing
            workflow efficiency and productivity company-wide.
          </li>
        </ul>
      </>
    ),
  },
];

const itemsLuculent: DescriptionsProps["items"] = [
  {
    label: "Compony",
    children: (
      <a href="https://www.luculent.net/" target="_blank">
        Luculent
      </a>
    ),
  },
  {
    label: "Position",
    children: "Frontend Developer",
  },
  {
    label: "Time",
    children: "2020-04 ~ 2021-09",
  },
  {
    label: "Overview",
    span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 },
    children: (
      <>
        <ul>
          <li>
            Stack: <Tag color="processing">React</Tag> <Tag color="processing">Redux</Tag>
            <Tag color="processing">Echarts</Tag>
          </li>
          <li>
            Developed and maintained a data visualization web for "Smart City Command Center of
            Chifeng City", leveraging Uni-app, Vue, and Vuex to ensure seamless user experiences
            across various devices and platforms.
          </li>
          <li>
            Designed and implemented an intuitive and efficient admin site for internal company use,
            utilizing Vue.js and View Design.
          </li>
          <li>
            Played a key role in improving the performance of web applications through diligent
            optimization efforts and adherence to best practices.
          </li>
          <li>
            Collaborated closely with backend developers and tech leader, contributed efferts on
            Restful-API development when necessary.
          </li>
        </ul>
      </>
    ),
  },
  {
    label: "Accomplishment",
    span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 },
    children: (
      <>
        <ul>
          <li>
            Successfully built and deployed a multi-platform website and mobile app solution,
            enhancing accessibility and user engagement for clients.
          </li>
          <li>
            Developed an intuitive admin site with comprehensive functionality, streamlining
            internal processes and facilitating efficient management of client-side web activities.
          </li>
          <li>
            Implemented performance improvements resulting in enhanced speed and responsiveness
            across web platforms, contributing to improved user satisfaction and retention.
          </li>
          <li>
            Tailored the admin site to meet the specific needs of different departments, enhancing
            workflow efficiency and productivity company-wide.
          </li>
        </ul>
      </>
    ),
  },
];
const Experience = () => {
  return (
    <div>
      <Descriptions
        bordered
        column={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 3, xxl: 3 }}
        items={itemsUnione}
        title="Frontend Developer | Unione Food Group Inc"
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          marginTop: "15px",
        }}
      >
        <div>
          <iframe src="https://www.unionefs.com/" style={{ height: "650px" }}></iframe>
        </div>
        <div style={{ marginTop: "26px" }}>
          <Image.PreviewGroup
            preview={{
              onChange: (current, prev) =>
                console.log(`current index: ${current}, prev index: ${prev}`),
            }}
          >
            <Image width={200} src={adminDeliveryImg} />
            <Image width={200} src={adminReportImg} />
          </Image.PreviewGroup>
        </div>
      </div>
      <Divider />
      <Descriptions
        bordered
        column={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 3, xxl: 3 }}
        items={itemsLuculent}
        title="Frontend Developer | Luculent CHIFENG"
      />
    </div>
  );
};

export default Experience;
