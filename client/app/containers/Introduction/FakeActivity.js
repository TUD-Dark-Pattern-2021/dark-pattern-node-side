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
class FakeActivity extends Component {
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
              What is Fake Activity?
          {/* <img src="/assets/img/sneakintobasket1.png" alt="Sneak Into Basket." id="SneakIntoBasket" /> */}
            </h1>
          </Col>
        </Row>
        
        {/* <h2 >
          What is Fake Activity?
          
        </h2>*/}
        <Row className={'intro-container'}  type="flex" justify="center">
          <Col xs={24}  sm={16} md={16} lg={16} className={'introLeft'}  pull={1}>
            <p>
        Informing the user about other people’s activity on the website, including behavious of puchasing, viewing, visiting etc, which may not be truthful. (e.g., “3 people are viewing this item now”)
            </p>

          </Col>
          <Col className={'introImg'} xs={0}  sm={8} md={8} lg={8}  >
            <img src="/assets/img/1FakeActivity.png" alt="Sneak Into Basket." id="SneakIntoBasket" />
          </Col>
        </Row>
        <Row className={'bottomVideoContainer'} type="flex" justify="center" >
          <Col className={'Intro-backgroundColor'}  xs={24}  sm={24} md={8} lg={8}>
            <p>
                Here's a video introducing Fake Activity
            </p>
          </Col>
          <Col className={'youtube-video'} xs={24}  sm={24} md={16} lg={16}>
          <iframe src="https://www.youtube.com/embed/kxkrdLI6e6M?start=210&end=227" title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen>

          </iframe>
          </Col>
        </Row>
        <Row  >
          <Col xs={24}  sm={24} md={24} lg={24}>
            <p>Here are some examples of Fake Activity:</p>
            <hr/>
          </Col>
          <Col xs={24}  sm={24} md={24} lg={24}>
            <Carousel  autoplay>
              <div className={'Slider'}>
                <h3>
                  <img src="/assets/img/FA1.png" alt="Fake Activity Example." width= "100%"/>
                  <p>
                    Tutorial on how to change the fake share count for WordPress.
                  </p>
                  <br/>
                  (Bimber.com)
                </h3>
              </div>
              <div className={'Slider'}>
                <h3>
              <img src="/assets/img/FA2.png" alt="Fake Activity Example." width= "100%"/>
                  <p>It shows the amount of people fasting, including a 4th of a person.
                  </p>
            <br/>
            (Fasting App)
                </h3>
              </div>
              <div className={'Slider'}>
                <h3 >
                  <img src="/assets/img/FA3.png" alt="Fake Activity Example." width= "100%"/>
                  <p>
                    The user claimed to not like it but gave it 5 stars.
                  </p>
                  <br/>
            (Google.com)
                </h3>
              </div>
            </Carousel>
          </Col>
        </Row>
      </Content>

    );
  }
}

export default FakeActivity;
