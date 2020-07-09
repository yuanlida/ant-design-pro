import { Card, Descriptions } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { Component } from 'react';

import { Dispatch } from 'redux';
import { connect } from 'dva';
import { ItemData } from './data.d';
import styles from './style.less';

@connect(
  ({
    RobtItemModel,
    loading,
  }: {
    RobtItemModel: ItemData;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    RobtItemModel,
    loading: loading.effects['RobtItemModel/fetchAdvanced'],
  }),
)
class RobtItemView extends Component<
  { loading: boolean; RobtItemModel: ItemData; dispatch: Dispatch<any> },
  any
> {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'RobtItemModel/fetchAdvanced',
    });
  }

  render() {
    const { RobtItemModel } = this.props;
    const { robot } = RobtItemModel;
    return (
      <PageHeaderWrapper title="Robot Content">
        <Card>
          <Descriptions className={styles.headerList} size="small" column={2}>
            <Descriptions.Item label="key">{robot.key}</Descriptions.Item>
            <Descriptions.Item label="RobotName">{robot.robotName}</Descriptions.Item>
            <Descriptions.Item label="MachineRoom">{robot.machineroom}</Descriptions.Item>
            <Descriptions.Item label="Location">{robot.location}</Descriptions.Item>
            <Descriptions.Item label="UpdateAt">{robot.updatedAt}</Descriptions.Item>
            <Descriptions.Item label="Memo">{robot.memo}</Descriptions.Item>
          </Descriptions>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default RobtItemView;
