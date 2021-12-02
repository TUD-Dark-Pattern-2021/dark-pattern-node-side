import React, {PureComponent as Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Layout, Menu, Dropdown, message, Icon} from 'antd';
import { CSSTransition } from 'react-transition-group';

import {withRouter} from 'react-router';

const {Header} = Layout;
const {SubMenu} = Menu;
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
      showMask: false
    }
  }

  static propTypes = {
    login: PropTypes.bool,
    logoutActions: PropTypes.func,
    history: PropTypes.object,
    location: PropTypes.object,
    imgUrl: PropTypes.any,
  };

  toggleMenu = (isMobile, forceClose) => {
    if (forceClose) {
      this.setState({
        showMenu: false,
        showMask: false
      })
    } else if (isMobile) {
      this.setState({
        showMenu: !this.state.showMenu,
        showMask: !this.state.showMask
      })
    }
  }
  dropdown = () => {
    this.setState({
      showMenu: !this.state.showMenu
    })
  }

  menu = () => {
    return (
      <Menu overlayClassName={'test'}>
        <SubMenu title="Sneaking">
          <Menu.Item>
            <Link to="/SneakIntoBasket" onClick={() => this.toggleMenu(null, true)}>
              <img src="/assets/img/sneakintobasket1.png" alt="Sneak Into Basket." id="SneakIntoBasket"/>
              Sneak into baskets
            </Link>
          </Menu.Item>

          <Menu.Item>
            <Link to="/HiddenCost" onClick={() => this.toggleMenu(null, true)}>
              <img src="/assets/img/HC.png" alt="HiddenCosts." id="HiddenCosts"/>Hidden Costs
            </Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu title="Forced Action">
          <Menu.Item><Link to="/ForcedContinuity" onClick={() => this.toggleMenu(null, true)}>
              <img src="/assets/img/ForcedContinuity.png" alt="Forced Continuity."
                                                       id="ForcedContinuity" width="50px" height="30px"/>Forced
            Continuity</Link></Menu.Item>
        </SubMenu>
        <SubMenu title="Misdirection">
          <Menu.Item><Link to="/ConfirmShaming" onClick={() => this.toggleMenu(null, true)}>
              <img src="/assets/img/ConfirmShaming.png" alt="Confirmshaming."
                                                     id="Confirmshaming" width="50px"
                                                     height="30px"/>Confirmshaming</Link></Menu.Item>
          <Menu.Item><Link to="/VisualInterference" onClick={() => this.toggleMenu(null, true)}>
              <img src="/assets/img/SneakIntoBasket.png" alt="Sneak Into Basket."
                                                         id="SneakIntoBasket" float="right" width="50px" height="30px"/>Visual
            Interference</Link></Menu.Item>
          <Menu.Item><Link to="/TrickQuestions" onClick={() => this.toggleMenu(null, true)}>
              <img src="/assets/img/trickquestions1.png" alt="Trick Questions"
                                                     id="TrickQuestions" width="20%" height="20%"/>Trick
            Questions</Link></Menu.Item>
        </SubMenu>
        <SubMenu title="Urgency">
          <Menu.Item><Link to="/FakeCountdown" onClick={() => this.toggleMenu(null, true)}>
            <img src="/assets/img/SneakIntoBasket.png" alt="Sneak Into Basket."
                                                    id="SneakIntoBasket" float="right" width="50px" height="30px"/>Fake
            Countdown</Link></Menu.Item>
          <Menu.Item><Link to="/FakeHighDemand" onClick={() => this.toggleMenu(null, true)}><img src="/assets/img/SneakIntoBasket.png" alt="Sneak Into Basket."
                                                     id="SneakIntoBasket" float="right" width="50px" height="30px"/>Fake
            High-demand</Link></Menu.Item>
        </SubMenu>
        <SubMenu title="Social Proof">
          <Menu.Item><Link to="/FakeActivity" onClick={() => this.toggleMenu(null, true)}>
            <img src="/assets/img/SneakIntoBasket.png" alt="Sneak Into Basket."
                                                   id="SneakIntoBasket" float="right" width="50px" height="30px"/>Fake
            Activity</Link></Menu.Item>
        </SubMenu>
        <SubMenu title="Scarcity">
          <Menu.Item><Link to="/FakeLowStock" onClick={() => this.toggleMenu(null, true)}><img src="/assets/img/SneakIntoBasket.png" alt="Sneak Into Basket."
                                                   id="SneakIntoBasket" float="right" width="50px" height="30px"/>Fake
            Low-Stock</Link></Menu.Item>
        </SubMenu>
        <SubMenu title="Other Dark Patterns">
          <Menu.Item><Link to="/PrivacyZuckering" onClick={() => this.toggleMenu(null, true)}><img src="/assets/img/Zuckering.png" alt="Privacy Zuckering"
                                                       id="Zuckering" float="right" width="50px" height="30px"/>Privacy
            Zuckering</Link></Menu.Item>
          <Menu.Item><Link to="/BaitAndSwitch" onClick={() => this.toggleMenu(null, true)}><img src="/assets/img/Bait.png" alt="Mouse Trap." id="Bait" float="right"
                                                    width="50px" height="30px"/>Bait and Switch</Link></Menu.Item>
        </SubMenu>
      </Menu>
    )


  }

  getMenuList = (isMobile) => {
    return (<ul>
      <li onClick={() => this.toggleMenu(isMobile)}>
        <Link to="/">
          Home
        </Link>
      </li>
      <li>
        <Dropdown overlay={this.menu}>
          <a className="ant-dropdown-link">
            Introduction <Icon type="down"/>
          </a>
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
      <li onClick={() => this.toggleMenu(isMobile)}>
        <Link to="/example">
          Example
        </Link>
      </li>
      <li onClick={() => this.toggleMenu(isMobile)}>
        <Link to="/chrome-extension">
          Chrome Extension
        </Link>
      </li>
      <li onClick={() => this.toggleMenu(isMobile)}>
        <Link to="/about-us">
          About us
        </Link>
      </li>

      {
        isMobile &&
        <li onClick={() => this.toggleMenu(isMobile)}>
          <Link to="/report">
            Report to Us
          </Link>
        </li>
      }
    </ul>)
  }

  render() {
    const {login} = this.props;
    const { showMenu } = this.state
    return (
      <div>
        {
          this.props.location.pathname !== "/login" &&
          <Header>
            <Link to="/" className="logo" style={{margin: 0, width:'auto', height: 'auto'}}>
              <picture>
                <source media="(max-width: 1024px)" srcSet="/assets/img/logo-s.png"/>
                <img src="/assets/img/logo.png" alt="dp logo"/>
              </picture>
            </Link>


            <div className={'tabs'}>
              {this.getMenuList()}
              <Link to="/report" className="report">
                Report to Us
              </Link>
            </div>
            <Icon type="menu-fold" className={"mobile-menu-icon"} onClick={() => this.toggleMenu(true)}/>
            <div className={`menu-mask ${this.state.showMask ? 'active' : ''}`} onClick={() => this.toggleMenu(null, true)} />
            <CSSTransition
              classNames='mobile'
              in={showMenu}
              timeout={1000}
              unmountOnExit
            >
              <div className={'mobile-tabs'}>
                <div className={'show-menu'}>
                  <div onClick={this.toggleMenu} style={{height: 20, lineHeight: 1}}>`
                    <Icon type="close"/>
                  </div>
                  {this.getMenuList(true)}
                </div>
              </div>
            </CSSTransition>

            {
              login && this.props.location.pathname.indexOf('admin') > -1 && <UserToolBar/>
            }
          </Header>
        }
      </div>

    );
  }
}
