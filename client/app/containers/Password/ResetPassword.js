import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types'; 
import {Link} from "react-router-dom"
import {Button, Form, Input, Layout, message} from 'antd';
const FormItem = Form.Item;
const { Content } = Layout
const title = {
  pageTitle: 'Reset Password',
};

class ResetPassword extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
      error: false,
      update: false,
      loading: true,
    };
  }

  async componentDidMount() {
    let token = this.props.match.params.token
    await axios.get('http://localhost:8080/api/user/resetPassword/' + token, {
    })
      .then(response => {
        console.log(response);
        if (response.data.errcode === 0) {
          this.setState({
            username: response.data.data.username,
          });
        } else {
          message.error(response.data.errmsg)
        }
      })
      .catch(error => {
        console.log(error.data);
      });
  }

  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('the passwords are not the same');
    } else {
      callback();
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const form = this.props.form;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
       this.updatePassword(values)
      }
    });
  };

  updatePassword = (values) => {
    let tokens = this.props.match.params.token
    axios.put('http://localhost:8080/api/user/updatePassword', {
      token: tokens,
      password: values.password
    }).then(response => {
      console.log(response.data);
      if (response.data.errcode === 0) {
        message.success('Password Reset Successful, please Login')
        this.props.history.push('/login')
      } else {
        message.error(response.data.errmsg)
      }
    }).catch(error => {
      console.log(error.data);
    });
  };

  render() {
    const { username } = this.state;
    const {getFieldDecorator} = this.props.form
    const passwordReg = {
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      message: 'password must contain at least eight characters, at least one number and both lower and uppercase letters!'
    }
      return (
        <div>
          <Content style={{height: "100vh", background: "#fff"}}>
          <h1>{title.pageTitle}</h1>
          <p style={{margin: '10px 0'}}>Hi, {username}. Please insert your new password below.</p>
          <Form className="Forgot-Pass-Form" onSubmit={this.handleSubmit}>
            <FormItem
              label="Password"
            >
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: 'please enter the password!'
                  },
                  passwordReg,
                ]
              })(
                <Input.Password placeholder={'New Password'} style={{width: 300}}/>
              )}

            </FormItem >
            <FormItem
              label="New Password"
            >
              {getFieldDecorator('confirm', {
                rules: [
                  {
                    required: true,
                    message: 'please enter the password again!'
                  },
                  {
                    validator: this.checkPassword
                  }
                ]
              })(
                <Input.Password placeholder={'Confirm New Password'} style={{width: 300}}/>
              )}
            </FormItem >
            <FormItem >
              <Button
                type="primary"
                htmlType="submit"
                className="forgotPassword-form-button"
              >
                Set new password
              </Button>
            </FormItem>
          </Form>
          <Link to="/">
             <Button>Go Home</Button>
          </Link>
          </Content>
        </div>
      );
    }
  }

export default Form.create()(ResetPassword)
