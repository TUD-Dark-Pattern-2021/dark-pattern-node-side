import React, {Component} from 'react';
import {Link} from "react-router-dom"
import axios from 'axios';
import {Button, Form, Input, Layout, message} from 'antd';

const FormItem = Form.Item;
const {Content} = Layout
const title = {
  resetPasswordTitle: 'Forgot Password',
};

class Password extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      error: false,
      messageServer: '',
      showNullError: false,
    };
  }


  handleSubmit = e => {
    e.preventDefault();
    const form = this.props.form;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.sendEmail(values)
      }
    });
  };

  sendEmail = async (values) => {
    const response = await axios.post('http://localhost:8080/api/user/forgotPassword', {
      email: values.email
    });
    console.log(response.data)
    if (response.data.errcode === 0) {
      message.success('Reset email sent, please check your email.');
    } else {
      message.error(response.data.errmsg)
    }
  };


  render() {
    const {
      email, messageServer, noEmailerror, error
    } = this.state;
    const {getFieldDecorator} = this.props.form;

    return (
      <div>
        <Content>
          <h1>{title.resetPasswordTitle}</h1>
          <Form className="Forgot-Pass-Form" onSubmit={this.handleSubmit} layout={"inline"}>
            <FormItem
              label="Email"
            >
              {getFieldDecorator('email', {
                rules: [
                  {required: true, message: 'please enter email!'},
                  {
                    message: 'please enter the correct email!',
                    pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{1,})+$/
                  }
                ]
              })(
                <Input style={{width: 300}} placeholder={'enter your email here.'}/>
              )}
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                className="forgotPassword-form-button"
              >
                Send Recovery Email
              </Button>
            </FormItem>
          </Form>
        </Content>
      </div>
    );
  }
}

export default Form.create()(Password);
