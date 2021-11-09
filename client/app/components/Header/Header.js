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
          
          <Menu.Item><img src="/assets/img/SneakIntoBasket.png" alt="Sneak Into Basket." id="SneakIntoBasket" float= "right" width = "50px" height = "30px"/>Sneak into baskets</Menu.Item>
          <Menu.Item><img src="/assets/img/HiddenCosts.png" alt="HiddenCosts." id="HiddenCosts"  width = "50px" height = "30px"/>Hidden Costs</Menu.Item>
        </SubMenu>
        <SubMenu title="Forced Action">
          <Menu.Item><img src="/assets/img/ForcedContinuity.png" alt="Forced Continuity." id="ForcedContinuity"  width = "50px" height = "30px"/>Forced Continuity</Menu.Item>
        </SubMenu>
        <SubMenu title="Misdirection">
          <Menu.Item><img src="/assets/img/ConfirmShaming.png" alt="Confirmshaming." id="Confirmshaming"  width = "50px" height = "30px"/>Confirmshaming</Menu.Item>
          <Menu.Item><img src="/assets/img/SneakIntoBasket.png" alt="Sneak Into Basket." id="SneakIntoBasket" float= "right" width = "50px" height = "30px"/>Visual Interference</Menu.Item>
          <Menu.Item><img src="/assets/img/TrickQuestions.png" alt="Trick Questions" id="TrickQuestions"  width = "50px" height = "30px"/>Trick Questions</Menu.Item>
        </SubMenu>
        <SubMenu title="Urgency">
        <Menu.Item><img src="/assets/img/SneakIntoBasket.png" alt="Sneak Into Basket." id="SneakIntoBasket" float= "right" width = "50px" height = "30px"/>Fake Countdown</Menu.Item>
          <Menu.Item><img src="/assets/img/SneakIntoBasket.png" alt="Sneak Into Basket." id="SneakIntoBasket" float= "right" width = "50px" height = "30px"/>Fake Limited-time</Menu.Item>
          <Menu.Item><img src="/assets/img/SneakIntoBasket.png" alt="Sneak Into Basket." id="SneakIntoBasket" float= "right" width = "50px" height = "30px"/>Fake High-demand</Menu.Item>
        </SubMenu>
        <SubMenu title="Social Proof">
          <Menu.Item><img src="/assets/img/SneakIntoBasket.png" alt="Sneak Into Basket." id="SneakIntoBasket" float= "right" width = "50px" height = "30px"/>Fake Activity</Menu.Item>
        </SubMenu>
        <SubMenu title="Scarcity">
          <Menu.Item><img src="/assets/img/SneakIntoBasket.png" alt="Sneak Into Basket." id="SneakIntoBasket" float= "right" width = "50px" height = "30px"/>Fake Low-Stock</Menu.Item>
        </SubMenu>
        <SubMenu title="Other Dark Patterns">
          <Menu.Item><img src="/assets/img/Zuckering.png" alt="Privacy Zuckering" id="Zuckering" float= "right" width = "50px" height = "30px"/>Privacy Zuckering</Menu.Item>
          <Menu.Item><img src="/assets/img/Bait.png" alt="Mouse Trap." id="Bait" float= "right" width = "50px" height = "30px"/>Bait and Switch</Menu.Item>
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
