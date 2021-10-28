import React, { PureComponent as Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Layout, Spin} from 'antd'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { Home, Login, AdminIndex, AboutUs, Report, ChromeExtension, Introduction} from './containers/index';
import Header from './components/Header/Header';
import { checkLoginState } from './reducer/modules/user';
import { requireAuthentication } from './components/AuthenticatedComponent';
import NotFound from './components/NotFound'
import { hot } from 'react-hot-loader/root';
import Password from 'antd/lib/input/Password';

const LOADING_STATUS = 0;

@connect(
  state => {
    return {
      loginState: state.user.loginState,
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
      login: LOADING_STATUS
    };
  }

  static propTypes = {
    checkLoginState: PropTypes.func,
    loginState: PropTypes.number
  };

  componentDidMount() {
    this.props.checkLoginState();
  }

  route = status => {
    let r;
    if (status === LOADING_STATUS) {
      return <div className="loading-wrap">
        <Spin size="large" />
      </div>;
    } else {
      r = (
        <Router >
          <Layout className="layout">
            <Header />
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
