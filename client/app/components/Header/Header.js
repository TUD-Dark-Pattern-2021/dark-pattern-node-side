import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Layout, Menu, Dropdown, message, Icon} from 'antd';
import { withRouter } from 'react-router';
const { Header } = Layout;
import {logoutActions } from '../../reducer/modules/user'

let HeaderMenu = {
  profile: {
    path: '/profile',
    name: 'Profile',
  },
};

const MenuUser = props => (
  <Menu theme="dark" className="user-menu">
    {Object.keys(HeaderMenu).map(key => {
      let item = HeaderMenu[key];
      return (
        <Menu.Item key={key}>
            <Link to={item.path}>
              {item.name}
            </Link>
        </Menu.Item>
      );
    })}
    <Menu.Item key="9">
      <a onClick={props.logout}>
        Logout
      </a>
    </Menu.Item>
  </Menu>
);


MenuUser.propTypes = {
  user: PropTypes.string,
  msg: PropTypes.string
};

const ToolUser = props => {
  return (
      <div className="toolbar-li">
        <Dropdown
          placement="bottomCenter"
          // trigger={['click']}
          overlay={
            <MenuUser
              logout={props.logout}
            />
          }
          overlayClassName={"overlay"}
        >
          <a className="dropdown-link">
            <span>{props.email}</span>
            <span className="name">
             <Icon type="caret-down" />
            </span>
          </a>
        </Dropdown>
      </div>
  );
};
ToolUser.propTypes = {
  logout: PropTypes.func,
  imageUrl: PropTypes.any,
  uid: PropTypes.string
};

@connect(
  state => {
    return {
      email: state.user.email,
      uid: state.user.uid,
      login: state.user.isLogin,
    };
  },
  {
    logoutActions
  }
)
@withRouter
export default class HeaderCom extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    login: PropTypes.bool,
    logoutActions: PropTypes.func,
    history: PropTypes.object,
    location: PropTypes.object,
    imgUrl: PropTypes.any,
  };
  logout = e => {
    e.preventDefault();
    this.props
      .logoutActions()
      .then(res => {
        if (res.payload.data.errcode == 0) {
          this.props.history.push('/');
          message.success('log out success ');
        } else {
          message.error(res.payload.data.errmsg);
        }
      })
      .catch(err => {
        message.error(err);
      });
  };
  render() {
    const { login, uid, email } = this.props;
    return (
      <div>
        {
          this.props.location.pathname !== "/login" &&
          <Header>
            <Link to="/" className="logo">
              <img src="" alt="dp logo"/>
            </Link>
            <div
              className="user-toolbar"
            >
              {login ? (
                <ToolUser
                  uid={uid}
                  email={email}
                  logout={this.logout}
                />
              ) : (
                <Link to="/login" className="logo">
                  Sign in
                </Link>
              )}
            </div>
          </Header>
        }
      </div>

    );
  }
}
