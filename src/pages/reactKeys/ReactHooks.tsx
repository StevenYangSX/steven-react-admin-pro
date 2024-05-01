import { Divider, Tabs } from "antd";
import React from "react";
import type { TabsProps } from "antd";
import UseStateHook from "@/components/reactKyesComponents/reactBuiltinHooks/UseStateHook";
import UseEffectHook from "@/components/reactKyesComponents/reactBuiltinHooks/UseEffectHook";
const ReactKeys: React.FC = () => {
  const onChange = (key: string) => {
    console.log(key);
  };
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "useState",
      children: <UseStateHook />,
    },
    {
      key: "2",
      label: "useEffect",
      children: <UseEffectHook />,
    },
    {
      key: "3",
      label: "useRef",
      children: "Content of Tab Pane 3",
    },
    {
      key: "4",
      label: "useMemo",
      children: "Content of Tab Pane 3",
    },
    {
      key: "5",
      label: "useCallback",
      children: "Content of Tab Pane 3",
    },
    {
      key: "6",
      label: "useContext",
      children: "Content of Tab Pane 3",
    },
    {
      key: "7",
      label: "useReducer",
      children: "Content of Tab Pane 3",
    },
    {
      key: "8",
      label: "useLayoutEffect",
      children: "Content of Tab Pane 3",
    },
  ];
  return (
    <>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </>
  );
};

export default ReactKeys;
