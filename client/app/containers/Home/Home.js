import React, { PureComponent as Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Layout } from 'antd';
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
        <div className="header-container">
          <div>
        <h1>
          Dark Patterns
        </h1>
        <h2>
          are design elements, on webpages, that deliberately obscure, mislead, force and/or deceive website visitors into making unintended and possibly harmful choices.

        </h2>

        </div>
          <img src="/assets/img/header-pic.png" alt="header-pic." id="header-pic" />
        </div>
        <div className="container1">
          <h3>Dark patterns can be split into many categories</h3>
        <div className="DP-category-container">
        <div>
        <img src="/assets/img/scarcity.png" alt="scarcity." id="scarcity-icon" />
        <h2>Scarcity </h2>
        </div>
        <div>
          <img src="/assets/img/forcedAction.png" alt="scarcity." id="forced-action-icon" />
        <h2>Forced Action </h2>
        </div>
        <div>
          <img src="/assets/img/misdirection.png" alt="scarcity." id="misdirection-icon" />
        <h2>Misdirection </h2>
        </div>
        <div>
          <img src="/assets/img/socialProof.png" alt="scarcity." id="social-proof-icon" />
        <h2>Social Proof </h2>
        </div>
        <div>
          <img src="/assets/img/scarcity.png" alt="scarcity." id="scarciy-icon" />
        <h2>Sneaking </h2>
        </div>
        <div>
          <img src="/assets/img/urgency.png" alt="scarcity." id="urgency-icon" />
        <h2>Urgency </h2>
        </div>
          </div>
        </div>
        <h3 className="shopping-web"> Dark patterns are especially used on <p>shopping</p> websites<br/><img src="/assets/img/gouwuche.png"alt="half-circle." className="shoppingcart"/> </h3>
        <div className="content3">
          <div className="half-circle2">

          <h2>
            The highlighting of the devious dark patterns will allow the user to be aware of when he/she is being tricked or deceived.
          </h2>
          </div>
          <div className="circle2-middle">
                <h3>
                  It will also provide information
                  on how the dark pattern is considered a dark pattern which will educate the
                  user, hopefully allowing them to recognize dark patterns in the future.<br/>


                </h3>
          </div>
          <div className="circle2-bottom">
          <h4>
            This system will assist the user in various ways, such as:
          </h4>
          </div>


        </div>
        <div className="content4-container">
        <div className="content4">
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
            <a to="/SneakIntoBasket"><img src="/assets/img/jump.png" /><b>Sneak into baskets</b>
              </a>
          </div>
          <div className="group-financially"><a href="/HiddenCost"><img src="/assets/img/jump.png" /><b>Hidden Costs</b></a></div>
          <div className="group-financially"><a href="/FakeCountdown"><img src="/assets/img/jump.png" /><b>Fake Countdown</b></a></div>
          <div className="group-financially"><a href="/FakeLimitedTime"><img src="/assets/img/jump.png" /><b>Fake Limited-time</b></a></div>
          <div className="group-financially"><a href="/FakeHighDemand"><img src="/assets/img/jump.png" /><b>Fake High-demand</b></a></div>
          <div className="group-financially"><a href="/FakeLowStock"><img src="/assets/img/jump.png" /><b>Fake Low-Stock</b></a></div>
        </div>
        </div>

  <div className="content4">
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
    <div className="content4-bottom-emotionally">
      <div className="group-financially"><Link to="/ConfirmShaming"><img src="/assets/img/jump.png" /><b>Confirmshaming</b></Link></div>
      <div className="group-financially"><Link to="/TrickQuestions"><img src="/assets/img/jump.png" /><b>Trick Questions</b></Link></div>
      <div className="group-financially"><Link to="/VisualInterference"><img src="/assets/img/jump.png" /><b>Visual Interference</b></Link></div>
      <div className="group-financially"><Link to="/FakeLimitedTime"><img src="/assets/img/jump.png" /><b>Fake Limited Time</b></Link></div>
      <div className="group-financially"><Link to="/FakeCountdown"><img src="/assets/img/jump.png" /><b>Fake Countdown</b></Link></div>
      <div className="group-financially"><Link to="/FakeHighDemand"><img src="/assets/img/jump.png" /><b>Fake High-demand</b></Link></div>
      <div className="group-financially"><Link to="/FakeLowStock"><img src="/assets/img/jump.png" /><b>Fake Low-Stock</b></Link></div>
    </div>
  </div>
        </div>
