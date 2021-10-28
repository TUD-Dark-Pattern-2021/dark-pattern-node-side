import React, {PureComponent as Component} from "react";
import PropTypes from "prop-types";
import axios from 'axios'
import { Form, Row, Col, Input, Button, Icon, Select, Table, DatePicker  } from 'antd'
const { Option } = Select


class ModelResources extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: 'Name',
          dataIndex: 'name',
        },
        {
          title: 'Size',
          dataIndex: 'size',
        },
        {
          title: 'LastModified',
          dataIndex: 'last_modified',

        },
        {
          title: 'Link',
          dataIndex: 'url',
          render: (text, record) => (
            <a href={`https://darkpatternsdatasets.s3.eu-west-1.amazonaws.com/${record.name}`} target={'_blank'}>Download</a>
          ),
        },
      ],
      result: []
    }
  }

  componentWillMount() {
    this.getList()
  }

  componentDidMount() {
  }

  handleReset = () => {
    this.props.form.resetFields();
  };

  async getList(values = {}) {
    console.log(values)
    let result = await axios.get('/api/dynamodb/listObjectsS3',  {params: {
        Bucket: 'darkpatternsdatasets'
      }})
    this.setState({
      result:result.data.data
    })
  }

  static propTypes = {
    login: PropTypes.bool,
    // animeList: PropTypes.array,
    // getAnimeList: PropTypes.func
  };

  render() {
    let { columns, result } = this.state
    return <div>
      <div>
        <Table columns={columns} dataSource={result} rowKey={'name'}/>
      </div>
    </div>
  }
}

export default Form.create()(ModelResources);
