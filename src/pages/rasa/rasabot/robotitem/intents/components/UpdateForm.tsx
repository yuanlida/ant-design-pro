import { TableListItem } from '../data.d';
import Form, { FormComponentProps } from 'antd/es/form';
import { Input, Modal } from 'antd';
import React from 'react';

export interface FormValueType extends Partial<TableListItem> {}

export interface UpdateFormProps extends FormComponentProps {
  handleUpdateModalVisible: (flag?: boolean, formVals?: FormValueType) => void;
  handleUpdate: (values: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
}

const FormItem = Form.Item;

const UpdateForm: React.FC<UpdateFormProps> = props => {
  const { form, updateModalVisible, handleUpdateModalVisible, handleUpdate, values } = props;
  const okHandle = () => {
    form.validateFields((err, filedsValue) => {
      if (err) return;
      form.resetFields();
      handleUpdate(filedsValue);
    });
  };
  return (
    <Modal
      width={640}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title="Update"
      visible={updateModalVisible}
      onCancel={() => handleUpdateModalVisible(false, values)}
      onOk={okHandle}
      afterClose={() => handleUpdateModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="Intent Name">
        {form.getFieldDecorator('intentName', {
          rules: [{ required: true, message: '请输入至少五个字符的Intent Name！', min: 5 }],
          initialValue: values.intentName,
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="Intent Key">
        {form.getFieldDecorator('key', {
          rules: [{ required: true, message: '请输入至少一个字符的Intent Key！', min: 0 }],
          initialValue: values.key!.toString(),
        })(<Input placeholder="请输入" />)}
      </FormItem>
    </Modal>
  );
};

export default Form.create<UpdateFormProps>()(UpdateForm);
