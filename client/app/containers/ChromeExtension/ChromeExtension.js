import React, { PureComponent as Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Layout, Carousel } from 'antd';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
const { Content } = Layout

@connect(
  state => ({
    login: state.user.isLogin,
  }),
)
@withRouter
class ChromeExtension extends Component {
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
      <Content className={'chrome-extention-content'}>
        <div className={'chrome-extention-content-header'}>
          <h1>
            Chrome Extension
          </h1>
          <a href="" target={'_blank'} style={{display: 'block', textAlign: 'center'}}>Install Now</a>
        </div>
        <p style={{margin: '20px 0'}}>
          We developed an Chrome Extension to find out the dark patterns on your website. The dark patterns detected will be highlighted on your website.
        </p>
        <Carousel>
          <div className={'Slider'}>
            <img src="/assets/img/page-1-104-desktop-hd.png" alt=""/>
          </div>
          <div className={'Slider'}>
            <img src="/assets/img/page-1-105-desktop-hd.png" alt=""/>
          </div>
          <div className={'Slider'}>
            <img src="/assets/img/page-1-106-desktop-hd.png" alt=""/>
          </div>
          <div className={'Slider'}>
            <img src="/assets/img/page-1-107-desktop-hd.png" alt=""/>
          </div>
        </Carousel>

      </Content>
    );
  }
}

export default ChromeExtension;
