import React from "react";
import { Button, Form, FormInstance } from "antd";

interface SubmitButtonProps {
  form: FormInstance;
  formButtonType: "button" | "submit" | "reset" | undefined;
  buttonClickFunction: Function;
  confirmLoading: boolean;
}

const CustomFormButton: React.FC<React.PropsWithChildren<SubmitButtonProps>> = ({
  form,
  children,
  formButtonType,
  buttonClickFunction,
  confirmLoading,
}) => {
  const [submittable, setSubmittable] = React.useState<boolean>(false);

  // Watch all values
  const values = Form.useWatch([], form);

  React.useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);

  React.useEffect(() => {
    console.log("chjeck loading....", confirmLoading);
  }, [confirmLoading]);

  return (
    <Button
      type="primary"
      htmlType={formButtonType}
      disabled={!submittable}
      onClick={() => buttonClickFunction}
      loading={confirmLoading}
    >
      {children}
    </Button>
  );
};

export default CustomFormButton;
