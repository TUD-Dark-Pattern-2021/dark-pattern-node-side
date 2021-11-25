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
class FakeCountdown extends Component {
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

          What is Fake Countdown?
          {/* <img src="/assets/img/sneakintobasket1.png" alt="Sneak Into Basket." id="SneakIntoBasket" /> */}
        </h1>
        

        <br/>
        <div className={'intro-container'}>
          <div className={'introLeft'}>
        <p>
        Using a countdown timer to alert users that a discount or deal is about to expire, which only purposely creates urgency for the purchase (e.g., “sale ends in 12h20m33s”)</p>


          </div>
          <div className={'introImg'}>
            <img src="/assets/img/sneakintobasketIntro.png" alt="Sneak Into Basket." id="SneakIntoBasket" />
          </div>
        </div>


        <div className={'bottomVideoContainer'}>
          <div className="circleDecoration">

          </div>
              <p>
                Here's a video introducing Fake Countdown
              </p>

          <div className={'youtube-video'}>
          <iframe src="https://www.youtube.com/embed/kxkrdLI6e6M?start=210&end=227" title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen></iframe>
          </div>

        </div>



        <p>Here are some examples of Fake Countdown:</p>
        <hr/>

        <Carousel  autoplay>
          <div className={'Slider'}>
            <h3><img src="/assets/img/FC1.png" alt="Fake Countdown Example." width= "100%"/>The offer end in 1 hour.
            <br/>
            (justfab.com)
            </h3>
          </div>
          <div className={'Slider'}>
            <h3><img src="/assets/img/FC2.png" alt="Fake Countdown Example." width= "100%"/>Countdown to end of flash sale.
            <br/>
            (mattressfirm.com)</h3>
          </div>
          <div className={'Slider'}>
            <h3 ><img src="/assets/img/FC3.png" alt="Fake Countdown Example." width= "100%"/>Sale ends soon.
            <br/>
            (chicwish.com)</h3>
          </div>
        </Carousel>



      </Content>
    );
  }
}

export default FakeCountdown;
