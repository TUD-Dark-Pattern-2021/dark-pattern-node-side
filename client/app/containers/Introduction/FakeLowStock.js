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
        <h1 >
        
        Fake Low-Stock
          <img src="/assets/img/sneakintobasket1.png" alt="Sneak Into Basket." id="SneakIntoBasket" />
        </h1>
        
        <h2 >
          What is Fake Low-Stock?
          
        </h2>
        <br/>
        <p>
        Informing users about the limited availability of a product, making it more desirable to users. (e.g., “only 2 items left in stock”) </p>
        <div className={'youtube-video'}>
          <iframe src="https://www.youtube.com/embed/kxkrdLI6e6M?start=210&end=227" title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen></iframe>

        </div>

        <p>Here are some examples of Fake Low-Stock:</p>

        <Carousel  autoplay>
        <div className={'Slider'}>
            <h3><img src="/assets/img/FL1.png" alt="Fake Low-Stock Example." width= "100%"/>Only 3 left in stock.
            <br/>
            (6pm.com)</h3>
          </div>
          <div className={'Slider'}>
            <h3><img src="/assets/img/FL2.png" alt="Fake Low-Stock Example." width= "100%"/>Only 4 rooms left at this price on our site.
            <br/>
            (Booking.com)</h3>
          </div>
          <div className={'Slider'}>
            <h3><img src="/assets/img/FL3.png" alt="Fake Low-Stock Example." width= "100%"/>Only 1 seat left.
            <br/>
            (Ryanair.com)</h3>
          </div>
        </Carousel>
      </Content>
    );
  }
}

export default FakeLowStock;
