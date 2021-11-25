import React, { PureComponent as Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Layout, Breadcrumb, Icon, Carousel } from 'antd';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
const { Content } = Layout

@connect(
  state => ({
    login: state.user.isLogin,
  }),
)
@withRouter
class HiddenCosts extends Component {
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
      <Content className={'introduction-content'}>
        <h1 >

          What is Hidden Costs?

        </h1>
        
        {/*<h2 >
          What is Hidden Costs?
          
        </h2>*/}
        <br/>
        <div className={'intro-container'}>
          <div className={'introLeft'}>
        <p>
        When purcahsing an item, the site will hide the costs of such things as delievery or tax until you reach the checkout</p>
          </div>
          <div className={'introImg'}>
            <img src="/assets/img/hiddenCost.png" alt="Sneak Into Basket." id="SneakIntoBasket" />
          </div>
        </div>
        <div className={'bottomVideoContainer'}>
          <div className="circleDecoration">

          </div>


          <p>
            Introducing Hidden Costs
          </p>


          <div className={'youtube-video'}>
          <iframe src="https://www.youtube.com/embed/1xJW-_DRkHM" title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen></iframe>

        </div>
        </div>

        <p>Here are some examples of Hidden Costs:</p>
        <hr/>

        <Carousel  autoplay>
        <div className={'Slider'}>
            <h3 ><img src="/assets/img/HC1.png" alt="Hidden Costs Example." width= "100%"/>Care & handling is not mention when selecting the flowers.
            <br/>
            (avasflowers.net)</h3>
          </div>
          <div className={'Slider'}>
            <h3 ><img src="/assets/img/HC2.png" alt="Hidden Costs Example." width= "100%"/>Cleaning fee and service fee are not included until the step before paying.
            <br/>
            (Airbnb.com)</h3>
          </div>
          <div className={'Slider'}>
            <h3 ><img src="/assets/img/HC3.png" alt="Hidden Costs Example." width= "100%"/>Cleaning fee and service fee are not included until the step before paying.
            <br/>
            (Airbnb.com)</h3>
          </div>
        </Carousel>
        <hr/>


      </Content>
    );
  }
}

export default HiddenCosts;
