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
class SneakIntoBasket extends Component {
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

          What is Sneak Into Basket ?

        </h1>


        {/*<h2 >
          What is Sneak Into basket?
          
        </h2>*/}
        <br/>
        <div className={'intro-container'}>
          <div className={'introLeft'}>
        <p>
        When you try purchase sometihng online, but the site sneaks and additio item or price inot your basket. (e.g., You add a laptop to your basket, the site may automatically add the price of warranty to it too.)
        </p>

          </div>
        <div className={'introImg'}>
          <img src="/assets/img/sneakintobasketIntro.png" alt="Sneak Into Basket." id="SneakIntoBasket" />
        </div>
        </div>

        <div className={'bottomVideoContainer'}>
          <div className="circleDecoration">

          </div>


            <p>
              Introducing Sneak Into Basket
            </p>



        <div className={'youtube-video'}>
          <iframe src="https://www.youtube.com/embed/RHdv3n0CG3g" title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen></iframe>

        </div>

        </div>

        <p>Here are some examples of Sneak into Basket</p>
        <hr/>
        <Carousel  autoplay>
          <div className={'Slider'}>
            <h3><img src="/assets/img/ExampleSneak1.png" alt="Sneak Into Basket Example." width= "100%"/><p>Sports Direct Magazine Added to basket.</p>
              <br/>
              (SportsDirect.com)
            </h3>
          </div>
          <div className={'Slider'}>
            <h3><img src="/assets/img/ExampleSneak2.png" alt="Sneak Into Basket Example." width= "100%"/><p>Sports Direct Magazine Added to basket.</p>
              <br/>
              (SportsDirect.com)</h3>
          </div>
          <div className={'Slider'}>
            <h3 ><img src="/assets/img/ExampleSneak3.png" alt="Sneak Into Basket Example." width= "100%"/><p>Greeting card Added to basket.</p>
              <br/>
              (avasflowers.net)</h3>
          </div>
        </Carousel>

      </Content>
    );
  }
}

export default SneakIntoBasket;
