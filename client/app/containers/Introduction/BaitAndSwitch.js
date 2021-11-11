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
class BaitAndSwitch extends Component {
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
        
          Bait And Switch
          {/* <img src="/assets/img/Bait.png" alt="Sneak Into Basket." id="SneakIntoBasket" /> */}
        </h1>
        
        <h2 >
          What is Bait And Swtich?
          
        </h2>
        <br/>
        <p>
        When a user plans and expects one thing to happen, but something else happens instead. (e.g., In Microsoft's guide to upgrading to Windows 10. The "Ok" button was not actually the button that would upgrade the Windows although it seemed to be. )
        </p>
        <div className={'youtube-video'}>
          <iframe src="https://www.youtube.com/embed/mX6zgN-Kn_w" title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen></iframe>

        </div>

        <p>Here are some examples of Bait And Switch:</p>

        <Carousel  autoplay>
          <div className={'Slider'}>
            <h3><img src="/assets/img/BaitAndSwitch1DP.jpeg" alt="Bait And Switch Example." width= "100%"/>Windows Upgrade button is not highlighted
            <br/>
            (DarkPatterns.com)
            </h3>
          </div>
          <div className={'Slider'}>
            <h3><img src="/assets/img/BaitAndSwitch2Malwarebytes.jpeg" alt="Bait And Switch Example." width= "100%"/>It is not obivous what button is the download button.
            <br/>
            (Malwarebytes.com)</h3>
          </div>
          <div className={'Slider'}>
            <h3 ><img src="/assets/img/BaitAndSwitch3DP.jpeg" alt="Bait And Switch Example." width= "100%"/>Advert that will redirect you once click.
            <br/></h3>
          </div>
        </Carousel>
      </Content>
    );
  }
}

export default BaitAndSwitch;
