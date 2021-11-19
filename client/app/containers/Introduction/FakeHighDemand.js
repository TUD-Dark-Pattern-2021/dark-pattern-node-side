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
class FakeHighDemand extends Component {
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
        
        Fake High-demand
          {/* <img src="/assets/img/sneakintobasket1.png" alt="Sneak Into Basket." id="SneakIntoBasket" /> */}
        </h1>
        
        <h2 >
          What is Fake High-demand?
          
        </h2>
        <br/>
        <p>
        Informing users that the product is in high demand and will sell out soon, thereby making it more attractive to users. (e.g., “this item is in high demand”, “selling fast”)</p>
        <div className={'youtube-video'}>
          <iframe src="https://www.youtube.com/embed/kxkrdLI6e6M?start=210&end=227" title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen></iframe>

        </div>

        <p>Here are some examples of Fake High-demand:</p>

        <Carousel  autoplay>
          <div className={'Slider'}>
            <h3><img src="/assets/img/FH1.png" alt="Fake High-demand Example." width= "100%"/>"Hurry limited quantities left!".
            <br/>
            (orthofeet.com)
            </h3>
          </div>
          <div className={'Slider'}>
            <h3><img src="/assets/img/FH2.png" alt="Fake High-demand Example." width= "100%"/>Out of stock.
            <br/>
            (6pm.com)</h3>
          </div>
          <div className={'Slider'}>
            <h3 ><img src="/assets/img/FH3.png" alt="Fake High-demand Example." width= "100%"/>Urgent message "items in your cart are high demand".
            <br/>
            (fashionnova.com)</h3>
          </div>
        </Carousel>
      </Content>
    );
  }
}

export default FakeHighDemand;
