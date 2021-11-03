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
        <h1>
          <b><u>Dark Patterns</u></b>
        </h1>
        <h2>
          <b><u>What is a dark pattern?</u></b>
        </h2>

        <h3>Dark patterns are design elements, on webpages, that deliberately obscure, mislead, coerce and/or deceive website visitors into making unintended and possibly harmful choices. Dark patterns
          can be split into many categories. Dark patterns are especially used on shopping websites. The following table will cateogrise the dark patterns. <br />
          <b><u>Note: The dark patterns in bold writing are the patterns our chrome extenion is able to detect for now.</u></b>
        </h3>
        <table>
          <tr>
            <th>Category</th>
            <th>Pattern Type</th>
            <th>Description</th>
          </tr>
          <tr>
            <td rowSpan="3">Sneaking</td>
            <td>Sneak into baskets</td>
          </tr>
          <tr>
            <td>Hidden Costs</td>
          </tr>
          <tr>
            <td>Hidden Subscription </td>
          </tr>

          <tr>
            <td>Forced Action</td>
            <td>Forced Continuity</td>
          </tr>

          <tr>
            <td rowSpan="3">Misdirection</td>
            <td>Confirmshaming</td>
          </tr>
          <tr>
            <td>Visual Interference</td>
          </tr>
          <tr>
            <td>Trick Questions </td>
          </tr>


       

          <tr>
            <th rowSpan="3">Urgency</th>
            <td><b>Fake Countdown</b></td>
          </tr>
          <tr>
            <td><b>Fake Limited-time</b></td>
          </tr>
          <tr>
            <td><b>Fake High-demand</b> </td>
          </tr>

          <tr>
            <td>Social Proof</td>
            <td><b>Fake Activity</b></td>
          </tr>
          <tr>
            <td>Scarcity</td>
            <td><b>Fake Low-Stock</b></td>
          </tr>

          <tr>
            <td rowSpan="2">Other Dark Patterns</td>
            <td>Privacy Zuckering </td>
          </tr>
          <tr>
            <td>Bait and Switch</td>
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
        </div> */}
      </Content>
    );
  }
}

export default Home;
