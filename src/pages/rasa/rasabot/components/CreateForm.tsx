import { Form, Input, Modal } from "antd";

import { FormComponentProps } from "antd/es/form";
import React from "react";

const FormItem = Form.Item;

interface CreateFormProps extends FormComponentProps {
  modalVisible: boolean;
  handleAdd: (fieldsValue: { robotName: string }) => void;
  handleModalVisible: () => void;
}
const CreateForm: React.FC<CreateFormProps> = props => {
  const { modalVisible, form, handleAdd, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      destroyOnClose
      title="New Robot"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="Robot Name"
      >
        {form.getFieldDecorator("intentName", {
          rules: [
            {
              required: true,
              message: "Please input more than 6 characters in Robot Name！",
              min: 5
            }
          ]
        })(<Input placeholder="Please input" />)}
      </FormItem>
    </Modal>
  );
};

export default Form.create<CreateFormProps>()(CreateForm);
