import { Button, Divider, Input, Popconfirm, Table, message } from "antd";
import React, { Fragment, PureComponent } from "react";

import isEqual from "lodash.isequal";
import Link from "umi/link";
import { connect } from "dva";
import { Dispatch, Action } from "redux";
import { FormComponentProps } from "antd/es/form";
import { StateType } from "../model";
import GetIntentsView from "./GetIntentsView";
import styles from "../style.less";

interface TableFormDateType {
  key: string;
  expression?: string;
  isNew?: boolean;
  editable?: boolean;
}
interface TableFormProps extends Partial<FormComponentProps> {
  dispatch?: Dispatch<Action<"intentExpressions/getIntentsJson">>;
  intentExpressions?: StateType;
  loading?: boolean;
  value?: TableFormDateType[];
  onChange?: (value: TableFormDateType[]) => void;
}

interface TableFormState {
  loading?: boolean;
  intentJsonShow?: boolean;
  value?: TableFormDateType[];
  data?: TableFormDateType[];
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
class TableForm extends PureComponent<TableFormProps, TableFormState> {
  static getDerivedStateFromProps(
    nextProps: TableFormProps,
    preState: TableFormState
  ) {
    if (isEqual(nextProps.value, preState.value)) {
      return null;
    }
    return {
      data: nextProps.value,
      value: nextProps.value
    };
  }

  clickedCancel: boolean = false;

  index = 0;

  cacheOriginData = {};

