import { Form, Input, Modal } from 'antd';

import { FormComponentProps } from 'antd/es/form';
import React from 'react';

const FormItem = Form.Item;

interface CreateFormProps extends FormComponentProps {
  modalVisible: boolean;
  handleAdd: (fieldsValue: { responseName: string }) => void;
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
      title="New Response"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 13 }} label="Response Name">
        {form.getFieldDecorator('responseName', {
          rules: [{ required: true, message: '请输入至少一个字符的Response Name！', min: 1 }],
        })(<Input style={{ float: 'left' }} placeholder="请输入" />)}
      </FormItem>
    </Modal>
  );
};

export default Form.create<CreateFormProps>()(CreateForm);
