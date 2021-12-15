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
class FakeLowStock extends Component {
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
          What is Fake Low-Stock?

            </h1>
          </Col>
        </Row>
        
        {/*<h2 >
          What is Fake Low-Stock?
          
        </h2>*/}

        <Row className={'intro-container'}  type="flex" justify="center">
          <Col xs={24}  sm={16} md={16} lg={16} className={'introLeft'}  pull={1}>
            <p>
        Informing users about the limited availability of a product, making it more desirable to users. (e.g., “only 2 items left in stock”) </p>

          </Col>
        <Col className={'introImg'} xs={0}  sm={8} md={8} lg={8}  >
            <img src="/assets/img/1FakeLowstock.png" alt="FakeLowstock." id="FakeLowstock" />
        </Col>
        </Row>
        <Row className={'bottomVideoContainer'} type="flex" justify="center" >
          <Col className={'Intro-backgroundColor'}  xs={24}  sm={24} md={8} lg={8}>
            <p>
            Introducing Fake Low-Stock
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
        <p>Here are some examples of Fake Low-Stock:</p>
            <hr/>
          </Col>
          <Col xs={24}  sm={24} md={24} lg={24}>
        <Carousel  autoplay>
        <div className={'Slider'}>
            <h3>
              <img src="/assets/img/FL1.png" alt="Fake Low-Stock Example." width= "100%"/>
            <p>
              Only 3 left in stock.
            </p>
            <br/>
            (6pm.com)</h3>
          </div>
          <div className={'Slider'}>
            <h3><img src="/assets/img/FL2.png" alt="Fake Low-Stock Example." width= "100%"/>
            <p>
              Only 4 rooms left at this price on our site.
            </p>
            <br/>
            (Booking.com)</h3>
          </div>
          <div className={'Slider'}>
            <h3><img src="/assets/img/FL3.png" alt="Fake Low-Stock Example." width= "100%"/>
            <p>
              Only 1 seat left.
            </p>
            <br/>
            (Ryanair.com)</h3>
          </div>
        </Carousel>
          </Col>
        </Row>
      </Content>
    );
  }
}

export default FakeLowStock;
