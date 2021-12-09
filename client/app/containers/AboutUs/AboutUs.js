import React, { PureComponent as Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {Button, Col, Layout,Row} from 'antd';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
const { Content } = Layout

@connect(
  state => ({
    login: state.user.isLogin,
  }),
)
@withRouter
class AboutUs extends Component {
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
  onSubmit (e) {
    e.preventDefault()
    window.alert(e.target.url.value)
  }
  render() {
    return (
      <Content className={'about-us-content'}>
        <Row>
          <Col xs={24}  sm={24} md={24} lg={12} xl={12} className={'aboutusLeft'}>
            <h2>About Our Team</h2>

            <img src="/assets/img/1PrivacyZuckering.png" alt="PrivacyZuckering." id="PrivacyZuckering" />

          </Col>
          <Col xs={24}  sm={24} md={24} lg={12} xl={12} className={'aboutusRight'}>
            <div className={"contentaboutus"}>

            <p >
              We are a student group from TUD MSc Computer Science (Advanced Software Devlopment). We are currently in our last semester of the course.</p>
            <br/>
              <p>We are committed to research in the direction of Dark Pattern and hope to apply the theory to practice. We are currently developing a Dark Pattern detector in the form of a chrome extension.
              Not all of the dark patterns can be detected in the time-frame given to us, but we plan to constantly improve the extenion.
            </p>
            </div>


          </Col>



        </Row>
        <Row className={"footer"}>

          <Col xs={24}  sm={24} md={24} lg={24} xl={24} className={"BottomLeft"}>
            <h4>
              Contact Us
            </h4>
            <div className={"contactus"}>
              <p>
                <a href="mailto:jordan-donnelly@hotmail.com"> <img src="/assets/img/email.png" alt="PrivacyZuckering." id="PrivacyZuckering" /> Jordan Donnelly</a>
                <br/>
                <a href="mailto:dowleyalan@gmail.com"> <img src="/assets/img/email.png" alt="PrivacyZuckering." id="PrivacyZuckering" /> Alan Dowley</a>
                </p>
              <p>
                <a href="mailto:allenlyp1992@gmail.com"><img src="/assets/img/email.png" alt="PrivacyZuckering." id="PrivacyZuckering" /> Yunpeng Liu</a>
                <br/>
                <a href="mailto:yufeiisu@gmail.com"><img src="/assets/img/email.png" alt="PrivacyZuckering." id="PrivacyZuckering" /> Yufei Su</a>
                <br/>
              </p>
              <p>
                <a href="mailto:seanquan959@gmail.com"><img src="/assets/img/email.png" alt="PrivacyZuckering." id="PrivacyZuckering" /> Quanwei Sun</a>
                <br/>
                <a href="mailto:lan.zeng1995@gmail.com"><img src="/assets/img/email.png" alt="PrivacyZuckering." id="PrivacyZuckering" /> Lan Zeng</a>
              </p>
              <div className={'pic'}>
                <img src="/assets/img/Technological-University-Dublin-Logo.jpg" alt="Group Photo of all the people in the project" width="100%"  />
              </div>
            </div>
          </Col>




          </Row>




      </Content>
    );
  }
}


export default AboutUs;
