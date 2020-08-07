import React, { Component, Fragment } from "react";
import { Form, Card, Button, message, Modal, Row, Col, Input } from "antd";
import { connect } from "dva";
import { RouteComponentProps } from "react-router";
import { FormComponentProps } from "antd/es/form";
import { Dispatch, Action } from "redux";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import { TableListItem, TableListPagination, TableListParams } from "./data.d";
import StandardTable, {
  StandardTableColumnProps
} from "./components/StandardTable";
import { StateType } from "./model";
import styles from "../../style.less";
import CreateForm from "./components/CreateForm";
import UpdateForm, { FormValueType } from "./components/UpdateForm";
import { SorterResult } from "antd/es/table";

const FormItem = Form.Item;

const getValue = (obj: { [x: string]: string[] }) =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(",");

type IProps = {
  key: string | undefined;
};

// type TableListProps = FormComponentProps & RouteComponentProps<IProps>;
interface TableListProps
  extends FormComponentProps,
    RouteComponentProps<IProps> {
  dispatch: Dispatch<
    Action<
      | "robotSynonyms/add"
      | "robotSynonyms/fetch"
      | "robotSynonyms/remove"
      | "robotSynonyms/update"
    >
  >;
  loading: boolean;
  robotSynonyms: StateType;
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
    robotSynonyms,
    loading
  }: {
    robotSynonyms: StateType;
    loading: {
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    robotSynonyms,
    loading: loading.models.robotSynonyms
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
      title: "key",
      dataIndex: "key"
    },
    {
      title: "Synonyms name",
      dataIndex: "synonymsName"
    },
    {
      title: "Synonyms Content",
      dataIndex: "synonymsContent",
      width: "flex"
    },
    {
      title: "Action",
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.handleUpdateModalVisible(true, record)}>
            Edit
          </a>
        </Fragment>
      )
    }
  ];

  componentDidMount(): void {
    const { dispatch } = this.props;
    dispatch({
      type: "robotSynonyms/fetch"
    });
  }

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
          type: "robotSynonyms/remove",
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

  handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf()
      };

      this.setState({
        formValues: values
      });

      dispatch({
        type: "robotSynonyms/fetch",
        payload: values
      });
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {}
    });
    dispatch({
      type: "robotSynonyms/fetch",
      payload: {}
    });
  };

  handleAdd = (fields: { synonymsName: any; synonymsContent: any }) => {
    let temp: any = fields.synonymsContent;
    let i: number = 1;
    if (temp[0].charAt(0) === ",") {
      temp[0] = temp[0].slice(2);
    }
    while (i < temp.length) {
      temp[i] = ", " + temp[i];
      i = i + 1;
    }
    const { dispatch } = this.props;
    dispatch({
      type: "robotSynonyms/add",
      payload: {
        synonymsName: fields.synonymsName,
        synonymsContent: temp
      }
    });

    message.success("success");
    this.handleModalVisible();
  };

  handleModalVisible = (flag?: boolean) => {
    this.setState({
      modalVisible: !!flag
    });
  };

  handleUpdateModalVisible = (flag?: boolean, record?: FormValueType) => {
    this.setState({
      updateModalVisible: !!flag,
      stepFormValues: record || {}
    });
  };

  handleSelectRows = (rows: TableListItem[]) => {
    this.setState({
      selectedRows: rows
    });
  };

  handleMenuClick = (e: { key: string }) => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (!selectedRows) return;
    switch (e.key) {
      case "remove":
        dispatch({
          type: "robotSynonyms/remove",
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

  handleStandardTableChange = (
    pagination: Partial<TableListPagination>,
    filtersArg: Record<keyof TableListItem, string[]>,
    sorter: SorterResult<TableListItem>
  ) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params: Partial<TableListParams> = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters
    };
    // if (sorter.field) {
    //   params.sorter = `${sorter.field}_${sorter.order}`;
    // }

    dispatch({
      type: "robotSynonyms/fetch",
      payload: params
    });
  };

  handleUpdate = (fields: FormValueType) => {
    console.log(fields.synonymsContent);
    const { dispatch } = this.props;
    let temp: any = fields.synonymsContent;
    let i: number = 1;
    if (temp[0].charAt(0) === ",") {
      temp[0] = temp[0].slice(2);
    }
    while (i < temp.length) {
      if (temp[i].charAt(0) !== ",") {
        temp[i] = ", " + temp[i];
      }
      i = i + 1;
    }
    dispatch({
      type: "robotSynonyms/update",
      payload: {
        synonymsName: fields.synonymsName,
        synonymsContent: fields.synonymsContent,
        key: fields.key
      }
    });
    message.success("success");
    this.handleUpdateModalVisible();
  };

  renderSimpleForm() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="Synonyms Name">
              {getFieldDecorator("synonymsName")(
                <Input placeholder="please enter" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                Search
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                Reset
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    // const { key } = this.props.match.params;
    const {
      robotSynonyms: { data },
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
            <div className={styles.tableListForm}>
              {this.renderSimpleForm()}
            </div>
            <div className={styles.tableListOperator}>
              <Button
                icon="plus"
                type="primary"
                onClick={() => {
                  this.handleModalVisible(true);
                }}
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
