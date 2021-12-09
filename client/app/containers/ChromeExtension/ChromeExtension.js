import React, { PureComponent as Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Layout, Carousel } from 'antd';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
const { Content } = Layout
import {Icon} from 'antd';

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
            <img src="/assets/img/chromeextension.png" alt=""/>
            Chrome Extension
          </h1>
          <a href="" target={'_blank'} style={{display: 'block', textAlign: 'center'}} id={"buttonDownload"}>Install Now !  <img src="/assets/img/financial_install.png" alt=""/> </a>
        </div>
        <p style={{margin: '20px 0'}}>
          We developed a Chrome Extension to find out the dark patterns on your website, and those dark patterns detected will be highlighted.
        </p>
        <Carousel>
          <div className={'chrome-extension-slider'}>
            <iframe src="https://www.youtube.com/embed/K2SSYFT61uE"
                    title="YouTube video player" frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen>

            </iframe>
            <img src="/assets/img/page-1-104-desktop-hd.png" alt="" style={{visibility: "hidden"}}/>
          </div>
          <div className={'chrome-extension-slider'}>
            <img src="/assets/img/page-1-104-desktop-hd.png" alt=""/>
          </div>
          <div className={'chrome-extension-slider'}>
            <img src="/assets/img/page-1-105-desktop-hd.png" alt=""/>
          </div>
          <div className={'chrome-extension-slider'}>
            <img src="/assets/img/page-1-106-desktop-hd.png" alt=""/>
          </div>
          <div className={'chrome-extension-slider'}>
            <img src="/assets/img/page-1-107-desktop-hd.png" alt=""/>
          </div>
        </Carousel>

      </Content>
    );
  }
}

export default ChromeExtension;
