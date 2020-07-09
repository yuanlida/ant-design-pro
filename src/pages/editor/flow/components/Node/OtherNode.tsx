import { RegisterNode } from 'gg-editor';
import React from 'react';

export default class OtherNode extends React.Component<any, any> {
  componentDidMount(): void {}

  render() {
    const NODES = [
      {
        type: 0,
        label: '开始',
        color: '#ffc66a',
        name: 'start-node',
      },
    ];
    return NODES.map(node => (
      <RegisterNode
        key={node.type}
        name={node.name}
        config={{
          label: node.label,
          color: node.color,
        }}
        extend="flow-node"
      />
    ));
  }
}
