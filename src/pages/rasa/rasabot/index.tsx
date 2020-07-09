// import { Form, Divider, Menu, Card, Row, Col } from 'antd';
import {
  Form,
  Divider,
  Card,
  Button,
  message,
  Modal,
  Dropdown,
  Menu,
  Icon
} from "antd";
import { FormComponentProps } from "antd/es/form";
import { Dispatch, Action } from "redux";
import { StateType } from "./model";
import { TableListItem, TableListPagination, TableListParams } from "./data.d";
import React, { Component, Fragment } from "react";
import StandardTable, {
  StandardTableColumnProps
} from "./components/StandardTable";
import { SorterResult } from "antd/es/table";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import { connect } from "dva";
import CreateForm from "./components/CreateForm";
import UpdateForm, { FormValueType } from "./components/UpdateForm";

import styles from "./style.less";
import Link from "umi/link";

const getValue = (obj: { [x: string]: string[] }) =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(",");

interface TableListProps extends FormComponentProps {
  dispatch: Dispatch<
    Action<
      | "rasaRobot/add"
      | "rasaRobot/fetch"
      | "rasaRobot/remove"
      | "rasaRobot/update"
    >
  >;
  loading: boolean;
  rasaRobot: StateType;
}

interface TableListState {
  modalVisible: boolean;
  updateModalVisible: boolean;
  expandForm: boolean;
  selectedRows: TableListItem[];
  formValues: { [key: string]: string };
  stepFormValues: Partial<TableListItem>;
}

