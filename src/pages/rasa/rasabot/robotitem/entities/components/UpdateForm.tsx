import { TableListItem } from '../data.d';
import Form, { FormComponentProps } from 'antd/es/form';
import { Input, Modal, Select } from 'antd';
import React from 'react';

const { Option } = Select;
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
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="Entity Name">
        {form.getFieldDecorator('entityName', {
          rules: [{ required: true, message: '请输入至少五个字符的Entity Name！', min: 5 }],
          initialValue: values.entityName,
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="Slot Data Type">
        {form.getFieldDecorator('slotDataType', {
          rules: [{ required: true, message: '请输入至少一个字符的Slot Data Type！', min: 3 }],
          initialValue: values.slotDataType,
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

export default Form.create<UpdateFormProps>()(UpdateForm);
