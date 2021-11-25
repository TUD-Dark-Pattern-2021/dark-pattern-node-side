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

          What is Forced Continuity?

        </h1>
        
        {/* <h2 >
          What is Forced Continuity?
          
        </h2>*/}
        <br/>
        <div className={'intro-container'}>
          <div className={'introLeft'}>
        <p>
        This is when the free trial you applied for comes to an end, and without warning, you get charged again for another subscription time length. (e.g. You sign up for a week free trial to premium shopping, then, 
        if you have not cancelled your subscription, by next week you will be charged again, without warning)</p>
          </div>
          <div className={'introImg'}>
            <img src="/assets/img/sneakintobasketIntro.png" alt="Sneak Into Basket." id="SneakIntoBasket" />
          </div>
        </div>

        <div className={'bottomVideoContainer'}>
          <div className="circleDecoration">

          </div>

          <p>
                Introducing Forced Continuity
              </p>



          <div className={'youtube-video'}>
            <iframe src="https://www.youtube.com/embed/RHdv3n0CG3g" title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen></iframe>

          </div>
        </div>


        <p>Here are some examples of Forced Continuity:</p>
        <hr/>

        <Carousel  autoplay>
          <div className={'Slider'}>
            <h3><img src="/assets/img/ExampleSneak1.png" alt="Sneak Into Basket Example." width= "100%"/>Sports Direct Magazine Added to basket.
            <br/>
            (SportsDirect.com)
            </h3>
          </div>
          <div className={'Slider'}>
            <h3><img src="/assets/img/ExampleSneak2.png" alt="Sneak Into Basket Example." width= "100%"/>Sports Direct Magazine Added to basket.
            <br/>
            (SportsDirect.com)</h3>
          </div>
          <div className={'Slider'}>
            <h3 ><img src="/assets/img/ExampleSneak3.png" alt="Sneak Into Basket Example." width= "100%"/>Greeting card Added to basket.
            <br/>
            (avasflowers.net)</h3>
          </div>
        </Carousel>
        <hr/>


      </Content>
    );
  }
}

export default ForcedContinuity;
