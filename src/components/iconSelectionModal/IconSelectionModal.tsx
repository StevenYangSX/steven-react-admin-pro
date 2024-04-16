import React, { useEffect, useState } from "react";
import { Modal } from "antd";

import AllIcons from "./AllIcons";

// Define the type or interface for the component's props
interface IconSelectionModalProps {
  onModalShowChange: Function;
  iconModalShow: boolean;
}

const IconSelectionModal: React.FC<IconSelectionModalProps> = ({
  onModalShowChange,
  iconModalShow,
}) => {
  const handleCancel = () => {
    onModalShowChange(false);
  };

  return (
    <>
      <Modal open={iconModalShow} title="Icon Selection" onCancel={handleCancel} footer={[]}>
        <div style={{ maxHeight: "400px", overflowY: "auto" }}>
          <AllIcons onModalShowChange={onModalShowChange} />
        </div>
      </Modal>
    </>
  );
};

export default IconSelectionModal;
