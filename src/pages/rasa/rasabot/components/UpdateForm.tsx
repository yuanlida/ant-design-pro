import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Radio,
  Select,
  Steps
} from "antd";
import React, { Component } from "react";

import { FormComponentProps } from "antd/es/form";
import { TableListItem } from "../data.d";

export interface FormValueType extends Partial<TableListItem> {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
}

export interface UpdateFormProps extends FormComponentProps {
  handleUpdateModalVisible: (flag?: boolean, formVals?: FormValueType) => void;
  handleUpdate: (values: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
}
const FormItem = Form.Item;
const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;
const RadioGroup = Radio.Group;

export interface UpdateFormState {
  formVals: FormValueType;
  currentStep: number;
}

class UpdateForm extends Component<UpdateFormProps, UpdateFormState> {
  // static defaultProps = {
  //   handleUpdate: () => {},
  //   handleUpdateModalVisible: () => {},
  //   values: {},
  // };

  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 }
  };

  constructor(props: UpdateFormProps) {
    super(props);

    this.state = {
      formVals: {
        robotName: props.values.robotName,
        // robotName: props.values.robotName,
        key: props.values.key,
        target: "0",
        template: "0",
        type: "1",
        time: "",
        frequency: "month"
      },
      currentStep: 0
    };
  }

  handleNext = (currentStep: number) => {
    const { form, handleUpdate } = this.props;
    const { formVals: oldValue } = this.state;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const formVals = { ...oldValue, ...fieldsValue };
      this.setState(
        {
          formVals
        },
        () => {
          if (currentStep < 2) {
            this.forward();
          } else {
            handleUpdate(formVals);
          }
        }
      );
    });
  };

  backward = () => {
    const { currentStep } = this.state;
    this.setState({
      currentStep: currentStep - 1
    });
  };

  forward = () => {
    const { currentStep } = this.state;
    this.setState({
      currentStep: currentStep + 1
    });
  };

  renderContent = (currentStep: number, formVals: FormValueType) => {
    const { form } = this.props;
    if (currentStep === 1) {
      return [
        <FormItem key="target" {...this.formLayout} label="Choose Machine room">
          {form.getFieldDecorator("target", {
            initialValue: formVals.target
          })(
            <Select style={{ width: "100%" }}>
              <Option value="0">Table 1</Option>
              <Option value="1">Table 2</Option>
            </Select>
          )}
        </FormItem>,
        <FormItem
          key="template"
          {...this.formLayout}
          label="Configuration template"
        >
          {form.getFieldDecorator("template", {
            initialValue: formVals.template
          })(
            <Select style={{ width: "100%" }}>
              <Option value="0">Rule Template 1</Option>
              <Option value="1">Rule Template 2</Option>
            </Select>
          )}
        </FormItem>,
        <FormItem key="type" {...this.formLayout} label="Rule Type">
          {form.getFieldDecorator("type", {
            initialValue: formVals.type
          })(
            <RadioGroup>
              <Radio value="0">Strong</Radio>
              <Radio value="1">Weak</Radio>
            </RadioGroup>
          )}
        </FormItem>
      ];
    }
    if (currentStep === 2) {
      return [
        <FormItem key="time" {...this.formLayout} label="Start time">
          {form.getFieldDecorator("time", {
            rules: [{ required: true, message: "Please choose start time！" }]
          })(
            <DatePicker
              style={{ width: "100%" }}
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="Choose start time"
            />
          )}
        </FormItem>,
        <FormItem
          key="frequency"
          {...this.formLayout}
          label="Scheduling period"
        >
          {form.getFieldDecorator("frequency", {
            initialValue: formVals.frequency
          })(
            <Select style={{ width: "100%" }}>
              <Option value="month">Month</Option>
              <Option value="week">Week</Option>
            </Select>
          )}
        </FormItem>
      ];
    }
    return [
      <FormItem key="name" {...this.formLayout} label="Robot Name">
        {form.getFieldDecorator("name", {
          rules: [{ required: true, message: "Please Input name！" }],
          initialValue: formVals.robotName
        })(<Input placeholder="Please input" />)}
      </FormItem>,
      <FormItem key="desc" {...this.formLayout} label="Robot Explanation">
        {form.getFieldDecorator("desc", {
          rules: [
            {
              required: true,
              message: "Please input more than 5 characters！",
              min: 5
            }
          ],
          initialValue: formVals.robotName
        })(
          <TextArea
            rows={4}
            placeholder="Please input more than 5 characters！"
          />
        )}
      </FormItem>
    ];
  };

  renderFooter = (currentStep: number) => {
    const { handleUpdateModalVisible, values } = this.props;
    if (currentStep === 1) {
      return [
        <Button key="back" style={{ float: "left" }} onClick={this.backward}>
          上一步
        </Button>,
        <Button
          key="cancel"
          onClick={() => handleUpdateModalVisible(false, values)}
        >
          取消
        </Button>,
        <Button
          key="forward"
          type="primary"
          onClick={() => this.handleNext(currentStep)}
        >
          下一步
        </Button>
      ];
    }
    if (currentStep === 2) {
      return [
        <Button key="back" style={{ float: "left" }} onClick={this.backward}>
          上一步
        </Button>,
        <Button
          key="cancel"
          onClick={() => handleUpdateModalVisible(false, values)}
        >
          取消
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={() => this.handleNext(currentStep)}
        >
          完成
        </Button>
      ];
    }
    return [
      <Button
        key="cancel"
        onClick={() => handleUpdateModalVisible(false, values)}
      >
        取消
      </Button>,
      <Button
        key="forward"
        type="primary"
        onClick={() => this.handleNext(currentStep)}
      >
        下一步
      </Button>
    ];
  };

  render() {
    const { updateModalVisible, handleUpdateModalVisible, values } = this.props;
    const { currentStep, formVals } = this.state;

    return (
      <Modal
        width={640}
        bodyStyle={{ padding: "32px 40px 48px" }}
        destroyOnClose
        title="规则配置"
        visible={updateModalVisible}
        footer={this.renderFooter(currentStep)}
        onCancel={() => handleUpdateModalVisible(false, values)}
        afterClose={() => handleUpdateModalVisible()}
      >
        <Steps style={{ marginBottom: 28 }} size="small" current={currentStep}>
          <Step title="Basic Information" />
          <Step title="Location Information" />
          <Step title="production Management" />
        </Steps>
        {this.renderContent(currentStep, formVals)}
      </Modal>
    );
  }
}

export default Form.create<UpdateFormProps>()(UpdateForm);
