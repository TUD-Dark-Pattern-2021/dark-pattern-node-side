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
class TrickQuestions extends Component {
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

          What is Trick Questions

            </h1>
          </Col>
        </Row>
        {/* <h2 >
          What is Trick Questions?
          
        </h2>*/}
        <Row className={'intro-container'}  type="flex" justify="center">
          <Col xs={24}  sm={16} md={16} lg={16} className={'introLeft'}  pull={1}>
            <p>
        Misleading users to make certain decisions based on the usage of confusing language, for example, using long and complicated double negative sentences. (e.g., “If you do not wish to be contacted via email, please ensure that the box is not checked.”)
            </p>
          </Col>
          <Col className={'introImg'} xs={0}  sm={8} md={8} lg={8}  >
            <img src="/assets/img/1TrickQuestion.png" alt="TrickQuestion." id="TrickQuestion" />
          </Col>
        </Row>
        <Row className={'bottomVideoContainer'} type="flex" justify="center" >
          <Col className={'Intro-backgroundColor'}  xs={24}  sm={24} md={8} lg={8}>
            <p>
                Introducing Trick Questions
            </p>
          </Col>
          <Col className={'youtube-video'} xs={24}  sm={24} md={16} lg={16}>
            <iframe src="https://www.youtube.com/embed/ulIGMujHFGw?list=PLP7XE596zu3MAUo489C-kRIxXkZ32XcvC" title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen>

            </iframe>

          </Col>
        </Row>
        <Row  >
          <Col xs={24}  sm={24} md={24} lg={24}>
            <p>
              Here are some examples of Trick Questions
            </p>
              <hr/>
          </Col>
          <Col xs={24}  sm={24} md={24} lg={24}>
        <Carousel  autoplay>
          <div className={'Slider'}>
            <h3>
              <img src="/assets/img/TQ1.png" alt="Trick Questions Example." width= "100%"/>
              <p>
                It makes you click the checkbox to not recieve the emails when typically you would need to untick it.
              </p>

            <br/>
            (newbalance.co.uk)
            </h3>
          </div>
          <div className={'Slider'}>

            <h3><img src="/assets/img/TQ2.png" alt="Trick Questionst Example." width= "100%"/>
              <p>
                Again need to tick the checkbox to not get the emails.
              </p>
            <br/>
            (Currys.co.uk)</h3>
          </div>
          <div className={'Slider'}>

            <h3 ><img src="/assets/img/TQ3.png" alt="Trick Questions Example." width= "100%"/>
              <p>
                Makes it very confusing on how to opt out.
              </p>

            <br/>
            (Royalmail.co.uk)
            </h3>
          </div>
        </Carousel>
          </Col>
        </Row>
      </Content>
  );
  }
  }
export default TrickQuestions;
