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
class HiddenCosts extends Component {
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
              What is Hidden Costs?
            </h1>
          </Col>
        </Row>
        
        {/*<h2 >
          What is Hidden Costs?
          
        </h2>*/}
        <Row className={'intro-container'}  type="flex" justify="center">
          <Col xs={24}  sm={16} md={16} lg={16} className={'introLeft'}  pull={1}>
            <p>
              When purchasing an item, the site will hide the costs of such things as delivery or tax until you reach the checkout.
            </p>
        </Col>
        <Col className={'introImg'} xs={0}  sm={8} md={8} lg={8}  >
            <img src="/assets/img/1HiddenCost.png" alt="HiddenCost." id="HiddenCost" />
        </Col>
        </Row>
        <Row className={'bottomVideoContainer'} type="flex" justify="center" >
          <Col className={'Intro-backgroundColor'}  xs={24}  sm={24} md={8} lg={8}>
            <p>
            Introducing Hidden Costs
            </p>
          </Col>
          <Col className={'youtube-video'} xs={24}  sm={24} md={16} lg={16}>
          <iframe src="https://www.youtube.com/embed/1xJW-_DRkHM" title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen>
          </iframe>
          </Col>
        </Row>
        <Row  >
          <Col xs={24}  sm={24} md={24} lg={24}>
            <p>Here are some examples of Hidden Costs:</p>
            <hr/>
          </Col>
          <Col xs={24}  sm={24} md={24} lg={24}>
            <Carousel  autoplay>
              <div className={'Slider'}>
                <h3>
                  <img src="/assets/img/HC1.png" alt="Hidden Costs Example." width= "100%"/>
                  <p>Care & handling is not mention when selecting the flowers.</p>
            <br/>
            (avasflowers.net)</h3>
          </div>
          <div className={'Slider'}>
            <h3 ><img src="/assets/img/HC2.png" alt="Hidden Costs Example." width= "100%"/>
              <p>Cleaning fee and service fee are not included until the step before paying.</p>
            <br/>
            (Airbnb.com)</h3>
          </div>
          <div className={'Slider'}>
            <h3 >
              <img src="/assets/img/HC3.png" alt="Hidden Costs Example." width= "100%"/>
              <p>
                Cleaning fee and service fee are not included until the step before paying.
              </p>
              <br/>
            (Airbnb.com)
            </h3>
          </div>
            </Carousel>
          </Col>
        </Row>
      </Content>

    );
  }
}

export default HiddenCosts;
