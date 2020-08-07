import { Form, Input, Modal } from "antd";

import { FormComponentProps } from "antd/es/form";
import React from "react";

const FormItem = Form.Item;

interface CreateFormProps extends FormComponentProps {
  modalVisible: boolean;
  handleAdd: (fieldsValue: { regexName: string; regexContent: string }) => void;
  handleModalVisible: () => void;
}

const CreateForm: React.FC<CreateFormProps> = props => {
  const { modalVisible, form, handleAdd, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, filedsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(filedsValue);
    });
  };
  return (
    <Modal
      destroyOnClose
      title="New Intent"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 13 }}
        label="Regex Name"
      >
        {form.getFieldDecorator("regexName", {
          rules: [
            {
              required: true,
              message: "please enter atleast five characters！",
              min: 5
            }
          ]
        })(<Input style={{ float: "left" }} placeholder="请输入" />)}
      </FormItem>
      <FormItem
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 13 }}
        label="Regex Content"
      >
        {form.getFieldDecorator("regexContent", {
          rules: [
            {
              required: true,
              message: "please enter atleast five character！",
              min: 5
            }
          ]
        })(<Input placeholder="please enter" />)}
      </FormItem>
    </Modal>
  );
};

export default Form.create<CreateFormProps>()(CreateForm);
