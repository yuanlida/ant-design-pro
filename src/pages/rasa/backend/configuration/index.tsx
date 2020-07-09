import React, { Component } from 'react';
import { Form, Card } from 'antd';
import { connect } from 'dva';
import { RouteComponentProps } from 'react-router';
import { FormComponentProps } from 'antd/es/form';
import { Dispatch, Action } from 'redux';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { StateType } from './model';
import ReactJson from 'react-json-view';

type IProps = {
  key: string | undefined;
};

// type TableListProps = FormComponentProps & RouteComponentProps<IProps>;
interface ConfigviewProps extends FormComponentProps, RouteComponentProps<IProps> {
  dispatch: Dispatch<
    Action<'rasaConfig/add' | 'rasaConfig/fetch' | 'rasaConfig/remove' | 'rasaConfig/update'>
  >;
  loading: boolean;
  rasaConfig: StateType;
}

interface ConfigviewState {
  item: string;
}

@connect(
  ({
    rasaConfig,
    loading,
  }: {
    rasaConfig: StateType;
    loading: {
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    rasaConfig,
    loading: loading.models.rasaConfig,
  }),
)
class ConfigView extends Component<ConfigviewProps, ConfigviewState> {
  state: ConfigviewState = {
    item: '',
  };

  componentDidMount(): void {
    const { dispatch } = this.props;
    dispatch({
      type: 'rasaConfig/fetch',
    });
  }

  render() {
    // const { key } = this.props.match.params;
    const {
      rasaConfig: { data },
      // loading,
    } = this.props;

    const { item } = data;

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div>{item !== '' ? <ReactJson src={JSON.parse(item)} /> : null}</div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}
export default Form.create<ConfigviewProps>()(ConfigView);
