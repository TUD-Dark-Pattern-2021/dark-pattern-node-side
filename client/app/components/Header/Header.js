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
        
          <Menu.Item><Link to="/SneakIntoBasket"><img src="/assets/img/sneakintobasket1.png" alt="Sneak Into Basket." id="SneakIntoBasket" />Sneak into baskets</Link></Menu.Item>
          
          <Menu.Item><Link to="/HiddenCost"><img src="/assets/img/HC.png" alt="HiddenCosts." id="HiddenCosts" />Hidden Costs</Link></Menu.Item>
        </SubMenu>
        <SubMenu title="Forced Action">
          <Menu.Item><Link to="/ForcedContinuity"><img src="/assets/img/ForcedContinuity.png" alt="Forced Continuity." id="ForcedContinuity"  width = "50px" height = "30px"/>Forced Continuity</Link></Menu.Item>
        </SubMenu>
        <SubMenu title="Misdirection">
          <Menu.Item><Link to="/ConfirmShaming"><img src="/assets/img/ConfirmShaming.png" alt="Confirmshaming." id="Confirmshaming"  width = "50px" height = "30px"/>Confirmshaming</Link></Menu.Item>
          <Menu.Item><Link to="/VisualInterference"><img src="/assets/img/SneakIntoBasket.png" alt="Sneak Into Basket." id="SneakIntoBasket" float= "right" width = "50px" height = "30px"/>Visual Interference</Link></Menu.Item>
          <Menu.Item><Link to="/TrickQuestions"><img src="/assets/img/trickquestions1.png" alt="Trick Questions" id="TrickQuestions"  width = "20%" height = "20%"/>Trick Questions</Link></Menu.Item>
        </SubMenu>
        <SubMenu title="Urgency">
        <Menu.Item><Link to="/FakeCountdown"><img src="/assets/img/SneakIntoBasket.png" alt="Sneak Into Basket." id="SneakIntoBasket" float= "right" width = "50px" height = "30px"/>Fake Countdown</Link></Menu.Item>
          <Menu.Item><Link to="/FakeHighDemand"><img src="/assets/img/SneakIntoBasket.png" alt="Sneak Into Basket." id="SneakIntoBasket" float= "right" width = "50px" height = "30px"/>Fake High-demand</Link></Menu.Item>
        </SubMenu>
        <SubMenu title="Social Proof">
          <Menu.Item><Link to="/FakeActivity"><img src="/assets/img/SneakIntoBasket.png" alt="Sneak Into Basket." id="SneakIntoBasket" float= "right" width = "50px" height = "30px"/>Fake Activity</Link></Menu.Item>
        </SubMenu>
        <SubMenu title="Scarcity">
          <Menu.Item><Link to="/FakeLowStock"><img src="/assets/img/SneakIntoBasket.png" alt="Sneak Into Basket." id="SneakIntoBasket" float= "right" width = "50px" height = "30px"/>Fake Low-Stock</Link></Menu.Item>
        </SubMenu>
        <SubMenu title="Other Dark Patterns">
          <Menu.Item><Link to="/PrivacyZuckering"><img src="/assets/img/Zuckering.png" alt="Privacy Zuckering" id="Zuckering" float= "right" width = "50px" height = "30px"/>Privacy Zuckering</Link></Menu.Item>
          <Menu.Item><Link to="/BaitAndSwitch"><img src="/assets/img/Bait.png" alt="Mouse Trap." id="Bait" float= "right" width = "50px" height = "30px"/>Bait and Switch</Link></Menu.Item>
        </SubMenu>
      </Menu>
    )

  
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
          <Link className="ant-dropdown-link">
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
        <Link to="/example">
          Example
        </Link>
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
