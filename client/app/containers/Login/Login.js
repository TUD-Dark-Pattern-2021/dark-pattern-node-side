import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Link} from "react-router-dom"
import { Form, Button, Input, message, Radio, Icon } from 'antd';
import { loginActions } from '../../reducer/modules/user';
import { withRouter } from 'react-router';
const FormItem = Form.Item;

import '../../styles/Login.less';

const formItemStyle = {
  marginBottom: '.16rem'
};

const changeHeight = {
  height: '.42rem'
};

@connect(
  state => {
    return {
      loginData: state.user
    };
  },
  {
    loginActions,
  }
)
@withRouter
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  static propTypes = {
    form: PropTypes.object,
    history: PropTypes.object,
    loginActions: PropTypes.func,
    loginData: PropTypes.object
  };

  handleSubmit = e => {
    e.preventDefault();
    const form = this.props.form;
    form.validateFields((err, values) => {
      if (!err) {
          this.props.loginActions(values).then(res => {
            if (res.payload.data.errcode == 0) {
              this.props.history.replace('/');
              message.success('login success!');
            } 
            else {
              message.error(res.payload.data.errmsg)
            }
          });
      }
    });
  };

  componentDidMount() {
    if (this.props.loginData.isLogin) {
      this.props.history.push('/');
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    // const emailRule = {
    //   required: true,
    //   message: 'please enter the correct email!',
    //   pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{1,})+$/
    // };
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem style={formItemStyle}>
          {getFieldDecorator('email', { rules: [{required: true }]})
          (
            <Input
              style={changeHeight}
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Email/Username"
            />
          )}
        </FormItem>

        <FormItem style={formItemStyle}>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'please enter password!' }]
          })(
            <Input
              style={changeHeight}
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </FormItem>
        <FormItem style={formItemStyle}>
          <Button
            style={changeHeight}
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Sign in
          </Button>
        </FormItem>
        <Link to="/forgotPassword">
        <Button
            style={changeHeight}
            type="primary"
            className="login-form-button"
          >
            Forgot Password
          </Button>
          </Link>
      </Form>
    );
  }
}
const LoginForm = Form.create()(Login);
export default LoginForm;
