import { Tabs } from "antd";
import React, { useState } from "react";
import type { TabsProps } from "antd";
import UseStateHook from "@/components/reactKyesComponents/reactBuiltinHooks/UseStateHook";
import UseEffectHook from "@/components/reactKyesComponents/reactBuiltinHooks/UseEffectHook";
import UseRefHook from "@/components/reactKyesComponents/reactBuiltinHooks/UseRefHook";
import UseMemoHook from "@/components/reactKyesComponents/reactBuiltinHooks/UseMemoHook";
const ReactKeys: React.FC = () => {
  const [currentShowingTab, setCurrentShowingTab] = useState<string>("");
  const onChange = (key: string) => {
    setCurrentShowingTab(key);
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
      children: <UseRefHook activeKey={currentShowingTab} />,
    },
    {
      key: "4",
      label: "useMemo",
      children: <UseMemoHook />,
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
