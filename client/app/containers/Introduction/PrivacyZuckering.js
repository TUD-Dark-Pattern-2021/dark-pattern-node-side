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
        <Row>
          <Col xs={24}  sm={24} md={24} lg={24}>
            <h1>
          What is Privacy Zuckering ?
            </h1>
          </Col>
        </Row>
        
        {/*<h2 >
          What is Privacy Zuckering?
        </h2>*/}
        <Row className={'intro-container'}  type="flex" justify="center">
          <Col xs={24}  sm={16} md={16} lg={16} className={'introLeft'}  pull={1}>
            <p>
        Sharing more information to the public than you orignally intended to do. (e.g., Messesnger set-up. It claims to ONLY
         "upload your contacts to connect you with friends" but not until you click the "Learn more" button you find out exactly what information is being used. (This info was used to push ads.)
            </p>
        </Col>
        <Col className={'introImg'} xs={0}  sm={8} md={8} lg={8}  >
            <img src="/assets/img/1PrivacyZuckering.png" alt="PrivacyZuckering." id="PrivacyZuckering" />
        </Col>
      </Row>
    <Row className={'bottomVideoContainer'} type="flex" justify="center" >
      <Col className={'Intro-backgroundColor'}  xs={24}  sm={24} md={8} lg={8}>
        <p>
                Introducing Privacy Zuckering
        </p>
      </Col>
      <Col className={'youtube-video'} xs={24}  sm={24} md={16} lg={16}>
            <iframe src="https://www.youtube.com/embed/Ogbht9CTfww" title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen>

            </iframe>

      </Col>
    </Row>
        <Row  >
          <Col xs={24}  sm={24} md={24} lg={24}>
            <p>Here are some examples of Privacy Zuckering:</p>
            <hr/>
          </Col>
          <Col xs={24}  sm={24} md={24} lg={24}>
        <Carousel  autoplay>
          <div className={'Slider'}>

            <h3><img src="/assets/img/PZ1.png" alt="Privacy Zuckering Example." width= "100%"/>
              <p>
                It will use your contacts to make a targeted network for adverts.
              </p>
           <br/>
            (Messesnger.com)
            </h3>
          </div>
          <div className={'Slider'}>

            <h3><img src="/assets/img/PZ2.png" alt="Privacy Zuckering Example." width= "100%"/>
            <p>
              There is a switch that is enabled, that will use your info for facebook ads, this description is hidden behind a dropdown.
            </p>
            <br/>
            (Whatsapp.com)</h3>

          </div>
        </Carousel>
          </Col>
        </Row>
      </Content>

    );
  }
}

export default PrivacyZuckering;
