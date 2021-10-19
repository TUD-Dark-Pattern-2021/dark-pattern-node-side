import React, { PureComponent as Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import LoginForm from './Login';
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
      </Tabs>
    );
  }
}
