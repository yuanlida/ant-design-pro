import React from 'react';
import { Modal } from 'antd';
import ReactJson from 'react-json-view';

const GetIntentsView: React.FC<any> = props => {
  const { intentJsonShow, values, handleModelShow } = props;
  return (
    <Modal
      width={640}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title="Get Intents"
      visible={intentJsonShow}
      onOk={() => handleModelShow()}
      onCancel={() => handleModelShow()}
      afterClose={() => handleModelShow()}
    >
      <div>{values !== undefined ? <ReactJson src={JSON.parse(values)} /> : null}</div>
    </Modal>
  );
};

export default GetIntentsView;
