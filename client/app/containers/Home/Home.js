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
  onSubmit (e) {
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
          <img src="/assets/img/circle.png"alt="half-circle." className="half-circle1"/>




        <h3 className="shopping-web"> Dark patterns are especially used on <p>shopping</p> websites<img src="/assets/img/gouwuche.png"alt="half-circle." className="shoppingcart"/> <br /></h3>

        <img src="/assets/img/circle2.png"alt="half-circle." className="half-circle2"/>
<div className="content3">
  <h2>
    How to avoid it?
  </h2>
        <h3 className="content2">
          The highlighting of the devious dark patterns will allow the user to be aware
          of when he/she is being tricked or deceived. It will also provide information
          on how the dark pattern is considered a dark pattern which will educate the
          user, hopefully allowing them to recognize dark patterns in the future.
        </h3>
  <h1>
    This system will assist the user in various ways, such as:

  </h1>
  <b><u>Financially </u></b>
  <b><u>Emotionally</u></b>

</div>
        <h3>
          <br />
          <br />
          <p>
            <img src="/assets/img/MoneyStealing.png" alt="Figure with a money bag over the shoulder." id="MoneyMan" />
            <b><u>Financially </u></b> – It will highlight when the user might be tricked into

            adding extra items to their baskets or being pushed into buying the
            more expensive option. The dark patterns that fall into this category are:

            <ul>
              <li><b><mark>Sneak into baskets</mark></b></li>
              <li><b><mark>Hidden Costs</mark></b></li>
              <li><b><mark>Fake Countdown</mark></b></li>
              <li><b><mark>Fake Limited-time</mark></b></li>
              <li><b><mark>Fake High-demand</mark></b></li>
              <li><b><mark>Fake Low-Stock</mark></b></li>
            </ul>
          </p>
          <br />
          <p>
            <img src="/assets/img/Panic.jpg" alt="Man Panicing." id="Panic" />
            <b><u>Emotionally</u></b> - It will highlight the urgency of low stocks and fake
            countdowns and remind the user to relax and that more than likely
            the stock and countdown is fake. The dark patterns that fall into this category are:

            <ul>
              <li><b><mark>Confirmshaming</mark></b></li>
              <li><b><mark>Trick Questions</mark></b></li>
              <li><b><mark>Visual Interference</mark></b></li>
              <li><b><mark>Fake Countdown</mark></b></li>
              <li><b><mark>Fake Limited-time</mark></b></li>
              <li><b><mark>Fake High-demand</mark></b></li>
              <li><b><mark>Fake Low-Stock</mark></b></li>
            </ul>
          </p>

          <br />
          The following table will cateogrise the dark patterns: <br />
          <b><u>Note: The dark patterns in bold writing are the patterns our chrome extenion is able to detect for now.</u></b>
        </h3>
        <table>
          <tr>
            <th>Category</th>
            <th>Pattern Type</th>
            <th>Description</th>
          </tr>
          <tr>
            <td rowSpan="2">Sneaking</td>
            <td>Sneak into baskets</td>
            <td>When you try purchase sometihng online, but the site sneaks and additio item or price inot your basket.
            (e.g., You add a laptop to your basket, the site may automatically add the price of warranty to it too.)
            </td>
          </tr>
          <tr>
            <td>Hidden Costs</td>
            <td>When purcahsing an item, the site will hide the costs of such things as delievery or tax until you reach the checkout</td>
          </tr>

          <tr>
            <td>Forced Action</td>
            <td>Forced Continuity</td>
            <td>This is when the free trial you applied for comes to an end, and without warning, you get charged again for another subscription time length.
              (e.g. You sign up for a week free trial to premium shopping, then, if you have not cancelled your subscription, by next week you will be charged again, without warning)
            </td>
          </tr>

          <tr>
            <td rowSpan="3">Misdirection</td>
            <td>Confirmshaming</td>
            <td>Invoking language and emotion (shame)
              to convince users not to make a certain
              choice, or guilting users into opting into
              something.
              (e.g., “No thanks, I don’t want to save.”)</td>
          </tr>
          <tr>
            <td>Visual Interference</td>
            <td>Manipulation of the interface that the user will use in order to hide some information or actions
            (e.g., Autofilling a checkbox that will sign you up for useless emails, but the checkbox is hidden behind 1-2 dropdown menus.)
            </td>
          </tr>
          <tr>
            <td>Trick Questions </td>
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
            <td><b>Fake Countdown</b></td>
            <td>Using a countdown timer to alert users that a
              discount or deal is about to expire, which only
              purposely creates urgency for the purchase
              (e.g., “sale ends in 12h20m33s”)
            </td>
          </tr>
          <tr>
            <td><b>Fake Limited-time</b></td>
            <td>Giving users the impression that a deal or saleis
              only for a limited amount fo time or is about to
              expire soon, without stating a specific deadline.
              (e.g., “sale ends soon”, “only avaliable for a
              limited time”)
            </td>
          </tr>
          <tr>
            <td><b>Fake High-demand</b> </td>
            <td>Informing users that the product is in highdemand and will sell out soon, thereby making
              it more attractive to users.
              (e.g., “this item is in high demand”, “selling fast”)
            </td>
          </tr>

          <tr>
            <td>Social Proof</td>
            <td><b>Fake Activity</b></td>
            <td>Informing the user about other people’s activity
              on the website, including behavious of
              puchasing, viewing, visiting etc, which may not
              be truthful.
              (e.g., “3 people are viewing this item now”)
            </td>
          </tr>
          <tr>
            <td>Scarcity</td>
            <td><b>Fake Low-Stock</b></td>
            <td>Informing users about the limited availability of
              a product, making it more desirable to users.
              (e.g., “only 2 items left in stock”)</td>
          </tr>

          <tr>
            <td rowSpan="2">Other Dark Patterns</td>
            <td>Privacy Zuckering </td>
            <td>Sharing more information to the public than you orignally intended to do.
            (e.g., Messesnger set-up. It claims to ONLY "upload your contacts to connect you with friends" but not until you click the "Learn more" button you find out exactly what information is being used.
              (This info was used to push ads.))
            </td>
          </tr>
          <tr>
            <td>Bait and Switch</td>
            <td>When a user plans and expects one thing to happen, but something else happens instead.
            (e.g., In Microsoft's guide to upgrading to Windows 10. The "Ok" button was not actually the button that would upgrade the Windows although it seemed to be. )
            </td>
          </tr>

        </table>

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
