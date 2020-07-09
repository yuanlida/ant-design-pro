import { RegisterNode } from 'gg-editor';
import React from 'react';

// todo by Dalio. Not work well.
export default class ThreadNode extends React.Component<any, any> {
  componentDidMount(): void {
    // const { propsAPI } = this.props;
    // console.log(propsAPI);
  }

  render() {
    const nodeConfig = {
      color: undefined,
      label: undefined,
      state_icon_url: undefined,

      draw(item: any) {
        const group = item.getGraphicGroup();
        const model = item.getModel();
        const width = 140;
        const height = 40;
        const x = -width / 2;
        const y = -height / 2;
        const borderRadius = 2;
        const keyShape = group.addShape('rect', {
          attrs: {
            x,
            y,
            width,
            height,
            radius: borderRadius,
          },
        });
        group.addShape('path', {
          attrs: {
            fill: this.color,
            stroke: this.color,
          },
        });
        group.addShape('text', {
          attrs: {
            text: model.label ? model.label : this.label,
            x: x + 12,
            y: y + 14,
            textAlign: 'start',
            textBaseline: 'top',
            fill: '#fff',
          },
        });
        // 状态 logo
        group.addShape('image', {
          attrs: {
            img: this.state_icon_url,
            x: width / 2 - 24,
            y: y + 12,
            width: 16,
            height: 16,
          },
        });
        return keyShape;
      },
      anchor: [
        [0.5, 0], // 上面边的中点
        [0.5, 1], // 下边边的中点
      ],
    };
    return <RegisterNode name="model-card" config={nodeConfig}></RegisterNode>;
  }
}
