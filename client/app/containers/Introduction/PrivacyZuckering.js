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
class PrivacyZuckering extends Component {
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
        
        Privacy Zuckering
          <img src="/assets/img/sneakintobasket1.png" alt="Sneak Into Basket." id="SneakIntoBasket" />
        </h1>
        
        <h2 >
          What is Privacy Zuckering?
          
        </h2>
        <br/>
        <p>
        Sharing more information to the public than you orignally intended to do. (e.g., Messesnger set-up. It claims to ONLY
         "upload your contacts to connect you with friends" but not until you click the "Learn more" button you find out exactly what information is being used. (This info was used to push ads.)</p>
        <div className={'youtube-video'}>
          <iframe src="https://www.youtube.com/embed/Ogbht9CTfww" title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen></iframe>

        </div>

        <p>Here are some examples of Privacy Zuckering:</p>

        <Carousel  autoplay>
          <div className={'Slider'}>
            <h3><img src="/assets/img/PZ1.png" alt="Privacy Zuckering Example." width= "100%"/>It will use your contacts to make a targeted network for adverts.
            <br/>
            (Messesnger.com)
            </h3>
          </div>
          <div className={'Slider'}>
            <h3><img src="/assets/img/PZ2.png" alt="Privacy Zuckering Example." width= "100%"/>There is a switch that is enabled, that will use your info for facebook ads, this description is hidden behind a dropdown.
            <br/>
            (Whatsapp.com)</h3>
          </div>
        </Carousel>
      </Content>
    );
  }
}

export default PrivacyZuckering;