  columns = [
    {
      title: "Says",
      dataIndex: "expression",
      key: "expression",
      width: "80%",
      render: (text: string, record: TableFormDateType) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              onChange={e =>
                this.handleFieldChange(e, "expression", record.key)
              }
              onKeyPress={e => this.handleKeyPress(e, record.key)}
              placeholder="Says..."
            />
          );
        }
        return text;
      }
    },
    {
      title: "Actions",
      key: "action",
      render: (text: string, record: TableFormDateType) => {
        const { loading } = this.state;
        if (!!record.editable && loading) {
          return null;
        }
        if (record.editable) {
          if (record.isNew) {
            return (
              <span>
                <a onClick={e => this.saveRow(e, record.key)}>Add</a>
                <Divider type="vertical" />
                <Popconfirm
                  title="Do you want to delete this line？"
                  onConfirm={() => this.remove(record.key)}
                >
                  <a>Delete</a>
                </Popconfirm>
                <Divider type="vertical"></Divider>
                <a onClick={() => this.getIntentJson(record.key)}>
                  Get Intents
                </a>
              </span>
            );
          }
          return (
            <span>
              <a onClick={e => this.saveRow(e, record.key)}>Save</a>
              <Divider type="vertical" />
              <a onClick={e => this.cancel(e, record.key)}>Cancel</a>
              <Divider type="vertical"></Divider>
              <a onClick={() => this.getIntentJson(record.key)}>Get Intents</a>
            </span>
          );
        }
        return (
          <span>
            <a onClick={e => this.toggleEditable(e, record.key)}>Edit</a>
            <Divider type="vertical" />
            <Popconfirm
              title="Do you want to delete this row？"
              onConfirm={() => this.remove(record.key)}
            >
              <a>Delete</a>
            </Popconfirm>
            <Divider type="vertical" />
            <Link to={`/rasa/rasabot/marks/${record.key}`}>Mark</Link>
          </span>
        );
      }
    }
  ];

  constructor(props: TableFormProps) {
    super(props);
    this.state = {
      data: props.value,
      loading: false,
      value: props.value,
      intentJsonShow: false
    };
  }

  getIntentJson(key: string) {
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: "intentExpressions/getIntentsJson",
        callback: () => {
          this.setState({
            intentJsonShow: true
          });
        }
      });
    }
  }

  getRowByKey(key: string, newData?: TableFormDateType[]) {
    const { data = [] } = this.state;
    return (newData || data).filter(item => item.key === key)[0];
  }

  toggleEditable = (e: React.MouseEvent | React.KeyboardEvent, key: string) => {
    e.preventDefault();
    const { data = [] } = this.state;
    const newData = data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (target) {
      // 进入编辑状态时保存原始数据
      if (!target.editable) {
        this.cacheOriginData[key] = { ...target };
      }
      target.editable = !target.editable;
      this.setState({ data: newData });
    }
  };

  newMember = () => {
    const { data = [] } = this.state;
    const newData = data.map(item => ({ ...item }));
    newData.push({
      key: `NEW_TEMP_ID_${this.index}`,
      expression: "",
      editable: true,
      isNew: true
    });
    this.index += 1;
    this.setState({ data: newData });
  };

  intentJsonClose = () => {
    this.setState({
      intentJsonShow: false
    });
  };

  remove(key: string) {
    const { data = [] } = this.state;
    const { onChange } = this.props;
    const newData = data.filter(item => item.key !== key);
    this.setState({ data: newData });
    if (onChange) {
      onChange(newData);
    }
  }

  handleKeyPress(e: React.KeyboardEvent, key: string) {
    if (e.key === "Enter") {
      this.saveRow(e, key);
    }
  }

  handleFieldChange(
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string,
    key: string
  ) {
    const { data = [] } = this.state;
    const newData = [...data];
    const target = this.getRowByKey(key, newData);
    if (target) {
      target[fieldName] = e.target.value;
      this.setState({ data: newData });
    }
  }

  saveRow(e: React.MouseEvent | React.KeyboardEvent, key: string) {
    e.persist();
    this.setState({
      loading: true
    });
    setTimeout(() => {
      if (this.clickedCancel) {
        this.clickedCancel = false;
        return;
      }
      const target = this.getRowByKey(key) || {};
      if (!target.expression) {
        message.error("Please fill in the complete member information.");
        (e.target as HTMLInputElement).focus();
        this.setState({
          loading: false
        });
        return;
      }
      delete target.isNew;
      this.toggleEditable(e, key);
      const { data = [] } = this.state;
      const { onChange } = this.props;
      if (onChange) {
        onChange(data);
      }
      this.setState({
        loading: false
      });
    }, 500);
  }

  cancel(e: React.MouseEvent, key: string) {
    this.clickedCancel = true;
    e.preventDefault();
    const { data = [] } = this.state;
    const newData = [...data];
    // Raw data before editing
    let cacheOriginData = [];
    cacheOriginData = newData.map(item => {
      if (item.key === key) {
        if (this.cacheOriginData[key]) {
          const originItem = {
            ...item,
            ...this.cacheOriginData[key],
            editable: false
          };
          delete this.cacheOriginData[key];
          return originItem;
        }
      }
      return item;
    });

    this.setState({ data: cacheOriginData });
    this.clickedCancel = false;
  }

  render() {
    const { loading, data, intentJsonShow } = this.state;
    const { intentExpressions } = this.props;
    const updateViewShowStatus = {
      handleModelShow: this.intentJsonClose
    };
    return (
      <Fragment>
        <Table<TableFormDateType>
          loading={loading}
          columns={this.columns}
          dataSource={data}
          pagination={false}
          rowClassName={record => (record.editable ? styles.editable : "")}
        />
        <Button
          style={{ width: "100%", marginTop: 16, marginBottom: 8 }}
          type="dashed"
          onClick={this.newMember}
          icon="plus"
        >
          Add new corpus
        </Button>
        <GetIntentsView
          {...updateViewShowStatus}
          intentJsonShow={intentJsonShow}
          values={
            intentExpressions!.intentsJson
              ? intentExpressions!.intentsJson.jsonstr
              : null
          }
        ></GetIntentsView>
      </Fragment>
    );
  }
}

export default TableForm;
// export default Form.create<TableFormProps>(TableForm);
