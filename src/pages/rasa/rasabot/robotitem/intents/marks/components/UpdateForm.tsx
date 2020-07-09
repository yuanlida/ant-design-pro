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
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title="Update"
      visible={updateModalVisible}
      onCancel={() => handleUpdateModalVisible(false, values)}
      onOk={okHandle}
      afterClose={() => handleUpdateModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="Mark Entity">
        {form.getFieldDecorator('markEntity', {
          rules: [{ required: true, message: '请输入至少五个字符的Mark Entity！', min: 1 }],
          initialValue: values.markEntity,
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="Mark Content">
        {form.getFieldDecorator('markContent', {
          rules: [{ required: true, message: '请输入至少一个字符的Mark Content！', min: 1 }],
          initialValue: values.markContent,
        })(<Input placeholder="请输入" />)}
      </FormItem>
    </Modal>
  );
};

export default Form.create<UpdateFormProps>()(UpdateForm);
