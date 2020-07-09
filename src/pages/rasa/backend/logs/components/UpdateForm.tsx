import { TableListItem } from "../data.d";
import Form, { FormComponentProps } from "antd/es/form";
import { Input, Modal } from "antd";
import React from "react";

export interface FormValueType extends Partial<TableListItem> {}

export interface UpdateFormProps extends FormComponentProps {
  handleUpdateModalVisible: (flag?: boolean, formVals?: FormValueType) => void;
  handleUpdate: (values: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
}

const FormItem = Form.Item;

const UpdateForm: React.FC<UpdateFormProps> = props => {
  const {
    form,
    updateModalVisible,
    handleUpdateModalVisible,
    handleUpdate,
    values
  } = props;
  const { key } = values;
  const okHandle = () => {
    form.validateFields((err, filedsValue) => {
      if (err) return;
      form.resetFields();
      handleUpdate({ key, ...filedsValue });
    });
  };
  return (
    <Modal
      width={640}
      bodyStyle={{ padding: "32px 40px 48px" }}
      destroyOnClose
      title="Update"
      visible={updateModalVisible}
      onCancel={() => handleUpdateModalVisible(false, values)}
      onOk={okHandle}
      afterClose={() => handleUpdateModalVisible()}
    >
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="Regex Name"
      >
        {form.getFieldDecorator("regexName", {
          rules: [{ required: true, message: "regex Name！", min: 5 }],
          initialValue: values.regexName
        })(<Input placeholder="Please input" />)}
      </FormItem>
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="Regex Content"
      >
        {form.getFieldDecorator("regexContent", {
          rules: [
            {
              required: true,
              message: "Please enter regex Content more than 5 characters ！",
              min: 5
            }
          ],
          initialValue: values.regexContent
        })(<Input placeholder="Please input" />)}
      </FormItem>
    </Modal>
  );
};

export default Form.create<UpdateFormProps>()(UpdateForm);
