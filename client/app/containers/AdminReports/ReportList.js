import React, {PureComponent as Component} from "react";
import PropTypes from "prop-types";
import axios from 'axios'
import { Form, Row, Col, Input, Button, Icon, Select, Table, DatePicker  } from 'antd'
import moment from "moment";
const { Option } = Select
const statusMap = [
  {
    label: 'New',
    value: 1,
  },
  {
    label: 'In progress',
    value: 2,
  },
  {
    label: 'Declined',
    value: 3,
  },
  {
    label: 'Approved',
    value: 4,
  },
]

const changeStatusMap = [
  {
    label: 'All',
    value: '',
  },
  ...statusMap
]

const categoryMap = [
  {
    label: 'All',
    value: '',
  },
  {
    label: 'Fake Activity',
    value: 'fakeactivity',
  },
  {
    label: 'Fake Countdown',
    value: 'fakecountdown',
  },
  {
    label: 'Fake Limited-Time',
    value: 'fakelimitedtime',
  },
  {
    label: 'Fake Low-Stock',
    value: 'fakelowstock',
  },
  {
    label: 'Fake High-Demand',
    value: 'fakehighdemand',
  },
  {
    label: 'Confirmshaming',
    value: 'confirmshaming',
  },
]

class ReportList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: 'Id',
          dataIndex: 'id',
        },
        {
          title: 'Create Time',
          dataIndex: 'createdTime',
          defaultSortOrder: 'descend',
          sorter: (a, b) => a.createdTime - b.createdTime,
          render:(text) => {
            return (
              <span>
                {moment(text).format('YYYY-MM-DD HH:mm:ss')}
              </span>
            )
          }
        },
        {
          title: 'Url',
          dataIndex: 'url',
          render: (text, record) => (
            <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
              {text}
            </div>
          ),
          width: 200,
        },
        {
          title: 'Web Type',
          dataIndex: 'webType',
        },
        {
          title: 'Keyword',
          dataIndex: 'keyword',
          render: (text, record) => (
            <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
              {text}
            </div>
          ),
          width: 200,

        },
        {
          title: 'Category',
          dataIndex: 'category',
        },
        {
          title: 'Description',
          dataIndex: 'description',
          render: (text, record) => (
            <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
              {text}
            </div>
          ),
          width: 200,
        },
        {
          title: 'Status',
          dataIndex: 'status',
            render: (text, record) => (
              <Select defaultValue={text} style={{ width: 120 }} onChange={(value) => this.handleStatusChange(value, record.id)}>
                {statusMap.map(item => <Option key={item.value} value={item.value}>{item.label}</Option>)}
              </Select>
          ),
        },
      ],
      result: []
    }
  }

  componentWillMount() {
    this.getList()
  }

  componentDidMount() {
  }
  async handleStatusChange (status, id) {
    console.log(status, id)
    let result = axios.post('/api/dp/updateReport', {
      id,
      status,
    })
    console.log(result)
  }
  getFields() {
    const { getFieldDecorator } = this.props.form;
    const children = [];
    const Elements = [
      {
        field: 'category',
        type: 'select',
        value: categoryMap
      },
      {
        field: 'status',
        type: 'select',
        value: changeStatusMap
      },
      {
        field: 'startTime',
        type: 'date'
      },
      {
        field: 'endTime',
        type: 'date'
      }
    ]
    for (let i = 0; i < Elements.length; i++) {
      let {field, type} = Elements[i]
      console.log(field)
      let returnEle
      if (type === 'text') returnEle = <Input placeholder={field}/>
      if (type === 'select') {
        let { value } = Elements[i]
        returnEle = <Select style={{width: '140px'}}>
          {value.map(item => <Option key={item.value} value={item.value}>{item.label}</Option>)}
        </Select>
      }
      if (type === 'date') {
        returnEle = <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
      }
      children.push(
          <Form.Item label={field} key={field}>
            {getFieldDecorator(`${field}`, {
              // rules: [
              //   {
              //     required: true,
              //     message: ``,
              //   },
              // ],
            })(
              returnEle
            )}
          </Form.Item>
      );
    }
    return children;
  }

  handleReset = () => {
    this.props.form.resetFields();
  };

  async getList(values = {}) {
    console.log(values)
    let result = await axios.get('/api/dp/getList',  {params: values})
    // let result = {
    //   count: 1000,
    //   pageCount: 25,
    //   curPage: 1,
    //   data: [
    //     {
    //       id: 'abc',
    //       createTime: Date.now(),
    //       url: 'google.comgoogle.comgoogle.comgoogle.comgoogle.comgoogle.com',
    //       webType: 'shopping',
    //       keyword: 'abc',
    //       category: 1,
    //       status: 1,
    //       description: 'abbcccccc'
    //     },
    //     {
    //       id: 'abc12',
    //       createTime: Date.now(),
    //       url: 'google.com',
    //       webType: 'shopping',
    //       keyword: 'abc',
    //       category: 1,
    //       status: 2,
    //       description: 'abbcccccc'
    //     }
    //   ],
    // }
    this.setState({
      result:result.data.data.data
    })
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        if (values.startTime) {
          values.startTime = moment(values.startTime).valueOf()
        }
        if (values.endTime) {
          values.endTime = moment(values.endTime).valueOf()
        }
        this.getList(values)
      }
    });
  };

  static propTypes = {
    login: PropTypes.bool,
  };

  render() {
    let { columns, result } = this.state
    return <div>
      <Form layout="inline" className="ant-advanced-search-form" onSubmit={this.handleSubmit}>
        <Row span={24}>
          {this.getFields()}
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">
              Query
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
              Clear
            </Button>
          </Col>
        </Row>
      </Form>
      <div>
        <Table columns={columns} dataSource={result} rowKey={'id'}/>
      </div>
    </div>
  }
}

export default Form.create()(ReportList);
