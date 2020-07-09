import React, { Component, Fragment } from 'react';
import { Typography, Form, Card, Button, message, Modal, Row, Col, Input } from 'antd';
import { connect } from 'dva';
import { RouteComponentProps } from 'react-router';
import { FormComponentProps } from 'antd/es/form';
import { Dispatch, Action } from 'redux';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { SorterResult } from 'antd/es/table';
import { TableListItem, TableListPagination, TableListParams } from './data.d';
import StandardTable, { StandardTableColumnProps } from './components/StandardTable';
import { StateType } from './model';
import styles from '../../../style.less';
import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
// import { RichText } from './components/RichText';

const FormItem = Form.Item;
const { Title } = Typography;

const getValue = (obj: { [x: string]: string[] }) =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

type IProps = {
  key: string | undefined;
};

// type TableListProps = FormComponentProps & RouteComponentProps<IProps>;
interface TableListProps extends FormComponentProps, RouteComponentProps<IProps> {
  dispatch: Dispatch<
    Action<
      | 'robotItemMarks/add'
      | 'robotItemMarks/fetch'
      | 'robotItemMarks/remove'
      | 'robotItemMarks/update'
    >
  >;
  loading: boolean;
  robotItemMarks: StateType;
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
    robotItemMarks,
    loading,
  }: {
    robotItemMarks: StateType;
    loading: {
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    robotItemMarks,
    loading: loading.models.robotItemMarks,
  }),
)
class TableList extends Component<TableListProps, TableListState> {
  state: TableListState = {
    modalVisible: false,
    updateModalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    stepFormValues: {},
  };

  columns: StandardTableColumnProps[] = [
    {
      title: 'key',
      dataIndex: 'key',
    },
    {
      title: 'Mark Entity',
      dataIndex: 'markEntity',
    },
    {
      title: 'Mark Content',
      dataIndex: 'markContent',
    },
    {
      title: 'Action',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.handleUpdateModalVisible(true, record)}>Configure</a>
        </Fragment>
      ),
    },
  ];

  richText: any = null;

  range: any = null;

  componentDidMount(): void {
    const { dispatch } = this.props;
    dispatch({
      type: 'robotItemMarks/fetch',
    });
  }

  onClickButton = () => {
    this.richText.autoFocus();
    const sel = window.getSelection();
    const newNode = document.createElement('span');
    if (sel !== null) {
      newNode.innerHTML = sel.toString();
      newNode.setAttribute('style', 'background: red');
      newNode.setAttribute('contentEditable', 'false');
      this.richText.addNode(newNode);
    }
    console.log(this.richText.text);
  };

  handleDelete = () => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;
    Modal.confirm({
      title: 'Delete Item',
      content: 'Confirm to delete this item？',
      okText: 'Yes',
      cancelText: 'No',
      onOk: () => {
        if (!selectedRows) return;
        dispatch({
          type: 'robotItemMarks/remove',
          payload: {
            key: selectedRows.map(row => row.key),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        });
      },
    });
  };

  handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'robotItemMarks/fetch',
        payload: values,
      });
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'robotItemMarks/fetch',
      payload: {},
    });
  };

  handleAdd = (fields: { markEntity: any; markContent: any }) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'robotItemMarks/add',
      payload: {
        markEntity: fields.markEntity,
        markContent: fields.markContent,
      },
    });

    message.success('添加成功');
    this.handleModalVisible();
  };

  handleModalVisible = (flag?: boolean) => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleUpdateModalVisible = (flag?: boolean, record?: FormValueType) => {
    this.setState({
      updateModalVisible: !!flag,
      stepFormValues: record || {},
    });
  };

  handleSelectRows = (rows: TableListItem[]) => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleMenuClick = (e: { key: string }) => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (!selectedRows) return;
    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'robotItemMarks/remove',
          payload: {
            key: selectedRows.map(row => row.key),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        });
        break;
      default:
        break;
    }
  };

  handleStandardTableChange = (
    pagination: Partial<TableListPagination>,
    filtersArg: Record<keyof TableListItem, string[]>,
    sorter: SorterResult<TableListItem>,
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
      ...filters,
    };
    // if (sorter.field) {
    //   params.sorter = `${sorter.field}_${sorter.order}`;
    // }

    dispatch({
      type: 'robotItemMarks/fetch',
      payload: params,
    });
  };

  handleUpdate = (fields: FormValueType) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'robotItemMarks/update',
      payload: {
        markEntity: fields.markEntity,
        markContent: fields.markContent,
        key: fields.key,
      },
    });
    message.success('配置成功');
    this.handleUpdateModalVisible();
  };

  renderSimpleForm() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="Mark Entity">
              {getFieldDecorator('markEntity')(<Input placeholder="请输入" />)}
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
      robotItemMarks: { data },
      loading,
    } = this.props;
    const { selectedRows, modalVisible, updateModalVisible, stepFormValues } = this.state;

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    const updateMethods = {
      handleUpdateModalVisible: this.handleUpdateModalVisible,
      handleUpdate: this.handleUpdate,
    };
    // <Card>
    //   <RichText
    //     maxRows={1}
    //     ref={el => {
    //       this.richText = el;
    //     }}
    //     onChange={() => {}}
    //   />
    //   <Button type="primary" onClick={this.onClickButton}>
    //     click me
    //   </Button>
    //   <Button
    //     type="primary"
    //     onClick={() => {
    //       console.log(this.richText.getInputText());
    //     }}
    //   >
    //     get value
    //   </Button>
    // </Card>
    // <Card>
    //   <Title level={2}><span style={{ backgroundColor: 'red' }}>This</span>
    //   is the <span style={{ backgroundColor: 'green' }}>work</span> to be marked!</Title>
    // </Card>
    const renderMardText = () => {
      let str = 'This is the work to be marked.';
      const newSet = new Set<string>();
      data.list.forEach(item => {
        newSet.add(item.markContent!);
      });

      newSet.forEach(item => {
        str = str.replace(item, `<span style="background: #f00">${item}</span> `);
      });
      return <div dangerouslySetInnerHTML={{ __html: str }}></div>;
    };
    return (
      <PageHeaderWrapper>
        <Card bordered>
          <Title level={2}>{renderMardText()}</Title>
        </Card>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
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
