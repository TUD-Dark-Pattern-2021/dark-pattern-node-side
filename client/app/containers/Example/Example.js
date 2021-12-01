import React, {PureComponent as Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Button, Layout} from 'antd';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

const {Content} = Layout

@connect(
  state => ({
    login: state.user.isLogin,
  }),
)
@withRouter
class Example extends Component {
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
      <Content className={'example-content'}>
        <div id="main-example">

          <div id="header">
            <div id="logo">
              <div id="heading_text">
                <h1>Dark Patterns<span class="haha_colour">Webpage Sample</span></h1>
                <h2>This is a sample webpage full of Park Patterns</h2>
              </div>
            </div>
            <div id="bannerbar">
              <h2 style={{color:"white", textAlign: "center"}}>Sale Ends in 23h:34m:55s</h2>
            </div>
          </div>

          <div id="content_header"></div>
          <div id="site_content">
            <div id="banner">
              <img src="https://dark-pattern-node-js.s3.eu-west-1.amazonaws.com/ocr_resized.jpg" alt="" width={'100%'}/>
            </div>
            <div id="sidebar_container">

              <div class="sidebar">
                <div class="sidebar_top"></div>
                <div class="sidebar_item">
                  <h3>Confirmshaming Dark Pattern</h3>
                  <p>SPRING SALE <br/><br/>
                    ENTER YOUR EMAIL ADDRESS TO RECEIVE 10% OFF<br/><br/>
                    <input type="email" value="Enter email address here..." style={{color: "#aba59c"}} required/> <br/><br/>
                    <input type="submit" value="GIVE ME MY 10%"/> <br/><br/>
                    <a href="#">No thanks, I want to pay full price.</a>
                  </p>
                </div>
                <div class="sidebar_base"></div>
              </div>


              <div class="sidebar">
                <div class="sidebar_top"></div>
                <div class="sidebar_item">
                  <h3>Fake Activity Dark Pattern</h3>
                  <ul>
                    <li>Alan from New Jersey just bought a Christmas Tree</li>
                    <li>Jordan just added this item into the basket</li>
                    <li>55 People are viewing this</li>
                    <li>32 Christmas Tree sold in the last 2 hours</li>
                  </ul>
                </div>
                <div class="sidebar_base"></div>
              </div>
            </div>


            <div id="content">
              <h2 style={{textAlign:"center"}}>Black Friday Sale</h2>
              <h2>Christmas Tree</h2>
              <img src="/assets/img/tree.jpg" alt="Christmas Tree" width="450" height="450" />
                <h4>Receive a $15 voucher when you buy a real Christmas tree for $30* </h4>
                <h4>Limited time Deal, Hurry Up!</h4>
                <br/>
                <p>The festive season is full of traditions, both new and old that all add to the Christmas cheer and
                  wonder,
                  and traditions such as choosing and decorating a real Christmas tree, can also help make our homes
                  feel a little bit merrier as well.</p>
                <p>Buy a real Christmas tree between 22nd November and 23rd December 2020 and receive a voucher,
                  which can be redeemed in store between 10th January and 13th February 2022.</p>
                <p><strong> Cat not included.</strong></p>
                <ul>
                  <li><p><img src="/assets/img/tree1.jpg" alt="Christmas Star" width="100" height="100"/> >>>>>>>> Only
                    5 Left<br/>
                    <a href="https://www.ikea.com/ie/en/stores/events/book/19661/">A Christmas tree that comes with a
                      gift</a></p></li>
                </ul>


                <h2>Stars In Your Window</h2>
                <img src="/assets/img/star.jpeg" alt="Christmas Tree" width="450" height="450" />
                <p>Sprinkle some magic throughout your home by hanging these star-shaped lampshades in your window.
                  With delicate designs, these luminous ornaments create a soft, dreamy atmosphere.</p>
                <ul>
                  <li><img src="/assets/img/star1.jpg" alt="Christmas Star" width="100" height="100" /><br/>
                    <a href="https://www.ikea.com/ie/en/p/strala-lamp-shade-leaf-gold-colour-dot-pattern-10503595/">Lamp
                      Shade, 70cm</a></li>
                  <br/>
                  <li><p><img src="/assets/img/star2.jpg" alt="Christmas Star" width="100" height="100" /> >>>>>>>> This
                    item is selling fast<br/>
                    <a href="https://www.ikea.com/ie/en/p/strala-lamp-shade-leaf-gold-colour-dot-pattern-80503728/">Lamp
                      Shade, 90cm</a></p></li>

                  <li><img src="/assets/img/star3.jpg" alt="Christmas Star" width="100" height="100" /><br/>
                    <a href="https://www.ikea.com/ie/en/p/strala-lamp-shade-leaf-green-20503731/">Lamp Shade, 48cm</a>
                  </li>
                  <br/>
                </ul>
            </div>
          </div>


          <div id="footer">
            <p>Thank you for trying out our Dark Pattern Sample Webpage.</p>
            <p>If you would lke to know more about Dark Patterns, please visit our <a href="#">Information Pages</a></p>
          </div>
        </div>
      </Content>
        );
      }
}
export default Example;
