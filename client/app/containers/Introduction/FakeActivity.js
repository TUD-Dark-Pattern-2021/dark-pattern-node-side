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

          What is Fake Activity?
          {/* <img src="/assets/img/sneakintobasket1.png" alt="Sneak Into Basket." id="SneakIntoBasket" /> */}
        </h1>
        
        {/* <h2 >
          What is Fake Activity?
          
        </h2>*/}
        <br/>
        <div className={'intro-container'}>
          <div className={'introLeft'}>
        <p>
        Informing the user about other people’s activity on the website, including behavious of puchasing, viewing, visiting etc, which may not be truthful. (e.g., “3 people are viewing this item now”)
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
                Here's a video introducing Fake Activity
              </p>
    

         <div className={'youtube-video'}>
          <iframe src="https://www.youtube.com/embed/kxkrdLI6e6M?start=210&end=227" title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen></iframe>
        


          </div>
        </div>



        <p>Here are some examples of Fake Activity:</p>
        <hr/>

        <Carousel  autoplay>
          <div className={'Slider'}>
            <h3><img src="/assets/img/FA1.png" alt="Fake Activity Example." width= "100%"/>Tutorial on how to change the fake share count for WordPress.
            <br/>
            (Bimber.com)
            </h3>
          </div>
          <div className={'Slider'}>
            <h3><img src="/assets/img/FA2.png" alt="Fake Activity Example." width= "100%"/>It shows the amount of people fasting, including a 4th of a person.
            <br/>
            (Fasting App)</h3>
          </div>
          <div className={'Slider'}>
            <h3 ><img src="/assets/img/FA3.png" alt="Fake Activity Example." width= "100%"/>The user claimed to not like it but gave it 5 stars.
            <br/>
            (Google.com)</h3>
          </div>
        </Carousel>


      </Content>
    );
  }
}

export default FakeActivity;
