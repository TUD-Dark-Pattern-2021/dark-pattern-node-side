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
        
        Trick Questions
          <img src="/assets/img/trickquestions1.png" alt="Sneak Into Basket." id="SneakIntoBasket" />
        </h1>
        
        <h2 >
          What is Trick Questions?
          
        </h2>
        <br/>
        <p>
        Misleading users to make certain decisions based on the usage of confusing language, for example, using long and complicated double negative sentences. (e.g., “If you do not wish to be contacted via email, please ensure that the box is not checked.”)</p>
        <div className={'youtube-video'}>
          <iframe src="https://www.youtube.com/embed/ulIGMujHFGw?list=PLP7XE596zu3MAUo489C-kRIxXkZ32XcvC" title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen></iframe>

        </div>

        <p>Here are some examples of Trick Questions:</p>

        <Carousel  autoplay>
          <div className={'Slider'}>
            <h3><img src="/assets/img/TQ1.png" alt="Trick Questions Example." width= "100%"/>It makes you click the checkbox to not recieve the emails when typically you would need to untick it.
            <br/>
            (newbalance.co.uk)
            </h3>
          </div>
          <div className={'Slider'}>
            <h3><img src="/assets/img/TQ2.png" alt="Trick Questionst Example." width= "100%"/>Again need to tick the checkbox to not get the emails.
            <br/>
            (Currys.co.uk)</h3>
          </div>
          <div className={'Slider'}>
            <h3 ><img src="/assets/img/TQ3.png" alt="Trick Questions Example." width= "100%"/>Makes it very confusing on how to opt out.
            <br/>
            (Royalmail.co.uk)</h3>
          </div>
        </Carousel>
      </Content>
    );
  }
}

export default TrickQuestions;