@connect(
  ({
    rasaRobot,
    loading
  }: {
    rasaRobot: StateType;
    loading: {
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    rasaRobot,
    loading: loading.models.rasaRobot
  })
)
class TableList extends Component<TableListProps, TableListState> {
  state: TableListState = {
    modalVisible: false,
    updateModalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    stepFormValues: {}
  };

  columns: StandardTableColumnProps[] = [
    {
      title: "Robot name",
      dataIndex: "robotName"
    },
    {
      title: "Description",
      dataIndex: "key"
    },
    {
      title: "Action",
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.handleUpdateModalVisible(true, record)}>
            Configuration
          </a>
          <Divider type="vertical" />
          <Link to={`/rasa/rasabot/robotitem/${record.key}`}>Show</Link>
          <Divider type="vertical" />
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="Entities">
                  <Link to={`/rasa/rasabot/entities/${record.key}`}>
                    Entities
                  </Link>
                </Menu.Item>
                <Menu.Item key="Intents">
                  <Link to={`/rasa/rasabot/intents/${record.key}`}>
                    Intents
                  </Link>
                </Menu.Item>
                <Menu.Item key="Synonyms">
                  <Link to={`/rasa/rasabot/synonyms/${record.key}`}>
                    Synonyms
                  </Link>
                </Menu.Item>
                <Menu.Item key="Regex">
                  <Link to={`/rasa/rasabot/regex/${record.key}`}>Regex</Link>
                </Menu.Item>
                <Menu.Item key="Responses">
                  <Link to={`/rasa/rasabot/responses/${record.key}`}>
                    Responses
                  </Link>
                </Menu.Item>
                <Menu.Item key="Stories">
                  <Link to={`/rasa/rasabot/stories/${record.key}`}>
                    Stories
                  </Link>
                </Menu.Item>
                <Menu.Item key="Training">
                  <Link to={`/rasa/rasabot/training/${record.key}`}>
                    Training
                  </Link>
                </Menu.Item>
                <Menu.Item key="Training">
                  <Link to={`/rasa/rasabot/chatmodels/${record.key}`}>
                    Models
                  </Link>
                </Menu.Item>
                <Menu.Item key="Chat">
                  <Link to={`/rasa/rasabot/chat/${record.key}`}>Chat</Link>
                </Menu.Item>
                <Menu.Item key="Logs">
                  <Link to={`/rasa/backend/logs/${record.key}`}>Logs</Link>
                </Menu.Item>
              </Menu>
            }
          >
            <a>
              More actions <Icon type="down" />
            </a>
          </Dropdown>
        </Fragment>
      )
    }
  ];

  componentDidMount(): void {
    const { dispatch } = this.props;
    dispatch({
      type: "rasaRobot/fetch"
    });
  }

  handleOtherProcess = (key: string, currentItem: number) => {};

  handleStandardTableChange = (
    pagination: Partial<TableListPagination>,
    filterArgs: Record<keyof TableListItem, string[]>,
    sorter: SorterResult<TableListItem>
  ) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;
    const filters = Object.keys(filterArgs).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filterArgs[key]);
      return newObj;
    }, {});

    const params: Partial<TableListParams> = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }
    dispatch({
      type: "rasaRobot/fetch",
      payload: params
    });
  };

  handleUpdateModalVisible = (flag?: boolean, record?: FormValueType) => {
    this.setState({
      updateModalVisible: !!flag,
      stepFormValues: record || {}
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {}
    });
    dispatch({
      type: "rasaRobot/fetch",
      payload: {}
    });
  };

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm
    });
  };

  handleMenuClick = (e: { key: string }) => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;
    if (!selectedRows) return;
    switch (e.key) {
      case "remove":
        dispatch({
          type: "rasaRobot/remove",
          payload: {
            key: selectedRows.map(row => row.key)
          },
          callback: () => {
            this.setState({
              selectedRows: []
            });
          }
        });
        break;
      default:
        break;
    }
  };

  handleSelectRows = (rows: TableListItem[]) => {
    this.setState({
      selectedRows: rows
    });
  };

  handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, filedsValue) => {
      if (err) return;

      const values = {
        ...filedsValue,
        updatedAt: filedsValue.updatedAt && filedsValue.updatedAt.valueOf()
      };

      this.setState({
        formValues: values
      });

      dispatch({
        type: "rasaRobot/fetch",
        payload: values
      });
    });
  };

  handleModalVisible = (flag?: boolean) => {
    this.setState({
      modalVisible: !!flag
    });
  };

  handleAdd = (fields: { robotName: any }) => {
    const { dispatch } = this.props;
    dispatch({
      type: "rasaRobot/add",
      payload: {
        robotName: fields.robotName
      }
    });

    message.success("Add succeed");
    this.handleModalVisible();
  };

  handleUpdate = (fields: FormValueType) => {
    const { dispatch } = this.props;
    dispatch({
      type: "rasaRobot/update",
      payload: {
        name: fields.robotName,
        desc: fields.key,
        key: fields.key
      }
    });
  };

  handleDelete = () => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;
    Modal.confirm({
      title: "Delete Item",
      content: "Confirm to delete this item？",
      okText: "Yes",
      cancelText: "No",
      onOk: () => {
        if (!selectedRows) return;
        dispatch({
          type: "rasaRobot/remove",
          payload: {
            key: selectedRows.map(row => row.key)
          },
          callback: () => {
            this.setState({
              selectedRows: []
            });
          }
        });
      }
    });
  };

  render() {
    const {
      rasaRobot: { data },
      loading
    } = this.props;
    const {
      selectedRows,
      modalVisible,
      updateModalVisible,
      stepFormValues
    } = this.state;

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible
    };
    const updateMethods = {
      handleUpdateModalVisible: this.handleUpdateModalVisible,
      handleUpdate: this.handleUpdate
    };
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Button
                icon="plus"
                type="primary"
                onClick={() => this.handleModalVisible(true)}
              >
                New
              </Button>
              {selectedRows.length > 0 && (
                <span>
                  <Button type="primary" onClick={() => this.handleDelete()}>
                    Delete
                  </Button>
                </span>
              )}
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} />
        {stepFormValues && Object.keys(stepFormValues).length ? (
          <UpdateForm
            {...updateMethods}
            updateModalVisible={updateModalVisible}
            values={stepFormValues}
          />
        ) : null}
      </PageHeaderWrapper>
    );
  }
}

export default Form.create<TableListProps>()(TableList);
