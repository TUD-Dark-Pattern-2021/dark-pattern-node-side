import React, { PureComponent as Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Layout, Menu, Icon } from 'antd';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
const { Content } = Layout
const { SubMenu  } = Menu

@connect(
  state => ({
    login: state.user.isLogin,
    // animeList: state.anime.list
  }),
  // {
  //   getAnimeList
  // }
)
@withRouter
class Index extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {

  }

  componentDidMount() {
  }
  static propTypes = {
    login: PropTypes.bool,
    // animeList: PropTypes.array,
    // getAnimeList: PropTypes.func
  };
  render() {
    return (
      <Content>
        <Menu
          onClick={this.handleClick}
          style={{ width: 256 }}
          defaultSelectedKeys={['10']}
          defaultOpenKeys={['sub1']}
          mode="inline"
        >
          <SubMenu
            key="sub1"
            title={
              <span>
              <Icon type="file-text" />
              <span>Reports Management</span>
            </span>
            }
          >
            <Menu.Item key="10">Generate a New Report</Menu.Item>
            <Menu.Item key="1">Reports from Extension</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span>
              <Icon type="database" />
              <span>Model Management</span>
            </span>
            }
          >
            <Menu.Item key="2">Current Model</Menu.Item>
            <Menu.Item key="3">Model Test</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub3"
            title={
              <span>
              <Icon type="solution" />
              <span>Logs</span>
            </span>
            }
          >
            <Menu.Item key="4">Training Logs</Menu.Item>
            <Menu.Item key="5">Option 2</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub4"
            title={
              <span>
              <Icon type="amazon" />
              <span>S3</span>
            </span>
            }
          >
            <Menu.Item key="6">Training Logs</Menu.Item>
            <Menu.Item key="7">Option 2</Menu.Item>
          </SubMenu>
        </Menu>
      </Content>
    );
  }
}

export default Index;
