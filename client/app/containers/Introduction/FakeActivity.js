import React, { PureComponent as Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Layout, Breadcrumb, Icon, Carousel } from 'antd';
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
        <h1 >
        
        Fake Activity
          {/* <img src="/assets/img/sneakintobasket1.png" alt="Sneak Into Basket." id="SneakIntoBasket" /> */}
        </h1>
        
        <h2 >
          What is Fake Activity?
          
        </h2>
        <br/>
        <p>
        Informing the user about other people’s activity on the website, including behavious of puchasing, viewing, visiting etc, which may not be truthful. (e.g., “3 people are viewing this item now”)
        </p>
        <div className={'youtube-video'}>
          <iframe src="" title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen></iframe>

        </div>

        <p>Here are some examples of Fake Activity:</p>

        <Carousel  autoplay>
          <div className={'Slider'}>
            <h3><img src="/assets/img/ExampleSneak1.png" alt="Sneak Into Basket Example." width= "100%"/>Sports Direct Magazine Added to basket.
            <br/>
            (SportsDirect.com)
            </h3>
          </div>
          <div className={'Slider'}>
            <h3><img src="/assets/img/ExampleSneak2.png" alt="Sneak Into Basket Example." width= "100%"/>Sports Direct Magazine Added to basket.
            <br/>
            (SportsDirect.com)</h3>
          </div>
          <div className={'Slider'}>
            <h3 ><img src="/assets/img/ExampleSneak3.png" alt="Sneak Into Basket Example." width= "100%"/>Greeting card Added to basket.
            <br/>
            (avasflowers.net)</h3>
          </div>
        </Carousel>
      </Content>
    );
  }
}

export default FakeActivity;