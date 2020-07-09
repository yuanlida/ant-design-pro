import { Command } from 'gg-editor';
import React from 'react';
import { Tooltip, Icon } from 'antd';
import IconFont from '../../common/IconFont';
import styles from './index.less';

const upperFirst = (str: string) =>
  str.toLowerCase().replace(/( |^)[a-z]/g, (l: string) => l.toUpperCase());

interface ToolbarButtonProps {
  command: string;
  icon?: string;
  text?: string;
}
const ToolbarButton: React.FC<ToolbarButtonProps> = props => {
  const { command, icon, text } = props;
  return (
    <Command name={command}>
      <Tooltip
        title={text || upperFirst(command)}
        placement="bottom"
        overlayClassName={styles.tooltip}
      >
        {icon !== 'save' ? (
          <IconFont type={`icon-${icon || command}`} />
        ) : (
          <Icon type="save"></Icon>
        )}
      </Tooltip>
    </Command>
  );
};

export default ToolbarButton;
