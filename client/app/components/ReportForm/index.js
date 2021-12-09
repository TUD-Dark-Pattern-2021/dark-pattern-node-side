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
const {TextArea } = Input

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
        if (values.classification) {
          values.classification = 1
        } else {
          values.classification = 0
        }
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
        xs: { span: 24 },
        sm: { span: 24 },
        md: { span: 24 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
        md: { span: 24 },
      },
    };
    const { getFieldDecorator } = this.props.form;
    return<div className="Report-Container">
    <div className="reportBackground">
      <h1>Report New Dark Patterns</h1>
      <p>Report new dark patterns to help us make our extension better! &#10024;</p>
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <h3>Website URL:</h3>
        <Form.Item label="">
          {getFieldDecorator('url', {
            rules: [
              {
                required: true,
                message: 'Please input url!',
              },
            ],
          })(<Input placeholder='Please input url'/>)}
        </Form.Item>

        <h3>Sentence Or Keywords Of Dark Patterns:</h3>
        <Form.Item label="">
          {getFieldDecorator('patternString', {
            rules: [
              {
                required: true,
                message: 'Please input sentence or keywords!',
              },
            ],
          })(<Input placeholder='Please input keyword' />)}
        </Form.Item>
        <h3>Dark Pattern Type:</h3>
        <Form.Item label="">
          {getFieldDecorator('patternType', {
            rules: [{ required: true, message: 'Please select category!' }],
          })(
            <Select placeholder="Please select category!">
              <Option value={"fakeactivity"}>Fake Activity</Option>
              <Option value={"fakecountdown"}>Fake Countdown</Option>
              <Option value={"fakelimitedtime"}>Fake Limited-Time</Option>
              <Option value={"fakelowstock"}>Fake Low-Stock</Option>
              <Option value={"fakehighdemand"}>Fake High-Demand</Option>
              <Option value={"confirmshaming"}>Confirmshaming</Option>
            </Select>,
          )}
        </Form.Item>
        <h3>Describe the Issue:</h3>
        <Form.Item label="" className="DPdescription">
          {getFieldDecorator('description', {
            rules: [
              {
                required: true,
                message: 'Please input description!',
              },
            ],
          })(<TextArea rows={4}/>)}
        </Form.Item>
        <Form.Item label="" >
          {getFieldDecorator('classification', {
            valuePropName: 'checked',
            initialValue: false,
          })(<Checkbox style={{fontSize: 16}}>Check if reporting mis-highlighted content.</Checkbox>)}
        </Form.Item>
        <Row justify={'center'} type={'flex'}>
          <Button type="" htmlType="submit">
            Submit
          </Button>
        </Row>

      </Form>
    </div>
    </div>
  }
}

export default Form.create()(ReportForm);
