import { Button, Card, Form, Icon, Popover } from "antd";
import React, { Component } from "react";

import { Dispatch, Action } from "redux";
import { FormComponentProps } from "antd/es/form";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import { connect } from "dva";
import TableForm from "./components/TableForm";
import FooterToolbar from "./components/FooterToolbar";
import styles from "./style.less";
import { RouteComponentProps } from "react-router";
import { StateType } from "./model";
// import { IntentJson } from './data.d';

type IProps = {
  key: string | undefined;
};

interface AdvancedFormProps
  extends FormComponentProps,
    RouteComponentProps<IProps> {
  dispatch: Dispatch<
    Action<
      | "intentExpressions/submitAdvancedForm"
      | "intentExpressions/getIntentsJson"
      | "intentExpressions/getAllExpressions"
    >
  >;
  loading: boolean;
  intentExpressions: StateType;
}

interface TableListState {
  intentsJson?: string;
  width: string;
}

@connect(
  ({
    intentExpressions,
    loading
  }: {
    intentExpressions: StateType;
    loading: {
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    intentExpressions,
    loading: loading.models.intentExpressions
  })
)
class AdvancedForm extends Component<AdvancedFormProps, TableListState> {
  state = {
    intentsJson: "",
    width: "100%"
  };

  componentDidMount() {
    const { dispatch } = this.props;
    window.addEventListener("resize", this.resizeFooterToolbar, {
      passive: true
    });
    this.resizeFooterToolbar();
    dispatch({
      type: "intentExpressions/getAllExpressions"
    });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeFooterToolbar);
  }

  getErrorInfo = () => {
    const {
      form: { getFieldsError }
    } = this.props;
    const errors = getFieldsError();
    const errorCount = Object.keys(errors).filter(key => errors[key]).length;
    if (!errors || errorCount === 0) {
      return null;
    }
    const scrollToField = (fieldKey: string) => {
      const labelNode = document.querySelector(`label[for="${fieldKey}"]`);
      if (labelNode) {
        labelNode.scrollIntoView(true);
      }
    };
    const errorList = Object.keys(errors).map(key => {
      if (!errors[key]) {
        return null;
      }
      const errorMessage = errors[key] || [];
      return (
        <li
          key={key}
          className={styles.errorListItem}
          onClick={() => scrollToField(key)}
        >
          <Icon type="cross-circle-o" className={styles.errorIcon} />
          <div className={styles.errorMessage}>{errorMessage[0]}</div>
        </li>
      );
    });
    return (
      <span className={styles.errorIcon}>
        <Popover
          title="Form verification information"
          content={errorList}
          overlayClassName={styles.errorPopover}
          trigger="click"
          getPopupContainer={(trigger: HTMLElement) => {
            if (trigger && trigger.parentNode) {
              return trigger.parentNode as HTMLElement;
            }
            return trigger;
          }}
        >
          <Icon type="exclamation-circle" />
        </Popover>
        {errorCount}
      </span>
    );
  };

  resizeFooterToolbar = () => {
    requestAnimationFrame(() => {
      const sider = document.querySelectorAll(
        ".ant-layout-sider"
      )[0] as HTMLDivElement;
      if (sider) {
        const width = `calc(100% - ${sider.style.width})`;
        const { width: stateWidth } = this.state;
        if (stateWidth !== width) {
          this.setState({ width });
        }
      }
    });
  };

  validate = () => {
    const {
      form: { validateFieldsAndScroll },
      dispatch
    } = this.props;
    validateFieldsAndScroll((error, values) => {
      if (!error) {
        // submit the values
        dispatch({
          type: "intentExpressions/submitAdvancedForm",
          payload: values
        });
      }
    });
  };

  render() {
    const {
      intentExpressions: { data },
      form: { getFieldDecorator },
      loading
    } = this.props;
    const { width } = this.state;
    return (
      <>
        <PageHeaderWrapper>
          <Card title="User Says ..." bordered={false}>
            {data !== undefined
              ? getFieldDecorator("members", {
                  initialValue: data.list
                })(<TableForm />)
              : null}
          </Card>
        </PageHeaderWrapper>
        <FooterToolbar style={{ width }}>
          {this.getErrorInfo()}
          <Button type="primary" onClick={this.validate} loading={loading}>
            Submit
          </Button>
        </FooterToolbar>
      </>
    );
  }
}

export default Form.create<AdvancedFormProps>()(AdvancedForm);
