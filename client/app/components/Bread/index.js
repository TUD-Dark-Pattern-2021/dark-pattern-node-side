import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';
import {Link, Route} from 'react-router-dom';
import { Layout, Menu, Dropdown, message, Icon, Breadcrumb} from 'antd';

import { withRouter } from 'react-router';
const { Header } = Layout;
const { SubMenu } = Menu;
import {connect} from "react-redux";
import {
  AboutUs, AdminIndex,
  BaitAndSwitch, ChromeExtension,
  ConfirmShaming, Example,
  FakeActivity,
  FakeCountdown, FakeHighDemand, FakeLimitedTime, FakeLowStock, ForcedContinuity, HiddenCost,
  Home,
  Login, PrivacyZuckering, Report,
  SneakIntoBasket, TrickQuestions, VisualInterference
} from "../../containers";
import {requireAuthentication} from "../AuthenticatedComponent";

@connect(
  state => {
    return {
      login: state.user.isLogin,
    }
  },
)
@withRouter

export default class Bread extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
    }
  }
  render() {
    const breadcrumbNameMap = {
      '/SneakIntoBasket': 'Sneak Into Basket',
      '/BaitAndSwitch': 'Bait And Switch',
      '/ConfirmShaming': 'Confirm Shaming',
      '/FakeActivity': 'Fake Activity',
      '/FakeCountdown': 'Fake Countdown',
      '/FakeHighDemand': 'Fake High Demand',
      '/FakeLimitedTime': 'Fake Limited Time',
      '/FakeLowStock': 'Fake LowStock',
      '/ForcedContinuity': 'Forced Continuity',
      '/HiddenCost': 'Hidden Cost',
      '/PrivacyZuckering': 'Privacy Zuckering',
      '/TrickQuestions': 'Trick Questions',
      '/example': 'Example',
      '/chrome-extension': 'Chrome Extension',
      '/about-us': 'About Us',
      '/report': 'Report',
    };
    const { location } = this.props;
    const pathSnippets = location.pathname.split('/').filter(i => i);
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      return (
        <Breadcrumb.Item key={url}>
          <Link to={url}>{breadcrumbNameMap[url]}</Link>
        </Breadcrumb.Item>
      );
    });
    const breadcrumbItems = [
      <Breadcrumb.Item key="home">
        <Link to="/">Home</Link>
      </Breadcrumb.Item>,
    ].concat(extraBreadcrumbItems)
    return (
      <Breadcrumb style={{width: '85%', margin:'0 auto'}}>{breadcrumbItems}</Breadcrumb>
    )
  }
}
