import React, { PureComponent as Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Breadcrumb, Layout, Spin} from 'antd'
import {Route, BrowserRouter as Router, Switch, Link} from 'react-router-dom';
import { Home, Login, AdminIndex, AboutUs, Report, ChromeExtension, Introduction} from './containers/index';
import Header from './components/Header/Header';
import { checkLoginState } from './reducer/modules/user';
import { requireAuthentication } from './components/AuthenticatedComponent';
import NotFound from './components/NotFound'
import { hot } from 'react-hot-loader/root';

const LOADING_STATUS = 0;

@connect(
  state => {
    return {
      loginState: state.user.loginState,
      isLogin: state.user.isLogin
    };
  },
  {
    checkLoginState
  }
)
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: LOADING_STATUS,
      isHome: window.location.pathname === '/'
    };
  }

  static propTypes = {
    checkLoginState: PropTypes.func,
    isLogin: PropTypes.bool,
    loginState: PropTypes.number
  };

  componentDidMount() {
    this.props.checkLoginState();
  }


  route = status => {
    let r;
    console.log(this.props)
    if (status === LOADING_STATUS) {
      return <div className="loading-wrap">
        <Spin size="large" />
      </div>;
    } else {
      r = (
        <Router >
          <Layout className={{layout: true, 'admin-layout': window.location.pathname.indexOf('admin')>-1}}>
            <Header />
            <Breadcrumb>
                <Breadcrumb.Item href="">
                  <Link to="/">
                    Home
                  </Link>
                </Breadcrumb.Item>

                <Breadcrumb.Item>Introduction</Breadcrumb.Item>
            </Breadcrumb>
            <Switch>
              <Route path='/login' component={Login} />
              <Route path='/' exact component={Home} />
              <Route path='/introduction' exact component={Introduction} />
              <Route path='/chrome-extension' exact component={ChromeExtension} />
              <Route path='/about-us' exact component={AboutUs} />
              <Route path='/report' exact component={Report} />
              <Route path='/admin/:path' exact component={requireAuthentication(AdminIndex)}/>
              <Route component={NotFound} />
            </Switch>
          </Layout>
        </Router>
      );
    }
    return r;
  };

  render() {
    return this.route(this.props.loginState);
  }
}

export default hot(App)
