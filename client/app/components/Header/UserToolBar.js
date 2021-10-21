import React, {PureComponent as Component} from "react";
import {connect} from "react-redux";
import {logoutActions} from "../../reducer/modules/user";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {Dropdown, Icon, message} from "antd";
import {MenuUser} from "./MenuUser";

@connect(
  state => {
    return {
      username: state.user.username,
      uid: state.user.uid,
    };
  },
  {
    logoutActions
  }
)

export default class UserToolBar extends Component {
  static propTypes = {
    username: PropTypes.string,
    uid: PropTypes.string,
    logoutActions: PropTypes.func,
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
    const { username } = this.props;
    return (
      <div
        className="user-toolbar"
      >
        <div className="toolbar-li">
          <Dropdown
            placement="bottomCenter"
            overlay={
              <MenuUser
                logout={this.logout}
              />
            }
            overlayClassName={"overlay"}
          >
            <a className="dropdown-link">
              <span>{username}</span>
              <span className="name">
             <Icon type="caret-down" />
            </span>
            </a>
          </Dropdown>
        </div>
      </div>
    )
  }
}
