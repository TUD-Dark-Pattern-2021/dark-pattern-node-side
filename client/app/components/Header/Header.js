import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Layout, Menu, Dropdown, message, Icon} from 'antd';

import { withRouter } from 'react-router';
const { Header } = Layout;
const { SubMenu } = Menu;
import UserToolBar from './UserToolBar'
import {connect} from "react-redux";

@connect(
  state => {
    return {
      login: state.user.isLogin,
    }
  },
)
@withRouter

export default class HeaderCom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
    }
  }

  static propTypes = {
    login: PropTypes.bool,
    logoutActions: PropTypes.func,
    history: PropTypes.object,
    location: PropTypes.object,
    imgUrl: PropTypes.any,
  };

  toggleMenu = () => {
    this.setState({
      showMenu: !this.state.showMenu
    })
  }
  dropdown = () => {
    this.setState({
      showMenu: !this.state.showMenu
    })
  }

  menu = () => {
    return (
      <Menu>
        <SubMenu title="Sneaking">
          <Menu.Item>Sneak into baskets</Menu.Item>
          <Menu.Item>Hidden Costs</Menu.Item>
        </SubMenu>
        <SubMenu title="Forced Action">
          <Menu.Item>Forced Continuity</Menu.Item>
        </SubMenu>
        <SubMenu title="Misdirection">
          <Menu.Item>Confirmshaming</Menu.Item>
          <Menu.Item>Visual Interference</Menu.Item>
          <Menu.Item>Trick Questions</Menu.Item>
        </SubMenu>
        <SubMenu title="Urgency">
        <Menu.Item>Fake Countdown</Menu.Item>
          <Menu.Item>Fake Limited-time</Menu.Item>
          <Menu.Item>Fake High-demand</Menu.Item>
        </SubMenu>
        <SubMenu title="Social Proof">
          <Menu.Item>Fake Activity</Menu.Item>
        </SubMenu>
        <SubMenu title="Scarcity">
          <Menu.Item>Fake Low-Stock</Menu.Item>
        </SubMenu>
        <SubMenu title="Other Dark Patterns">
          <Menu.Item>Privacy Zuckering</Menu.Item>
          <Menu.Item>Bait and Switch</Menu.Item>
        </SubMenu>
      </Menu>
    )

    // return (<Menu>
    //   <Menu.Item>
    //     <Link  to="/introduction"  onClick={this.toggleMenu}>
    //       Sneaking
    //     </Link>
    //   </Menu.Item>
    //   <Menu.Item>
    //     <Link  to="/introduction"  onClick={this.toggleMenu}>
    //     Forced Action	
    //     </Link>
    //   </Menu.Item>
    //   <Menu.Item>
    //     <Link  to="/introduction"  onClick={this.toggleMenu}>
    //     Misdirection
    //     </Link>
    //   </Menu.Item>
    // <Menu.Item>
    //     <Link  to="/introduction"  onClick={this.toggleMenu}>
    //     Urgency
    //     </Link>
    //   </Menu.Item>
    // <Menu.Item>
    //     <Link  to="/introduction"  onClick={this.toggleMenu}>
    //     Social Proof
    //     </Link>
    // </Menu.Item>
    // <Menu.Item>
    //     <Link  to="/introduction"  onClick={this.toggleMenu}>
    //     Scarcity
    //     </Link>
    // </Menu.Item>

    // </Menu>)
  }

  getMenuList = (isMobile) => {
    return (<ul>
      <li onClick={this.toggleMenu}>
        <Link to="/">
          Home
        </Link>
      </li>
      <li onClick={this.toggleMenu}>
        <Dropdown overlay={this.menu} >
          <Link to="/Introduction" className="ant-dropdown-link">
            Introduction <Icon type="down" />
          </Link>
        </Dropdown>

        {/*<Dropdown overlay={this.menu}>*/}
         {/* <Link to="/introduction">*/}
        {/*   Dark Pattern Introduction*/}
         {/* </Link>*/}
        {/*</Dropdown>}*/}

        {/*<Link to="/introduction">*/}
        {/*  Dark Pattern Introduction*/}
        {/*</Link>*/}

      </li>
      <li onClick={this.toggleMenu}>
        <Link to="/chrome-extension">
          Chrome Extension
        </Link>
      </li>
      <li onClick={this.toggleMenu}>
        <Link to="/about-us">
          About us
        </Link>
      </li>
      {
        isMobile &&
        <li onClick={this.toggleMenu}>
          <Link to="/report">
            Report to Us
          </Link>
        </li>
      }
    </ul>)
  }
  render() {
    const { login } = this.props;
    return (
      <div>
        {
          this.props.location.pathname !== "/login" &&
          <Header>
            <Link to="/" className="logo">
              <picture>
                  <source media="(max-width: 1024px)" srcSet="/assets/img/logo-s.png" />
                  <img src="/assets/img/logo.png" alt="dp logo"/>
              </picture>
            </Link>


            <div className={'tabs'}>
              {this.getMenuList()}
              <Link to="/report" className="report">
                Report to Us
              </Link>
            </div>


            <div className={'mobile-tabs'}>
              <Icon type="menu-fold" className={"mobile-menu-icon"} onClick={this.toggleMenu}/>
              <div className={this.state.showMenu ? 'show-menu' : ''}>
                <div onClick={this.toggleMenu} style={{height: 20, lineHeight: 1}}>`
                  <Icon type="close" />
                </div>
                {this.getMenuList(true)}
              </div>
            </div>
            {
              login && this.props.location.pathname.indexOf('admin') > -1 && <UserToolBar />
            }
          </Header>
        }
      </div>

    );
  }
}
