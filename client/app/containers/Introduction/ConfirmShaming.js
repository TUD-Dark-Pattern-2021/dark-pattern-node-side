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
class ConfirmShaming extends Component {
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

          What is Confirm Shaming?
          {/* <img src="/assets/img/sneakintobasket1.png" alt="Sneak Into Basket." id="SneakIntoBasket" /> */}
        </h1>
        {/*
        <h2 >
          What is Confirm Shaming?
          
        </h2>*/}

        <br/>
        <div className={'intro-container'}>
          <div className={'introLeft'}>
            <p>
        Invoking language and emotion (shame) to convince users not to make a certain choice, or guilting users into opting into something. (e.g., “No thanks, I don’t want to save.”)
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
            Introducing Confirm Shaming
          </p>



          <div className={'youtube-video'}>
          <iframe src="https://www.youtube.com/embed/SIkqDGfEXjo?start=30&end=67" title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen></iframe>

        </div>
        </div>


        <p>Here are some examples of Confirm Shaming:</p>

        <hr/>

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

export default ConfirmShaming;