<div className="content-table">
        <h3 className="table-header">
          The following table will cateogrise the dark patterns: <br />
          <p><u>Note: The dark patterns in bold writing are the patterns our chrome extenion is able to detect for now.</u></p>
        </h3>

  <div className="category-table-sneaking">
    <div className="category-sneakinto">
      <p>Sneaking</p>
    </div>
    <div className="pattern-type-sneakinto">
      <img src="/assets/img/sneakintobasket1.png" alt="test." id="Panic" />
    </div>
    <div className="description-sneakinto">
      When you try purchase sometihng online, but the site sneaks and additio item or price inot your basket.
      (e.g., You add a laptop to your basket, the site may automatically add the price of warranty to it too.)
    </div>
    <div className="pattern-type-hiddencost">
      <img src="/assets/img/hiddenCost.png" alt="test." id="Panic" />
    </div>
    <div className="description-hiddencost">
      When purcahsing an item, the site will hide the costs of such things as delievery or tax until you reach the checkout
    </div>
  </div>



  <div className="category-table-forcedAction">
    <div className="category-forcedaction">
      <p>Forced Action</p>
    </div>
    <div className="pattern-type-forcedaction">
      <h1>forced action</h1>
    </div>
    <div className="description-forcedaction">
      This is when the free trial you applied for comes to an end, and without warning, you get charged again for another subscription time length.
      (e.g. You sign up for a week free trial to premium shopping, then, if you have not cancelled your subscription, by next week you will be charged again, without warning)
    </div>
  </div>


  <div className="category-table-misdirection">
    <div className="category-confirmshaming">
      <p>Misdirection</p>
    </div>
    <div className="pattern-type-confirmshaming">
      confirmshaming
    </div>
    <div className="description-confirmshaming">
      Invoking language and emotion (shame) to convince users not to make a certain choice, or guilting users into opting into something. (e.g., “No thanks, I don’t want to save.”)
    </div>
    <div className="pattern-type-visualinterference">
      visual interference

    </div>
    <div className="description-visualinterference">
      Manipulation of the interface that the user will use in order to hide some information or actions (e.g., Autofilling a checkbox that will sign you up for useless emails, but the checkbox is hidden behind 1-2 dropdown menus.)
    </div>

    <div className="pattern-type-trickquestions">
      <img src="/assets/img/trickquestions1.png" alt="test." id="Panic" />
    </div>
    <div className="description-trickquestions">
      Misleading users to make certain decisions based on the usage of confusing language, for example, using long and complicated double negative sentences. (e.g., “If you do not wish to be contacted via email, please ensure that the box is not checked.”)
    </div>

  </div>




  <div className="category-table-Urgency">
    <div className="category-fakecountdown">
      <p>Urgency</p>
    </div>
    <div className="pattern-type-fakecountdown">
      fake countdown
    </div>
    <div className="description-fakecountdown">
      Invoking language and emotion (shame) to convince users not to make a certain choice, or guilting users into opting into something. (e.g., “No thanks, I don’t want to save.”)
    </div>
    <div className="pattern-type-fakelimitedtime">
      fake limited time
    </div>
    <div className="description-fakelimitedtime">
      Manipulation of the interface that the user will use in order to hide some information or actions (e.g., Autofilling a checkbox that will sign you up for useless emails, but the checkbox is hidden behind 1-2 dropdown menus.)
    </div>

    <div className="pattern-type-fakehighdemand">
      fake high demand
    </div>
    <div className="description-fakehighdemand">
      Misleading users to make certain decisions based on the usage of confusing language, for example, using long and complicated double negative sentences. (e.g., “If you do not wish to be contacted via email, please ensure that the box is not checked.”)
    </div>

  </div>



  <div className="category-table-SocialProof">
    <div className="category-fakeactivity">
      <p>Social Proof</p>
    </div>
    <div className="pattern-type-fakeactivity">
      fake activity
    </div>
    <div className="description-fakeactivity">
      Informing the user about other people’s activity on the website, including behavious of puchasing, viewing, visiting etc, which may not be truthful. (e.g., “3 people are viewing this item now”)
    </div>
  </div>



  <div className="category-table-Scarcity">
    <div className="category-fakelowstock">
      <p>Scarcity</p>
    </div>
    <div className="pattern-type-fakelowstock">
      fake low stock
    </div>
    <div className="description-fakelowstock">
      Informing the user about other people’s activity on the website, including behavious of puchasing, viewing, visiting etc, which may not be truthful. (e.g., “3 people are viewing this item now”)
    </div>
  </div>

  <div className="category-table-otherDP">
    <div className="category-privacyzuckering">
      <p>Other Dark Patterns</p>
    </div>
    <div className="pattern-type-privacyzuckering">
      privacy zuckering
    </div>
    <div className="description-privacyzuckering">
      Sharing more information to the public than you orignally intended to do. (e.g., Messesnger set-up. It claims to ONLY "upload your contacts to connect you with friends" but not until you click the "Learn more" button you find out exactly what information is being used. (This info was used to push ads.)
    </div>
    <div className="pattern-type-baitandswitch">
      bait and switch
    </div>
    <div className="description-baitandswitch">
      When a user plans and expects one thing to happen, but something else happens instead. (e.g., In Microsoft's guide to upgrading to Windows 10. The "Ok" button was not actually the button that would upgrade the Windows although it seemed to be. )
    </div>
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
</div>


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
      </Content>
    );
  }
}

export default Home;
