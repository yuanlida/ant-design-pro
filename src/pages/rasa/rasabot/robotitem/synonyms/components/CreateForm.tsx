import { Form, Input, Modal, Select } from "antd";

import { FormComponentProps } from "antd/es/form";
import React from "react";

const FormItem = Form.Item;
// const { Option } = Select;

interface CreateFormProps extends FormComponentProps {
  modalVisible: boolean;
  handleAdd: (fieldsValue: {
    synonymsName: string;
    synonymsContent: string;
  }) => void;
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
      title="New Synonyms"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 13 }}
        label="synonyms Name"
      >
        {form.getFieldDecorator("synonymsName", {
          rules: [
            {
              required: true,
              message: "Please enter at least five characters",
              min: 5
            }
          ]
        })(<Input style={{ float: "left" }} placeholder="please enter" />)}
      </FormItem>
      <FormItem
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 13 }}
        label="synonyms Content"
      >
        {form.getFieldDecorator("synonymsContent", {
          // rules: [{ required: true, message: 'Please enter at least five characters', min: 5 }],
        })(
          <Select
            mode="tags"
            style={{ width: "100%" }}
            placeholder="Please Input."
          ></Select>
        )}
      </FormItem>
    </Modal>
  );
};

export default Form.create<CreateFormProps>()(CreateForm);
