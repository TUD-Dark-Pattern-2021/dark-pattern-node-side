import React, { PureComponent as Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Layout,Row,Col } from 'antd';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
const { Content } = Layout

@connect(
  state => ({
    login: state.user.isLogin,
  }),
)
@withRouter
class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {

  }

  componentDidMount() {
  }
  static propTypes = {
    login: PropTypes.bool,
  };
  onSubmit(e) {
    e.preventDefault()
    window.alert(e.target.url.value)
  }
  render() {
    return (
      <Content className={'index-content'}>
        <Row  className="header-container"  >
          <Col   xs={24}  sm={24} md={14} lg={14}  >
            <h1>
              Dark Patterns
            </h1>
            <h2>
              are design elements, on webpages, that deliberately obscure, mislead, force and/or deceive website visitors into making unintended and possibly harmful choices.
            </h2>
          </Col>
          <Col   xs={0}  sm={0} md={10} lg={10}   >
            <img src="/assets/img/header-pic.png" alt="header-pic." id="header-pic" />
          </Col>
        </Row>
        <Row  className="container1" type="flex" justify="center">
          <Col span={24}>
            <h3>Dark patterns can be split into many categories</h3>
          </Col>
          <Row  className="DP-category-container" type="flex" justify="center">
            <Col  xs={12}  sm={12} md={4} lg={4} className="container-category">
              <img src="/assets/img/scarcity.png" alt="scarcity." id="scarcity-icon" />
              <h2>Scarcity </h2>
            </Col>
            <Col xs={12}  sm={12} md={4} lg={4} className="container-category">
              <img src="/assets/img/forcedAction.png" alt="scarcity." id="forced-action-icon" />
              <h2>Forced Action </h2>
            </Col>
            <Col xs={12}  sm={12} md={4} lg={4} className="container-category">
              <img src="/assets/img/misdirection.png" alt="scarcity." id="misdirection-icon" />
              <h2>Misdirection </h2>
            </Col>
            <Col xs={12}  sm={12} md={4} lg={4} className="container-category">
              <img src="/assets/img/socialProof.png" alt="scarcity." id="social-proof-icon" />
              <h2>Social Proof </h2>
            </Col>
            <Col xs={12}  sm={12} md={4} lg={4} className="container-category">
              <img src="/assets/img/scarcity.png" alt="scarcity." id="scarciy-icon" />
              <h2>Sneaking </h2>
            </Col>
            <Col xs={12}  sm={12} md={4} lg={4}  className="container-category">
              <img src="/assets/img/urgency.png" alt="scarcity." id="urgency-icon" />
              <h2>Urgency </h2>
            </Col>
          </Row>
        </Row>
        <Row type="flex" justify="center">
          <Col xs={24}  sm={24} md={24} lg={24}>
            <h3 className="shopping-web">
              Dark patterns are especially used on
              <p>shopping</p>
              websites
              <br/>
              <img src="/assets/img/gouwuche.png"alt="half-circle." className="shoppingcart"/>
            </h3>
          </Col>
        </Row>
        <Row className="content3" type="flex" justify="space-around">
          <Col   xs={24}  sm={24} md={24} lg={24}>
            <h2>
              The highlighting of the devious dark patterns will allow the user to be aware of when he/she is being tricked or deceived.
            </h2>
          </Col>
          <Col className="circle2-middle" xs={24}  sm={24} md={24} lg={24}>
            <h3>
              It will also provide information
              on how the dark pattern is considered a dark pattern which will educate the
              user, hopefully allowing them to recognize dark patterns in the future.
              <br/>
            </h3>
          </Col>
          <Col className="circle2-bottom" xs={24}  sm={24} md={24} lg={24}>
            <h4>
              This system will assist the user in various ways, such as:
            </h4>
          </Col>
        </Row>
        <Row className="content4-container" >
          <Col className="content4" xs={24}  sm={24} md={12} lg={12}>
            <div className="content4-top">
              <div className="content4-top-topic">
                <img src="/assets/img/MoneyStealing.png" alt="Figure with a money bag over the shoulder." id="MoneyMan" />
                <h1><b>Financially </b></h1>
              </div>
              <p>
                It will highlight when the user might be tricked into
                adding extra items to their baskets or being pushed into buying the
                more expensive option. The dark patterns that fall into this category are:
              </p>
            </div>
            <div className="content4-bottom">
              <div className="group-financially">
                <Link to="/SneakIntoBasket">

                  <b>Sneak into baskets</b>
                </Link>
              </div>
              <div className="group-financially"><Link to="/HiddenCost"><b>Hidden Costs</b></Link></div>
              <div className="group-financially"><Link to="/FakeCountdown"><b>Fake Countdown</b></Link></div>
              <div className="group-financially"><Link to="/FakeLimitedTime"><b>Fake Limited-time</b></Link></div>
              <div className="group-financially"><Link to="/FakeHighDemand"><b>Fake High-demand</b></Link></div>
              <div className="group-financially"><Link to="/FakeLowStock"><b>Fake Low-Stock</b></Link></div>
            </div>
          </Col>

          <Col className="content4" xs={24}  sm={24} md={12} lg={12}>
            <div className="content4-top">
              <div className="content4-top-topic">
                <img src="/assets/img/Panic.jpg" alt="Man Panicing." id="Panic" />
                <h1><b>Emotionally </b></h1>
              </div>
              <p>
                It will highlight the urgency of low stocks and fake countdowns and remind the user to relax and that more than likely
                the stock and countdown is fake. The dark patterns that fall into this category are:

              </p>
            </div>
            <div className="content4-bottom">
              <div className="group-financially"><Link to="/ConfirmShaming"><b>Confirmshaming</b></Link></div>
              <div className="group-financially"><Link to="/TrickQuestions"><b>Trick Questions</b></Link></div>
              <div className="group-financially"><Link to="/VisualInterference"><b>Visual Interference</b></Link></div>
              <div className="group-financially"><Link to="/FakeLimitedTime"><b>Fake Limited Time</b></Link></div>
              <div className="group-financially"><Link to="/FakeCountdown"><b>Fake Countdown</b></Link></div>
              <div className="group-financially"><Link to="/FakeHighDemand"><b>Fake High-demand</b></Link></div>
              <div className="group-financially"><Link to="/FakeLowStock"><b>Fake Low-Stock</b></Link></div>
            </div>
          </Col>
        </Row>
        <Row className="content-table">
          <Col className="content-table table">
            <h3 className="table-header">
              The following table will cateogrise the dark patterns: <br />
              <p><u>Note: The dark patterns in bold writing are the patterns our chrome extenion is able to detect for now.</u></p>
            </h3>

          </Col>
          <div style={{overflow:"scroll", width: '100%'}}>
            <table >
              <tr>
                <td colSpan={1} rowSpan={2} style={{width: '25%'}}>
                  Sneaking
                </td>
                <td style={{width: '15%'}}>
                  <img src="/assets/img/1sneakintoBasket.png" alt="test." />
                </td>
                <td style={{width: '60%'}}>When you try purchase sometihng online, but the site sneaks and additio item or price inot your basket.
                  (e.g., You add a laptop to your basket, the site may automatically add the price of warranty to it too.)</td>
              </tr>
              <tr>
                <td style={{width: '15%'}}><img src="/assets/img/1HiddenCost.png" alt="test." /></td>
                <td style={{width: '60%'}}>When purcahsing an item, the site will hide the costs of such things as delievery or tax until you reach the checkout</td>
              </tr>
            </table >

            <table >
              <tr>
                <td colSpan={1} rowSpan={2} style={{width: '25%'}}>
                  Forced Action
                </td>
                <td style={{width: '15%'}}>
                  <img src="/assets/img/1ForcedContinuity.png" alt="test." />
                </td>
                <td style={{width: '60%'}}> This is when the free trial you applied for comes to an end, and without warning, you get charged again for another subscription time length.
                  (e.g. You sign up for a week free trial to premium shopping, then, if you have not cancelled your subscription, by next week you will be charged again, without warning)
                </td>
              </tr>
            </table>

            <table>
              <tr>
                <td colSpan={1} rowSpan={3} style={{width: '25%'}}>
                  Misdirection
                </td>
                <td style={{width: '15%'}}>
                  <img src="/assets/img/1Conformshaming.png" alt="test." />
                </td>
                <td style={{width: '60%'}}>Invoking language and emotion (shame) to convince users not to make a certain choice, or guilting users into opting into something. (e.g., “No thanks, I don’t want to save.”)
                </td>
              </tr>
              <tr>
                <td style={{width: '15%'}}>
                  <img src="/assets/img/1visualInterface.png" alt="test." />
                </td>
                <td style={{width: '60%'}}>  Manipulation of the interface that the user will use in order to hide some information or actions (e.g., Autofilling a checkbox that will sign you up for useless emails, but the checkbox is hidden behind 1-2 dropdown menus.)
                </td>
              </tr>
              <tr>
                <td style={{width: '15%'}}> <img src="/assets/img/1TrickQuestion.png" alt="test." /></td>
                <td style={{width: '60%'}}>
                  Misleading users to make certain decisions based on the usage of confusing language, for example, using long and complicated double negative sentences. (e.g., “If you do not wish to be contacted via email, please ensure that the box is not checked.”)
                </td>
              </tr>
            </table>
            <table>
            <tr>
              <td colSpan={1} rowSpan={3} style={{width: '25%'}}>
                Urgency
              </td>
              <td style={{width: '15%'}}>
                <img src="/assets/img/1FakeCountdown.png" alt="test." />
              </td>
              <td style={{width: '60%'}}>
                Invoking language and emotion (shame) to convince users not to make a certain choice, or guilting users into opting into something. (e.g., “No thanks, I don’t want to save.”)
              </td>
            </tr>
            <tr>
              <td style={{width: '15%'}}> <img src="/assets/img/1FakeLimitedTime.png" alt="test." /></td>
              <td style={{width: '60%'}}>  Manipulation of the interface that the user will use in order to hide some information or actions (e.g., Autofilling a checkbox that will sign you up for useless emails, but the checkbox is hidden behind 1-2 dropdown menus.)
              </td>
            </tr>
              <tr>
                <td style={{width: '15%'}}>  <img src="/assets/img/1FakeHighdemand.png" alt="test." /></td>
                <td style={{width: '60%'}}>
                  Misleading users to make certain decisions based on the usage of confusing language, for example, using long and complicated double negative sentences. (e.g., “If you do not wish to be contacted via email, please ensure that the box is not checked.”)
                </td>
              </tr>
          </table>
            <table>
            <tr>
              <td colSpan={1} rowSpan={2} style={{width: '25%'}}>
                Social Proof
              </td>
              <td style={{width: '15%'}}>
                <img src="/assets/img/1FakeActivity.png" alt="test." />
              </td>
              <td style={{width: '60%'}}>  Informing the user about other people’s activity on the website, including behavious of puchasing, viewing, visiting etc, which may not be truthful. (e.g., “3 people are viewing this item now”)
              </td>
            </tr>
          </table>
            <table>
            <tr>
              <td colSpan={1} rowSpan={2} style={{width: '25%'}}>
                Scarcity
              </td>
              <td style={{width: '15%'}}>
                <img src="/assets/img/1Fakelowstock.png" alt="test." />
              </td>
              <td style={{width: '60%'}}>  Informing the user about other people’s activity on the website, including behavious of puchasing, viewing, visiting etc, which may not be truthful. (e.g., “3 people are viewing this item now”)
              </td>
            </tr>
          </table>
            <table>
            <tr>
              <td colSpan={1} rowSpan={2} style={{width: '25%'}}>
                Other Dark Patterns
              </td>
              <td style={{width: '15%'}}>
                <img src="/assets/img/1PrivacyZuckering.png" alt="test." />
              </td>
              <td style={{width: '60%'}}>
                Sharing more information to the public than you orignally intended to do. (e.g., Messesnger set-up. It claims to ONLY "upload your contacts to connect you with friends" but not until you click the "Learn more" button you find out exactly what information is being used. (This info was used to push ads.)
              </td>
            </tr>
            <tr>
              <td style={{width: '15%'}}>
                <img src="/assets/img/1BaitAndSwitch.png" alt="test." />
              </td>
              <td style={{width: '60%'}}>  When a user plans and expects one thing to happen, but something else happens instead. (e.g., In Microsoft's guide to upgrading to Windows 10. The "Ok" button was not actually the button that would upgrade the Windows although it seemed to be. )
              </td>
            </tr>
          </table>
          </div>
          {/*
  <table>


          <tbody>

          <tr>
            <th>Category</th>
            <th>Pattern Type</th>
            <th>Description</th>
          </tr>
          <tr>
            <td rowSpan="2">Sneaking</td>
            <td><img src="/assets/img/SneakIntoBasket.png" alt="Sneak Into Basket." id="SneakIntoBasket"  width = "50px" height = "30px"/>Sneak into baskets</td>
            <td>When you try purchase sometihng online, but the site sneaks and additio item or price inot your basket.
            (e.g., You add a laptop to your basket, the site may automatically add the price of warranty to it too.)
            </td>
          </tr>
          <tr>
            <td><img src="/assets/img/HiddenCosts.png" alt="HiddenCosts." id="HiddenCosts"  width = "50px" height = "30px"/>Hidden Costs</td>
            <td>When purcahsing an item, the site will hide the costs of such things as delievery or tax until you reach the checkout</td>
          </tr>

          <tr>
            <td>Forced Action</td>
            <td><img src="/assets/img/ForcedContinuity.png" alt="Forced Continuity." id="ForcedContinuity"  width = "50px" height = "30px"/>Forced Continuity</td>
            <td>This is when the free trial you applied for comes to an end, and without warning, you get charged again for another subscription time length.
              (e.g. You sign up for a week free trial to premium shopping, then, if you have not cancelled your subscription, by next week you will be charged again, without warning)
            </td>
          </tr>

          <tr>
            <td rowSpan="3">Misdirection</td>
            <td><img src="/assets/img/ConfirmShaming.png" alt="Confirmshaming." id="Confirmshaming"  width = "50px" height = "30px"/>Confirmshaming</td>
            <td>Invoking language and emotion (shame)
              to convince users not to make a certain
              choice, or guilting users into opting into
              something.
              (e.g., “No thanks, I don’t want to save.”)</td>
          </tr>
          <tr>
            <td><img src="/assets/img/SneakIntoBasket.png" alt="Sneak Into Basket." id="SneakIntoBasket"  width = "50px" height = "30px"/>Visual Interference</td>
            <td>Manipulation of the interface that the user will use in order to hide some information or actions
            (e.g., Autofilling a checkbox that will sign you up for useless emails, but the checkbox is hidden behind 1-2 dropdown menus.)
            </td>
          </tr>
          <tr>
            <td><img src="/assets/img/TrickQuestions.png" alt="Trick Questions" id="TrickQuestions"  width = "50px" height = "30px"/>Trick Questions </td>
            <td>Misleading users to make certain
              decisions based on the usage of confusing
              language, for example, using long and
              complicated double negative sentences.
              (e.g., “If you do not wish to be contacted
              via email, please ensure that the box is not
              checked.”)
            </td>
          </tr>

          <tr>
            <th rowSpan="3">Urgency</th>
            <td><b><img src="/assets/img/SneakIntoBasket.png" alt="Sneak Into Basket." id="SneakIntoBasket"  width = "50px" height = "30px"/>Fake Countdown</b></td>
            <td>Using a countdown timer to alert users that a
              discount or deal is about to expire, which only
              purposely creates urgency for the purchase
              (e.g., “sale ends in 12h20m33s”)
            </td>
          </tr>
          <tr>
            <td><b><img src="/assets/img/SneakIntoBasket.png" alt="Sneak Into Basket." id="SneakIntoBasket"  width = "50px" height = "30px"/>Fake Limited-time</b></td>
            <td>Giving users the impression that a deal or saleis
              only for a limited amount fo time or is about to
              expire soon, without stating a specific deadline.
              (e.g., “sale ends soon”, “only avaliable for a
              limited time”)
            </td>
          </tr>
          <tr>
            <td><b><img src="/assets/img/SneakIntoBasket.png" alt="Sneak Into Basket." id="SneakIntoBasket"  width = "50px" height = "30px"/>Fake High-demand</b> </td>
            <td>Informing users that the product is in highdemand and will sell out soon, thereby making
              it more attractive to users.
              (e.g., “this item is in high demand”, “selling fast”)
            </td>
          </tr>

          <tr>
            <td>Social Proof</td>
            <td><b><img src="/assets/img/SneakIntoBasket.png" alt="Sneak Into Basket." id="SneakIntoBasket"  width = "50px" height = "30px"/>Fake Activity</b></td>
            <td>Informing the user about other people’s activity
              on the website, including behavious of
              puchasing, viewing, visiting etc, which may not
              be truthful.
              (e.g., “3 people are viewing this item now”)
            </td>
          </tr>
          <tr>
            <td>Scarcity</td>
            <td><b><img src="/assets/img/SneakIntoBasket.png" alt="Sneak Into Basket." id="SneakIntoBasket" float= "right" width = "50px" height = "30px"/>Fake Low-Stock</b></td>
            <td>Informing users about the limited availability of
              a product, making it more desirable to users.
              (e.g., “only 2 items left in stock”)</td>
          </tr>

          <tr>
            <td rowSpan="2">Other Dark Patterns</td>
            <td><img src="/assets/img/Zuckering.png" alt="Privacy Zuckering" id="Zuckering" float= "right" width = "50px" height = "30px"/>Privacy Zuckering </td>
            <td>Sharing more information to the public than you orignally intended to do.
            (e.g., Messesnger set-up. It claims to ONLY "upload your contacts to connect you with friends" but not until you click the "Learn more" button you find out exactly what information is being used.
              (This info was used to push ads.))
            </td>
          </tr>
          <tr>
            <td><img src="/assets/img/Bait.png" alt="Mouse Trap" id="Bait" float= "right" width = "50px" height = "30px"/>Bait and Switch</td>
            <td>When a user plans and expects one thing to happen, but something else happens instead.
            (e.g., In Microsoft's guide to upgrading to Windows 10. The "Ok" button was not actually the button that would upgrade the Windows although it seemed to be. )
            </td>
          </tr>


        </table>*/}



          {/* <div>
          <form action="" onSubmit={this.onSubmit}>
            <div>
              <input type="url" name="url" placeholder={'Enter Websites URL'}/>
              <button type={'submit'} >
                <img src="/assets/img/search.png" alt=""/>
              </button>
            </div>

          </form>
        </div>*/}
        </Row>
      </Content>
    );
  }
}

export default Home;
