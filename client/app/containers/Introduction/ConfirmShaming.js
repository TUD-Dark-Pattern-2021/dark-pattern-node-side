import React, { PureComponent as Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {Button, Layout, Breadcrumb, Icon, Carousel, Col, Row} from 'antd';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
const { Content } = Layout

@connect(
  state => ({
    login: state.user.isLogin,
  }),
)
@withRouter
class ConfirmShaming extends Component {
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
          What is Confirm Shaming?
          {/* <img src="/assets/img/sneakintobasket1.png" alt="Sneak Into Basket." id="SneakIntoBasket" /> */}
            </h1>
          </Col>
        </Row>
        {/*
        <h2 >
          What is Confirm Shaming?
          
        </h2>*/}
        <Row className={'intro-container'}  type="flex" justify="center">
          <Col xs={24}  sm={16} md={16} lg={16} className={'introLeft'}  pull={1}>
            <p>
        Invoking language and emotion (shame) to convince users not to make a certain choice, or guilting users into opting into something. (e.g., “No thanks, I don’t want to save.”)
            </p>
          </Col>
          <Col className={'introImg'} xs={0}  sm={8} md={8} lg={8}  >
            <img src="/assets/img/sneakintobasketIntro.png" alt="Sneak Into Basket." id="SneakIntoBasket" />
          </Col>
        </Row>
        <Row className={'bottomVideoContainer'} type="flex" justify="center" >
          <Col className={'Intro-backgroundColor'}  xs={24}  sm={24} md={8} lg={8}>
            <p>
            Introducing Confirm Shaming
            </p>
          </Col>
          <Col className={'youtube-video'} xs={24}  sm={24} md={16} lg={16}>
          <iframe src="https://www.youtube.com/embed/SIkqDGfEXjo?start=30&end=67" title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen></iframe>
          </Col>
        </Row>
        <Row  >
          <Col xs={24}  sm={24} md={24} lg={24}>
        <p>Here are some examples of Confirm Shaming:</p>
            <hr/>
          </Col>
          <Col xs={24}  sm={24} md={24} lg={24}>
            <Carousel  autoplay>
              <div className={'Slider'}>
                <h3>
                  <img src="/assets/img/CS1.jpg" alt="Confirm Shaming Example." width= "100%"/>
                  <p>Tells you to learn Italian or the bird logo will eat poison.</p>
            <br/>
            (Duolingo.com)
            </h3>
          </div>
          <div className={'Slider'}>
            <h3><img src="/assets/img/CS2.png" alt="Confirm Shaming Example." width= "100%"/>
            <p>"Heroes press N, Wimps press Y".
            </p>
            <br/>
            (Wolfenstein 1992)</h3>
          </div>
          <div className={'Slider'}>
            <h3 ><img src="/assets/img/CS3.png" alt="Confirm Shaming Example." width= "100%"/>
              <p>"I dont want Unlimited One-Day delivery".</p>
            <br/>
            (Amazon.com)
            </h3>
          </div>
            </Carousel>
          </Col>
        </Row>
      </Content>

    );
  }
}

export default ConfirmShaming;
