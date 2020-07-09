import { Form, Input, Modal, Select } from 'antd';

import { FormComponentProps } from 'antd/es/form';
import React from 'react';

const FormItem = Form.Item;
const { Option } = Select;

interface CreateFormProps extends FormComponentProps {
  modalVisible: boolean;
  handleAdd: (fieldsValue: { entityName: string; slotDataType: string }) => void;
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
      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="Entity Name">
        {form.getFieldDecorator('entityName', {
          rules: [{ required: true, message: '请输入至少五个字符的Entity Name！', min: 5 }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="Slot Data Type">
        {form.getFieldDecorator('slotDataType', {
          rules: [{ required: true, message: '请输入至少五个字符的Slot Data Type！', min: 3 }],
        })(
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select a Slot Data Type"
            optionFilterProp="children"
            filterOption={(input, option) => {
              if (option && option.props && option.props.children) {
                return (
                  option.props.children
                    .toString()
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                );
              }
              return false;
            }}
          >
            <Option value="text">text</Option>
            <Option value="bool">bool</Option>
            <Option value="categorical">categorical</Option>
            <Option value="float">float</Option>
            <Option value="list">list</Option>
            <Option value="unfeaturized">unfeaturized</Option>
          </Select>,
        )}
      </FormItem>
    </Modal>
  );
};

export default Form.create<CreateFormProps>()(CreateForm);
