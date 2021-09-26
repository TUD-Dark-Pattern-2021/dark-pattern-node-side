import React, { PureComponent as Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import LoginForm from './Login';
import RegForm from './Reg';
const TabPane = Tabs.TabPane;

export default class LoginWrap extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    form: PropTypes.object,
  };

  render() {
    return (
      <Tabs
        className="login-form"
        tabBarStyle={{ border: 'none' }}
      >
        <TabPane tab="Sign in" key="1">
          <LoginForm />
        </TabPane>
        <TabPane tab={"Sign up"} key="2">
          <RegForm />
        </TabPane>
      </Tabs>
    );
  }
}
