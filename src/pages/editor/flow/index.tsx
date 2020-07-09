import { Col, Row } from 'antd';
import GGEditor, { Flow } from 'gg-editor';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import { FormComponentProps } from 'antd/es/form';
import EditorMinimap from './components/EditorMinimap';
import { FlowContextMenu } from './components/EditorContextMenu';
import { FlowDetailPanel } from './components/EditorDetailPanel';
import { FlowItemPanel } from './components/EditorItemPanel';
import { FlowToolbar } from './components/EditorToolbar';
import styles from './index.less';
import SaveCommand from './components/Command/SaveCommand';
import OtherNode from './components/Node/OtherNode';
import CustomEdge from './components/Edge/CustomEdge';
import { RouteComponentProps } from 'react-router';
import { Dispatch, Action } from 'redux';
import { StateType } from './model';

GGEditor.setTrackable(false);

type IProps = {
  key: string | undefined;
};
interface DetailProps extends FormComponentProps, RouteComponentProps<IProps> {
  type?: string;
  dispatch: Dispatch<
    Action<'workFlow/add' | 'workFlow/fetch' | 'workFlow/remove' | 'workFlow/update'>
  >;
  loading: boolean;
  workFlow: StateType;
}

type DetailState = any;
// export default () => (
//   <PageHeaderWrapper
//     content={formatMessage({
//       id: 'editorandflow.description',
//       defaultMessage: 'description',
//     })}
//   >
//     <GGEditor className={styles.editor}>
//       <Row type="flex" className={styles.editorHd}>
//         <Col span={24}>
//           <FlowToolbar />
//         </Col>
//       </Row>
//       <Row type="flex" className={styles.editorBd}>
//         <Col span={4} className={styles.editorSidebar}>
//           <FlowItemPanel />
//         </Col>
//         <Col span={16} className={styles.editorContent}>
//           <Flow className={styles.flow} />
//         </Col>
//         <Col span={4} className={styles.editorSidebar}>
//           <FlowDetailPanel />
//           <EditorMinimap />
//         </Col>
//       </Row>
//       <FlowContextMenu />
//     </GGEditor>
//   </PageHeaderWrapper>
// );
// low-polyline-round
// <Flow className={styles.flow} data={data} graph={{ edgeDefaultShape: 'custom-edge' }}/>

@connect(
  ({
    workFlow,
    loading,
  }: {
    workFlow: StateType;
    loading: {
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    workFlow,
    loading: loading.models.workFlow,
  }),
)
export default class FlowComponent extends React.Component<DetailProps, DetailState> {
  state: DetailState = {};

  ggEditor: GGEditor | null = null;

  componentDidMount(): void {
    const { dispatch } = this.props;
    dispatch({ type: 'workFlow/fetch' });
  }

  render() {
    const {
      workFlow: { data },
    } = this.props;

    return (
      <PageHeaderWrapper
        content={formatMessage({
          id: 'editorandflow.description',
          defaultMessage: 'description',
        })}
      >
        <GGEditor
          className={styles.editor}
          // ref={ge => {
          //   this.ggEditor = ge;
          // }}
        >
          <SaveCommand></SaveCommand>
          <OtherNode></OtherNode>
          <CustomEdge></CustomEdge>
          <Row type="flex" className={styles.editorHd}>
            <Col span={24}>
              <FlowToolbar />
            </Col>
          </Row>
          <Row type="flex" className={styles.editorBd}>
            <Col span={4} className={styles.editorSidebar}>
              <FlowItemPanel />
            </Col>
            <Col span={16} className={styles.editorContent}>
              <Flow className={styles.flow} data={data} />
            </Col>
            <Col span={4} className={styles.editorSidebar}>
              <FlowDetailPanel />
              <EditorMinimap />
            </Col>
          </Row>
          <FlowContextMenu />
        </GGEditor>
      </PageHeaderWrapper>
    );
  }
}

// export default withPropsAPI(FlowComponent);
// export default Form.create<DetailFormProps>()(withPropsAPI(FlowComponent as any));
