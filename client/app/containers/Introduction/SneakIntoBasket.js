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
class SneakIntoBasket extends Component {
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
              What is Sneak Into Basket ?
            </h1>
          </Col>
        </Row>
        {/*<h2 >
          What is Sneak Into basket?
        </h2>*/}
        <Row className={'intro-container'}  type="flex" justify="center">
          <Col xs={24}  sm={16} md={16} lg={16} className={'introLeft'}  pull={1}>
            <p>
              When you try to purchase something online, but the site sneaks and add item or price into your basket. (e.g., You add a laptop to your basket, the site may automatically add the price of warranty to it too.)
            </p>
          </Col>
          <Col className={'introImg'} xs={0}  sm={8} md={8} lg={8}  >
            <img src="/assets/img/1sneakintoBasket.png" alt="Sneak Into Basket." id="SneakIntoBasket" />
          </Col>
        </Row>
        <Row className={'bottomVideoContainer'} type="flex" justify="center" >
          <Col className={'Intro-backgroundColor'}  xs={24}  sm={24} md={8} lg={8}>
            <p>
              Introducing Sneak Into Basket
            </p>
          </Col>
          <Col className={'youtube-video'} xs={24}  sm={24} md={16} lg={16}>
            <iframe src="https://www.youtube.com/embed/RHdv3n0CG3g" title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen>
            </iframe>
          </Col>
        </Row>
        <Row  >
          <Col xs={24}  sm={24} md={24} lg={24}>
            <p>Here are some examples of Sneak into Basket</p>
            <hr/>
          </Col>
          <Col xs={24}  sm={24} md={24} lg={24}>
            <Carousel  autoplay>
              <div className={'Slider'}>
                <h3>
                  <img src="/assets/img/ExampleSneak1.png" alt="Sneak Into Basket Example." width= "100%"/>
                  <p>Sports Direct Magazine Added to basket.</p>
                  <br/>
                  (SportsDirect.com)
                </h3>
              </div>
              <div className={'Slider'}>
                <h3>
                  <img src="/assets/img/ExampleSneak2.png" alt="Sneak Into Basket Example." width= "100%"/>
                  <p>Sports Direct Magazine Added to basket.</p>
                  <br/>
                  (SportsDirect.com)
                </h3>
              </div>
              <div className={'Slider'}>
                <h3>
                  <img src="/assets/img/ExampleSneak3.png" alt="Sneak Into Basket Example." width= "100%"/>
                  <p>Greeting card Added to basket.</p>
                  <br/>
                  (avasflowers.net)
                </h3>
              </div>
            </Carousel>
          </Col>
        </Row>
      </Content>

    );
  }
}

export default SneakIntoBasket;
