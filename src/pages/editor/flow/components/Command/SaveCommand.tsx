import { withPropsAPI, RegisterCommand } from 'gg-editor';
import React from 'react';

// onAfterExecuteCommand 之后可以获取命令

class SaveCommand extends React.Component<any, any> {
  componentDidMount(): void {
    const { propsAPI } = this.props;
    console.log(propsAPI);
  }

  render() {
    const { propsAPI } = this.props;
    const { save } = propsAPI;
    const config = {
      queue: true,
      enable() {
        return true;
      },
      execute(): void {
        const chart = save();
        // const selectedNodes = getSelected();
        console.log(JSON.stringify(chart));
        // console.log(selectedNodes);
      },
      back(): void {
        console.log('execute back command!');
      },
      shortcutCodes: [['ArrowLeft'], ['ArrowRight']],
    };
    return <RegisterCommand name="save" config={config}></RegisterCommand>;
  }
}

export default withPropsAPI(SaveCommand);
