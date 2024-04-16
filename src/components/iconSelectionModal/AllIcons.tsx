import { ThemeType } from "@ant-design/icons-svg/lib/types";
import * as React from "react";
import styled from "styled-components";
import * as AntdIcons from "@ant-design/icons/";
import { Input, Tooltip } from "antd";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { selectIcon } from "@/store/slices/iconSelectionSlice";

// Define the type or interface for the component's props
interface IconSelectionModalProps {
  onModalShowChange: Function;
}

const Container = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  margin: auto;
`;

const Card = styled.div`
  height: 30px;
  margin: 12px 0 16px;
  width: 20%;
  text-align: center;
`;

const NameDescription = styled.p`
  display: block;
  text-align: center;
  transform: scale(0.8);
  font-family: "Lucida Console", Consolas;
  white-space: nowrap;
`;

const allIcons: {
  [key: string]: any;
} = AntdIcons;

const AllIcons: React.FC<IconSelectionModalProps> = ({ onModalShowChange }) => {
  const [currentTheme, setCurrentTheme] = React.useState("Outlined");
  const [currentSearchValue, setCurrentSearchValue] = React.useState("");
  const dispatch = useAppDispatch();

  const handleSelectChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.currentTarget.value as ThemeType;
    setCurrentTheme(value);
  }, []);

  const visibleIconList = React.useMemo(
    () => Object.keys(allIcons).filter((iconName) => iconName.includes(currentTheme)),
    [currentTheme]
  );

  const onInputChange = (e: React.BaseSyntheticEvent) => {
    if (e.target.value) {
      setCurrentSearchValue(e.target.value);
    } else {
      setCurrentSearchValue("");
    }
  };

  const onIconClicked = (iconName: string) => {
    dispatch(selectIcon(iconName));
    onModalShowChange(false);
  };

  return (
    <div style={{ color: "#555" }}>
      <div style={{ textAlign: "center", display: "flex" }}>
        <select name="theme-select" value={currentTheme} onChange={handleSelectChange}>
          <option value="Filled">Filled</option>
          <option value="Outlined">Outlined</option>
          {/* <option value="TwoTone">Two-Tone</option> */}
        </select>

        <Input
          placeholder="Search Icon By Name"
          style={{ margin: "0 15px 0 15px" }}
          onChange={onInputChange}
          allowClear
        />
      </div>
      <Container>
        {visibleIconList.map((iconName) => {
          if (iconName.toLowerCase().includes(currentSearchValue.toLowerCase())) {
            const Component = allIcons[iconName];
            return (
              <Card key={iconName}>
                <Tooltip title={iconName}>
                  <Component style={{ fontSize: "24px" }} onClick={() => onIconClicked(iconName)} />
                </Tooltip>

                {/* <NameDescription>{iconName}</NameDescription> */}
              </Card>
            );
          }
        })}
      </Container>
    </div>
  );
};

export default AllIcons;
