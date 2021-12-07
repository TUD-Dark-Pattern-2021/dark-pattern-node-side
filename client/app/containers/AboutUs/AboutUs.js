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
          <Col xs={24}  sm={12} md={12} lg={12} className={'aboutusLeft'}>
            <h2>About</h2>
            <h2>Our Team</h2>

            <h1>
              Who are we?
            </h1>


              <p>
                We are a student group from TUD MSc Computer Science (Advanced Software Devlopment). We are currently in our last semester of the course.
              </p>


            <h1>
              What do we do?
            </h1>

              <p>
                We are committed to research in the direction of Dark Pattern and hope to apply the theory to practice. We are currently developing a Dark Pattern detector in the form of a chrome extension.
                Not all of the dark patterns can be detected in the time-frame given to us, but we plan to constantly improve the extenion.
              </p>



          </Col>
          <Col xs={24}  sm={12} md={12} lg={12} className={'aboutusRight'}>
            <img src="/assets/img/1PrivacyZuckering.png" alt="PrivacyZuckering." id="PrivacyZuckering" />

          </Col>



        </Row>
        <Row>
          <Col xs={24}  sm={24} md={12} lg={12} offset={12} className={"AboutusBottom"}>
            <div>
        <h4>
          Contact Us
        </h4>
        <p>
          <a href="mailto:jordan-donnelly@hotmail.com">Jordan Donnelly</a>
          <br/>
          <a href="mailto:dowleyalan@gmail.com">Alan Dowley</a>
          <br/>
          <a href="mailto:allenlyp1992@gmail.com">Yunpen Liu</a>
          <br/>
          <a href="mailto:yufeiisu@gmail.com">Yufei Su</a>
          <br/>
          <a href="mailto:seanquan959@gmail.com">Quanwei Sun</a>
          <br/>
          <a href="mailto:damian.x.gordon@tudublin.ie">Lan Zeng</a>
        </p>
            </div>
            <img src="/assets/img/Technological-University-Dublin-Logo.jpg" alt="Group Photo of all the people in the project" width="100%"  />

          </Col>


          </Row>




      </Content>
    );
  }
}


export default AboutUs;
