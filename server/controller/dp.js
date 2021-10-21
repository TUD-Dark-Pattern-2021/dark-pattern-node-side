const fs = require('fs');
const path = require('path');
const xpath = require('xpath')
const dom = require('xmldom').DOMParser;
const shortid = require('shortid');
const baseController = require('./base.js');
const commons = require("../utils/commons");
const axios = require('axios')
const ddbClient = require("../ddb.js")
const DynamoDB = require("@aws-sdk/client-dynamodb");

// const filePath = path.join(__dirname, 'sample1.html');
// let xml  = fs.readFileSync(filePath, 'utf8');

class dpController extends baseController {
  constructor(req, res) {
    super(req, res);

  }

  async detect(req, res) {
    console.log(req.body.html)
    const html = decodeURIComponent(req.body.html)
    console.log(html)
    const doc = new dom().parseFromString(html)

    let nodes = xpath.select("//text()", doc)
    let result = {
      key: [],
      content: [],
      tag: []
    }
    nodes.forEach((item, index) => {
      if (!item.nodeValue.match(/\n/g)) {
        result.key.push(shortid.generate())
        result.content.push(item.nodeValue)
        result.tag.push('')

        while (item.parentNode !== null) {
          // console.log(parent.parentNode)
          if (item.parentNode.tagName) {
            let attr = ''
            let originalAttr = item.parentNode.attributes
            let len = originalAttr.length
            while (len--) {
              let i = originalAttr[len]
              if (i.name === 'id') {
                if (i.value.indexOf(' ')) {
                  let idList = i.value.split(' ')
                  idList.forEach(value => {
                    attr += `#${value}`
                  })
                  continue
                }
                attr += `#${i.value}`
                continue
              }
              if (i.name === 'class') {
                if (i.value.indexOf(' ')) {
                  let classList = i.value.split(' ')
                  classList.forEach(value => {
                    attr += `.${value}`
                  })
                  continue
                }
                attr += `.${i.value}`
                continue
              }
              attr += `[${i.name}="${i.value}"]`
            }
            attr = item.parentNode.tagName + attr
            result.tag[result.content.length - 1] = attr + " " + result.tag[result.content.length - 1]
          }
          item = item.parentNode
        }
        // console.log(parent)
      }

    })
    // var a = {
    //   "key": [
    //     "NcsdGAMd8",
    //     "VFcDD_G8yr",
    //     "p6U_5K4gLh",
    //     "a96JQLjg2S",
    //     "JspTN1fT9a"
    //   ],
    //     "content" :["Title", "123kjklj", "fdsfs dfd fd", "-70%", "LAST CHANCE"],
    //     "tag": [
    //     "html[lang=en] head title#bacc ",
    //     "html[lang=en] body div#123 p#aaa span#acccc ",
    //     "html[lang=en] body div#123 p#aaa i[data=accdddd].abcccc#aaaaddd ",
    //     "html[lang=en] body div#123 p#aaa div ",
    //     "html[lang=en] body div#123 p#aaa div p "
    //   ]
    // }

    let data = await axios.post('http://darkpatternpython-env.eba-dnzamtyr.eu-west-1.elasticbeanstalk.com/api/parse', {
      ...result
    })
    res.send(commons.resReturn(data.data));
  }

  async newReport(req, res) {

    let table = "Report";
    let id = shortid.generate();
    let first = new Date();

    console.log(first.toISOString());
    let params = {
      TableName: table,
      Item: {
        id: {
          S: id
        },
        status: {
          N: "1"
        },
        webType: {
          S: req.body.webType
        },
        screenshot: {
          N: req.body.screenshot
        },
        keyword: {
          S: req.body.keyword
        },
        category: {
          S: req.body.category
        },
        description: {
          S: req.body.description
        },
        createdTime: {
          S: first.toISOString()
        },


      }
    };
    console.log(params, 'params')

    console.log("Adding a new report");

    const run = async () => {
      try {
        const data = await ddbClient.send(new DynamoDB.PutItemCommand(params));
        console.log(data);
        res.send(commons.resReturn(params));
        return data;
      } catch (err) {
        console.error(err);
      }
    };
    run();
  }
  async getList(req, res) {

    let tableName = req.body.tableName;
    const scanQuery = {

      TableName: tableName,
      Select: "ALL_ATTRIBUTES",
      Limit: 10000
    };

    const run = async () => {
      try {
        const data = await ddbClient.send(new DynamoDB.ScanCommand(scanQuery));
        console.log(data);
        res.send(commons.resReturn(data));
      } catch (err) {
        console.error(err);
      }
    };
    run();

  }

  async updateReport(req, res) {

    let newStatus = req.body.status
    let params = {

      TableName: "Report",
      Key: {
        id: { S: req.body.id },
      },
      UpdateExpression: "SET #s = :q",
      ExpressionAttributeValues: {
        ":q":{ N: newStatus },
      },
      ExpressionAttributeNames: {
        "#s": "status"
    },
      ReturnValues: "UPDATED_NEW",
    };

    console.log(params)

    const run = async () => {
      try {
        const data = await ddbClient.send(new DynamoDB.UpdateItemCommand(params));
        console.log(data);
        res.send(commons.resReturn(data));
      } catch (err) {
        console.error(err);
      }
    };
    run();

  }
}

module.exports = dpController;
