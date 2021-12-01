import React, { PureComponent as Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {Button, Layout, Breadcrumb, Icon, Carousel, Row, Col} from 'antd';
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
        <Row>
          <Col xs={24}  sm={24} md={24} lg={24}>
            <h1 >
          What is Bait And Swtich?
          {/* <img src="/assets/img/Bait.png" alt="Sneak Into Basket." id="SneakIntoBasket" /> */}
            </h1>
          </Col>
        </Row>
        {/*
        <h2 >
          What is Bait And Swtich?
          
        </h2>*/}
        <Row className={'intro-container'}  type="flex" justify="center">
          <Col xs={24}  sm={16} md={16} lg={16} className={'introLeft'}  pull={1}>
            <p>
        When a user plans and expects one thing to happen, but something else happens instead. (e.g., In Microsoft's guide to upgrading to Windows 10. The "Ok" button was not actually the button that would upgrade the Windows although it seemed to be. )
            </p>
          </Col>
          <Col className={'introImg'} xs={0}  sm={8} md={8} lg={8}  >
            <img src="/assets/img/sneakintobasketIntro.png" alt="Sneak Into Basket." id="SneakIntoBasket" />
          </Col>
        </Row>
        <Row className={'bottomVideoContainer'} type="flex" justify="center" >
          <Col className={'Intro-backgroundColor'}  xs={24}  sm={24} md={8} lg={8}>
            <p>
            Introducing Bait And Swtich
            </p>
          </Col>
          <Col className={'youtube-video'} xs={24}  sm={24} md={16} lg={16}>
          <iframe src="https://www.youtube.com/embed/mX6zgN-Kn_w" title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen>
          </iframe>
          </Col>
        </Row>
        <Row  >
          <Col xs={24}  sm={24} md={24} lg={24}>
        <p>Here are some examples of Bait And Switch:</p>
            <hr/>
          </Col>
          <Col xs={24}  sm={24} md={24} lg={24}>
            <Carousel  autoplay>
          <div className={'Slider'}>
            <h3><img src="/assets/img/BaitAndSwitch1DP.jpeg" alt="Bait And Switch Example." width= "100%"/>
            <p>Windows Upgrade button is not highlighted
            </p>
            <br/>
            (DarkPatterns.com)
            </h3>
          </div>
          <div className={'Slider'}>
            <h3><img src="/assets/img/BaitAndSwitch2Malwarebytes.jpeg" alt="Bait And Switch Example." width= "100%"/>
            <p>It is not obivous what button is the download button.
            </p>
            <br/>
            (Malwarebytes.com)</h3>
          </div>
          <div className={'Slider'}>
            <h3 ><img src="/assets/img/BaitAndSwitch3DP.jpeg" alt="Bait And Switch Example." width= "100%"/>
            <p>Advert that will redirect you once click.
            </p>
            <br/>
            </h3>
          </div>
            </Carousel>
          </Col>
        </Row>
      </Content>

    );
  }
}
export default BaitAndSwitch;
