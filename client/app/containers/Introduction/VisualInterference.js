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
class VisualInterference extends Component {
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

          What is Visual Interference?

        </h1>
        
        {/*<h2 >
          What is Visual Interference?
          
        </h2>*/}
        <br/>
        <div className={'intro-container'}>
          <div className={'introLeft'}>
        <p>
        Manipulation of the interface that the user will use in order to hide some information or actions (e.g., Autofilling a checkbox that will sign you up for useless emails, but the checkbox is hidden behind 1-2 dropdown menus.) </p>

          </div>
          <div className={'introImg'}>
            <img src="/assets/img/sneakintobasketIntro.png" alt="Sneak Into Basket." id="SneakIntoBasket" />
          </div>
        </div>

        <div className={'bottomVideoContainer'}>
          <div className="circleDecoration">

          </div>

          <p>
                Introducing Visual Interference
              </p>
        <div className={'youtube-video'}>
          <iframe src="https://www.youtube.com/embed/5yj1GH111Xc?start=123&end=145" title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen></iframe>


          </div>
        </div>


        <p>Here are some examples of Visual Interference:</p>
<hr/>
        <Carousel  autoplay>
          <div className={'Slider'}>
            <h3><img src="/assets/img/VI1.png" alt="Visual Interference Example." width= "100%"/>Seems like the option on the right is unavailable as they greyed it out but this is not the case.
            <br/>
            (GreenFingers.com)
            </h3>
          </div>
          <div className={'Slider'}>
            <h3><img src="/assets/img/VI2.png" alt="Visual Interference Example." width= "100%"/>The unsubscribe feature is hidden at the bottom of the page.
            <br/>
            (PizzaExpress.com)</h3>
          </div>
          <div className={'Slider'}>
            <h3 ><img src="/assets/img/VI3.png" alt="Visual InterferenceExample." width= "100%"/>Again the unsubscribe is a much smaller font.
            <br/>
            (Facebook.com)</h3>
          </div>
        </Carousel>
        <hr/>

      </Content>
    );
  }
}

export default VisualInterference;
