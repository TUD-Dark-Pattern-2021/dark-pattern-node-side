import React, {PureComponent as Component} from "react";
import PropTypes from "prop-types";
import axios from 'axios'
import { Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  message,
} from 'antd'
const { Option } = Select;

class ReportForm extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {

  }

  componentDidMount() {
  }
  async postNewReport (values) {
    let result = await axios.post('/api/dp/newReport', values)
    console.log(result)
    message.success('Thanks for your report!')
    this.props.form.resetFields()
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.postNewReport(values)
      }
    });
  };

  static propTypes = {
    login: PropTypes.bool,
    // animeList: PropTypes.array,
    // getAnimeList: PropTypes.func
  };

  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 4 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 4 },
        sm: { span: 16 },
      },
    };
    const { getFieldDecorator } = this.props.form;
    return <div>
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="Url">
          {getFieldDecorator('url', {
            rules: [
              {
                required: true,
                message: 'Please input url!',
              },
            ],
          })(<Input placeholder='Please input url'/>)}
        </Form.Item>
        <Form.Item label="Web Type">
          {getFieldDecorator('webType', {
            rules: [{ required: true, message: 'Please select web type!' }],
          })(
            <Select placeholder="Please select web type">
              <Option value="shopping">Shopping</Option>
            </Select>,
          )}
        </Form.Item>
        <Form.Item label="Keyword">
          {getFieldDecorator('keyword', {
            rules: [
              {
                required: true,
                message: 'Please input keyword!',
              },
            ],
          })(<Input placeholder='Please input keyword' />)}
        </Form.Item>
        <Form.Item label="Category">
          {getFieldDecorator('category', {
            rules: [{ required: true, message: 'Please select category!' }],
          })(
            <Select placeholder="Please select categorye">
              <Option value={0}>Misdirection</Option>
              <Option value={1}>Urgency</Option>
              <Option value={2}>Scarcity</Option>
              <Option value={3}>Force Action</Option>
            </Select>,
          )}
        </Form.Item>
        <Form.Item label="Description">
          {getFieldDecorator('description', {
            rules: [
              {
                required: true,
                message: 'Please input description!',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 4 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  }
}

export default Form.create()(ReportForm);
