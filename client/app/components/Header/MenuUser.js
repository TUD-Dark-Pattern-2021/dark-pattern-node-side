import {Menu} from "antd";
import PropTypes from "prop-types";
import React from "react";

export const MenuUser = props => (
  <Menu theme="dark" className="user-menu">
    <Menu.Item key="9">
      <a onClick={props.logout}>
        Logout
      </a>
    </Menu.Item>
  </Menu>
);

MenuUser.propTypes = {
  logout: PropTypes.func,
};
