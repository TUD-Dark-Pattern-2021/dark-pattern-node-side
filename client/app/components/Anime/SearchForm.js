import React, {PureComponent as Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Button, Icon, Row, Col, Input, Form, DatePicker, Radio, Select} from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment'
import {getAnimeList} from "../../reducer/modules/anime";
const { Option } = Select
@connect(
  state => ({
    login: state.user.isLogin,
    animeList: state.anime.list
  }),
  {
    getAnimeList
  }
)

class SearchForm extends Component {
  constructor(props) {
    super(props)
    this.state={
      isStartYearOpen: false,
      isEndYearOpen: false,
      startTime: null,
      endTime: null,
      loading: false
    }
  }

  static propTypes = {
    login: PropTypes.bool,
    animeList: PropTypes.array,
    getAnimeList: PropTypes.func
  }

  async componentDidMount() {
  }

  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      console.log('Received values of form: ', values);
      if (values.start_year) {
        values.start_year= moment(values.start_year).format('YYYY')
      }
      if (values.end_year) {
        values.end_year= moment(values.end_year).format('YYYY')
      }
      this.setState({
        loading: true
      })
      await this.props.getAnimeList(values)
      this.setState({
        loading: false
      })
    });
  };
  handleReset = () => {
    this.props.form.resetFields();
  };

  render() {
    const {getFieldDecorator, setFieldsValue} = this.props.form;
    let { isStartYearOpen, isEndYearOpen, startTime, endTime } = this.state
    return (
      <div className="search-form">
        <Form onSubmit={this.handleSearch} layout={"inline"}>
          <h3>Search</h3>
          <Row>
            <Col>
              <Form.Item label="Title">
                {getFieldDecorator("title", {
                  rules: [
                    {
                      max: 30,
                      message: 'words too long!',
                    },
                  ],
                })(<Input
                  placeholder="Anime Name"
                  autoComplete={"off"}
                  style={{width: 170}}
                  prefix={<Icon type="aliwangwang" style={{ color: 'rgba(0,0,0,.25)' }} />}
                />)}
              </Form.Item>
              <Form.Item label="Desc">
                {getFieldDecorator("desc", {
                  rules: [
                    {
                      max: 30,
                      message: 'words too long!',
                    },
                  ],
                })(<Input
                  placeholder="Anime Desc"
                  autoComplete={"off"}
                  style={{width: 170}}
                  prefix={<Icon type="book" style={{ color: 'rgba(0,0,0,.25)' }} />}
                />)}
              </Form.Item>
              <Form.Item label="Star">
                {getFieldDecorator("stars", {
                  rules: [
                    {
                      max: 30,
                      message: 'words too long!',
                    },
                  ],
                })(<Input
                  placeholder="Anime Star"
                  autoComplete={"off"}
                  style={{width: 170}}
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                />)}
              </Form.Item>
            </Col>
          </Row>

          <h3>Filter</h3>
          <Row>
            <Col>
              <Form.Item label="Start Year">
                {getFieldDecorator("start_year", {})(
                  <DatePicker
                    mode={"year"}
                    placeholder={"Anime Start Year"}
                    open={isStartYearOpen}
                    format="YYYY"
                    onOpenChange={(status) => {
                      if(status){
                        this.setState({isStartYearOpen: true})
                      } else {
                        this.setState({isStartYearOpen: false})
                      }
                    }}
                    onPanelChange={(v) => {
                      console.log(v)
                      this.setState({
                        isStartYearOpen: false
                      })
                      setFieldsValue({
                        'start_year': v
                      })
                    }}
                  />)}
              </Form.Item>
              <Form.Item label="End Year">
                {getFieldDecorator("end_year", {})(
                  <DatePicker
                    mode={"year"}
                    open={isEndYearOpen}
                    format="YYYY"
                    placeholder={"Anime End Year"}
                    onOpenChange={(status) => {
                      if(status){
                        this.setState({isEndYearOpen: true})
                      } else {
                        this.setState({isEndYearOpen: false})
                      }
                    }}
                    onPanelChange={(v) => {
                      console.log(v)
                      this.setState({
                        isEndYearOpen: false
                      })
                      setFieldsValue({
                        'end_year': v
                      })
                    }}
                  />
                  )}
              </Form.Item>

              <Form.Item label="Genre">
                {getFieldDecorator("tag", {})(
                  <Select
                    placeholder="Anime Genre"
                    style={{ width: 270 }}
                    mode="multiple"
                  >
                    <Option value="Animation">Animation</Option>
                    <Option value="Adventure">Adventure</Option>
                    <Option value="Drama">Drama</Option>
                    <Option value="Romance">Romance</Option>
                    <Option value="Comedy">Comedy</Option>
                    <Option value="Fantasy">Fantasy</Option>
                    <Option value="Action">Action</Option>
                    <Option value="Thriller">Thriller</Option>
                    <Option value="Horror">Horror</Option>
                    <Option value="Sci-Fi">Sci-Fi</Option>
                    <Option value="Sport">Sport</Option>
                    <Option value="Mystery">Mystery</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
          <h3>Order By Rate</h3>
          <Row>
            <Col>
              <Form.Item>
                {getFieldDecorator('rate')(
                  <Radio.Group>
                    <Radio value="-1">desc</Radio>
                    <Radio value="1">asc</Radio>
                  </Radio.Group>,
                )}
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={this.state.loading}>
              Search
            </Button>
          </Form.Item>
          <Form.Item>
            <Button onClick={this.handleReset}>
              Clear
            </Button>
          </Form.Item>

        </Form>
      </div>
    )
  }
}

export default Form.create({name: 'advanced_search'})(SearchForm);
