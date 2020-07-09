import React, { Component } from 'react';
import { Form, Card, Row, Col, Select, Button, message } from 'antd';
import { connect } from 'dva';
import { RouteComponentProps } from 'react-router';
import { FormComponentProps } from 'antd/es/form';
import { Dispatch, Action } from 'redux';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { StateType } from './model';
import styles from '../../rasabot/style.less';

const FormItem = Form.Item;
const { Option } = Select;

type IProps = {
  key: string | undefined;
};

// type TableListProps = FormComponentProps & RouteComponentProps<IProps>;
interface SettingViewProps extends FormComponentProps, RouteComponentProps<IProps> {
  dispatch: Dispatch<
    Action<'rasaSetting/add' | 'rasaSetting/fetch' | 'rasaSetting/remove' | 'rasaSetting/update'>
  >;
  loading: boolean;
  rasaSetting: StateType;
}

interface SettingViewState {
  formValues: { [key: string]: string };
}

@connect(
  ({
    rasaSetting,
    loading,
  }: {
    rasaSetting: StateType;
    loading: {
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    rasaSetting,
    loading: loading.models.rasaSetting,
  }),
)
class SettingView extends Component<SettingViewProps, SettingViewState> {
  selectMap: Map<string, string> = new Map<string, string>();

  state: SettingViewState = {
    formValues: {},
  };

  componentDidMount(): void {
    const { dispatch } = this.props;
    this.selectMap.set('1', '1 minute');
    this.selectMap.set('2', '2 minute');
    this.selectMap.set('3', '3 minute');
    this.selectMap.set('4', '4 minute');

    dispatch({
      type: 'rasaSetting/fetch',
    });
  }

  handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'rasaSetting/update',
        payload: values,
      });
    });
    message.success('修改完成');
  };

  renderSimpleForm() {
    const { form } = this.props;
    const {
      rasaSetting: { data },
      // loading,
    } = this.props;
    const { delayValue } = data;
    const { getFieldDecorator } = form;

    return (
      <Form onSubmit={this.handleUpdate} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 15 }}
              label="Rasa status check poll interval"
            >
              {getFieldDecorator('delayValue', {
                initialValue: this.selectMap.get(delayValue.toString()),
              })(
                <Select style={{ width: 120 }}>
                  <Option value="1">{this.selectMap.get('1')}</Option>
                  <Option value="2">{this.selectMap.get('2')}</Option>
                  <Option value="3">{this.selectMap.get('3')}</Option>
                  <Option value="4">{this.selectMap.get('4')}</Option>
                </Select>,
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    // const { key } = this.props.match.params;
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}
export default Form.create<SettingViewProps>()(SettingView);
