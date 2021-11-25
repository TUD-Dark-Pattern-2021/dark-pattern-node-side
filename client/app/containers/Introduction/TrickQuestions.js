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
class TrickQuestions extends Component {
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

          What is Trick Questions

        </h1>

        {/* <h2 >
          What is Trick Questions?
          
        </h2>*/}
        <br/>
        <div className={'intro-container'}>
          <div className={'introLeft'}>
        <p>
        Misleading users to make certain decisions based on the usage of confusing language, for example, using long and complicated double negative sentences. (e.g., “If you do not wish to be contacted via email, please ensure that the box is not checked.”)
        </p>
          </div>
          <div className={'introImg'}>
          <img src="/assets/img/trickquestions1.png" alt="Sneak Into Basket." id="SneakIntoBasket" />
          </div>
        </div>

        <div className={'bottomVideoContainer'}>

          <div className="circleDecoration">
          </div>
              <p>
                Introducing Trick Questions
              </p>


          <div className={'youtube-video'}>
            <iframe src="https://www.youtube.com/embed/ulIGMujHFGw?list=PLP7XE596zu3MAUo489C-kRIxXkZ32XcvC" title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen></iframe>

          </div>
        </div>


        <p>Here are some examples of Trick Questions</p>
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

export default TrickQuestions;
