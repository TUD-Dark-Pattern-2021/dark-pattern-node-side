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
class ForcedContinuity extends Component {
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
        
        Forced Continuity
          <img src="/assets/img/sneakintobasket1.png" alt="Sneak Into Basket." id="SneakIntoBasket" />
        </h1>
        
        <h2 >
          What is Forced Continuity?
          
        </h2>
        <br/>
        <p>
        This is when the free trial you applied for comes to an end, and without warning, you get charged again for another subscription time length. (e.g. You sign up for a week free trial to premium shopping, then, 
        if you have not cancelled your subscription, by next week you will be charged again, without warning)</p>
        <div className={'youtube-video'}>
          <iframe src="https://www.youtube.com/embed/AYdMqZbqwJ8" title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen></iframe>

        </div>

        <p>Here are some examples of Forced Continuity:</p>

        <Carousel  autoplay>
          <div className={'Slider'}>
            <h3><img src="/assets/img/ForcedContinuity11.png" alt="ForcedContinuity Example." width= "100%"/>Signing up for the "Free Account".
            <br/>
            (TheLadders.com)
            </h3>
          </div>
          <div className={'Slider'}>
            <h3><img src="/assets/img/ForcedContinuity2.jpg" alt="ForcedContinuity Example." width= "100%"/>Cannot use the features fully due to not having a premium account.
            <br/></h3>
          </div>
          <div className={'Slider'}>
            <h3 ><img src="/assets/img/ForcedContinuity3.jpg" alt="ForcedContinuity Example." width= "100%"/>Forcing you to pay for a premium account.
            <br/></h3>
          </div>
        </Carousel>
      </Content>
    );
  }
}

export default ForcedContinuity;
