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
class PrivacyZuckering extends Component {
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

          What is Privacy Zuckering ?

        </h1>
        
        {/*<h2 >
          What is Privacy Zuckering?
          
        </h2>*/}
        <br/>
        <div className={'intro-container'}>
          <div className={'introLeft'}>
        <p>
        Sharing more information to the public than you orignally intended to do. (e.g., Messesnger set-up. It claims to ONLY
         "upload your contacts to connect you with friends" but not until you click the "Learn more" button you find out exactly what information is being used. (This info was used to push ads.)</p>
          </div>
          <div className={'introImg'}>
            <img src="/assets/img/sneakintobasketIntro.png" alt="Sneak Into Basket." id="SneakIntoBasket" />
          </div>
        </div>

        <div className={'bottomVideoContainer'}>
          <div className="circleDecoration">

          </div>
              <p>
                Introducing Privacy Zuckering
              </p>


          <div className={'youtube-video'}>
            <iframe src="https://www.youtube.com/embed/Ogbht9CTfww" title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen></iframe>

          </div>
        </div>

        <p>Here are some examples of Privacy Zuckering:</p>
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
        <hr/>


      </Content>
    );
  }
}

export default PrivacyZuckering;
