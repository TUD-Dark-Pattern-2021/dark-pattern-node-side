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
class VisualInterference extends Component {
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

          What is Visual Interference?

            </h1>
          </Col>
        </Row>
        
        {/*<h2 >
          What is Visual Interference?
          
        </h2>*/}
        <Row className={'intro-container'}  type="flex" justify="center">
          <Col xs={24}  sm={16} md={16} lg={16} className={'introLeft'}  pull={1}>
            <p>
        Manipulation of the interface that the user will use in order to hide some information or actions (e.g., Autofilling a checkbox that will sign you up for useless emails, but the checkbox is hidden behind 1-2 dropdown menus.) </p>

          </Col>
          <Col className={'introImg'} xs={0}  sm={8} md={8} lg={8}>
            <img src="/assets/img/sneakintobasketIntro.png" alt="Sneak Into Basket." id="SneakIntoBasket" />
          </Col>
        </Row>
        <Row className={'bottomVideoContainer'} type="flex" justify="center" >
          <Col className={'Intro-backgroundColor'}  xs={24}  sm={24} md={8} lg={8}>
            <p>
                Introducing Visual Interference
            </p>
          </Col>
          <Col className={'youtube-video'} xs={24}  sm={24} md={16} lg={16}>
          <iframe src="https://www.youtube.com/embed/5yj1GH111Xc?start=123&end=145" title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen></iframe>


          </Col>
        </Row>
        <Row  >
          <Col xs={24}  sm={24} md={24} lg={24}>
            <p>
            Here are some examples of Visual Interference:
            </p>
            <hr/>
          </Col>
          <Col xs={24}  sm={24} md={24} lg={24}>
            <Carousel  autoplay>
              <div className={'Slider'}>
                <h3>
                  <img src="/assets/img/VI1.png" alt="Visual Interference Example." width= "100%"/>
                  <p>
                    Seems like the option on the right is unavailable as they greyed it out but this is not the case.
                  </p>
                  <br/>
                  (GreenFingers.com)
                </h3>
              </div>
              <div className={'Slider'}>
                <h3>
                  <img src="/assets/img/VI2.png" alt="Visual Interference Example." width= "100%"/>
                  <p>
                    The unsubscribe feature is hidden at the bottom of the page.
                  </p>
                  <br/>
                  (PizzaExpress.com)
                </h3>
              </div>
              <div className={'Slider'}>
                <h3 >
                  <img src="/assets/img/VI3.png" alt="Visual InterferenceExample." width= "100%"/>
                  <p>
                    Again the unsubscribe is a much smaller font.
                  </p>

                  <br/>
                  (Facebook.com)
                </h3>
              </div>
        </Carousel>
  </Col>
  </Row>
  </Content>

  );
  }
  }

export default VisualInterference;
