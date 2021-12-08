import React, { PureComponent as Component } from 'react';
import { connect } from 'react-redux';
import { Button, Layout, Menu, Icon, } from 'antd';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Link, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { ReportList, ReportNew  } from '../AdminReports'
import { CurrentModel, ModelTest, ModelTraining } from '../AdminModel'
import { ModelResources } from '../AdminS3'
import AdminHome from './AdminHome'
const { Content, Sider } = Layout
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
    const path = this.props.location.pathname
    console.log(path)
    return (
      <Layout className={"admin-index-layout"}>
        <Sider>
          <Menu
            onClick={this.handleClick}
            defaultSelectedKeys={[path]}
            defaultOpenKeys={['sub1', 'sub2', 'sub3']}
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
              <Menu.Item key="/admin/report-new">
                <Link to={'/admin/report-new'}>
                  Generate a New Report
                </Link>
              </Menu.Item>
              <Menu.Item key="/admin/report-list">
                <Link to={'/admin/report-list'}>
                  Reports from Extension
                </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="database" />
                  <span>
                    Model Management
                  </span>
                </span>
              }
            >
              {/*<Menu.Item key="/admin/current-model">*/}
              {/*  <Link to={'/admin/current-model'}>*/}
              {/*    Current Model*/}
              {/*  </Link>*/}
              {/*</Menu.Item>*/}
              <Menu.Item key="/admin/model-test">
                <Link to={'/admin/model-test'}>
                  Model Test
                </Link>
              </Menu.Item>
              <Menu.Item key="/admin/model-training">
                <Link to={'/admin/model-training'}>
                  Model Training
                </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub3"
              title={
                <span>
                  <Icon type="amazon" />
                  <span>S3</span>
                </span>
              }
            >
              <Menu.Item key="/admin/model-resources">
                <Link to={'/admin/model-resources'}>
                  Model Resources
                </Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{width: 'auto', backgroundImage:'none'}}>
          <Content style={{width: '100%'}}>
              <Switch>
                <Route path='/admin/report-list' component={ReportList} />
                <Route path='/admin/report-new' component={ReportNew} />
                <Route path='/admin/current-model' component={CurrentModel} />
                <Route path='/admin/model-test' component={ModelTest} />
                <Route path='/admin/model-training' component={ModelTraining} />
                <Route path='/admin/model-resources' component={ModelResources} />
                <Route component={AdminHome}>
                </Route>
              </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default Index;
