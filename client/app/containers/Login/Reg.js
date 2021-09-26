import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Button, Input, Icon, message } from 'antd';
import { regActions } from '../../reducer/modules/user';
import { withRouter } from 'react-router';
const FormItem = Form.Item;
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
    regActions
  }
)
@withRouter
class Reg extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  static propTypes = {
    form: PropTypes.object,
    history: PropTypes.object,
    regActions: PropTypes.func
  };

  handleSubmit = e => {
    e.preventDefault();
    const form = this.props.form;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.regActions(values).then(res => {
          console.log(res.payload)
          if (res.payload.data.errcode == 0) {
            this.props.history.replace('/');
            message.success('register success! ');
          } else {
            message.warn(res.payload.data.errmsg)
          }
        });
      }
    });
  };

  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('the passwords is not the same');
    } else {
      callback();
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const passwordReg = {
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      message: 'password must contain at least eight characters, at least one number and both lower and uppercase letters!'
    }
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem style={formItemStyle}>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'please enter the username!' }]
          })(
            <Input
              style={changeHeight}
              prefix={<Icon type="user" style={{ fontSize: 13 }} />}
              placeholder="Username"
            />
          )}
        </FormItem>

        {/* Email */}
        <FormItem style={formItemStyle}>
          {getFieldDecorator('email', {
            rules: [
              {
                required: true,
                message: 'please enter the email!',
                pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{1,})+$/
              }
            ]
          })(
            <Input
              style={changeHeight}
              prefix={<Icon type="mail" style={{ fontSize: 13 }} />}
              placeholder="Email"
            />
          )}
        </FormItem>

        {/* password */}
        <FormItem style={formItemStyle}>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'please enter the password!'
              },
              passwordReg,
            ]
          })(
            <Input
              style={changeHeight}
              prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </FormItem>

        {/* verify password */}
        <FormItem style={formItemStyle}>
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
            <Input
              style={changeHeight}
              prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
              type="password"
              placeholder="Confirm Password"
            />
          )}
        </FormItem>

        {/* reg */}
        <FormItem style={formItemStyle}>
          <Button
            style={changeHeight}
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Sign up
          </Button>
        </FormItem>
      </Form>
    );
  }
}
const RegForm = Form.create()(Reg);
export default RegForm;
