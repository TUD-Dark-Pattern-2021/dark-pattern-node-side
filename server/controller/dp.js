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
const docClient = require("../docClient.js")
const { unmarshall } = require("@aws-sdk/util-dynamodb");
const cheerio = require('cheerio');
const {element} = require("prop-types");

// const filePath = path.join(__dirname, 'sample1.html');
// let xml  = fs.readFileSync(filePath, 'utf8');

class dpController extends baseController {
  constructor(req, res) {
    super(req, res);

  }

  async detect(req, res) {
    try {
      let $ = cheerio.load(decodeURIComponent(req.body.html))
      $('script, style, noscript, svg').each(function(index, element) {
        $(this).empty()
      })
      const doc = new dom().parseFromString($.html())

      let result = {
        key: [],
        content: [],
        tag: [],
        type: []
      }

      let nodes = xpath.select("//text()", doc)
      nodes.forEach((item, index) => {
        if (!item.nodeValue.match(/\n/g)) {

          result.key.push(shortid.generate())
          result.content.push(item.nodeValue)
          result.tag.push('')
          result.type.push('text')

          while (item.parentNode !== null) {
            // console.log(parent.parentNode)
            if (item.parentNode.tagName) {
              if (item.parentNode.tagName === 'script' || item.parentNode.tagName === 'style') {
                result.key.pop()
                result.content.pop()
                result.tag.pop()
                result.type.pop()
                break
              }

              if (item.parentNode.tagName === 'button') {
                result.type[result.type.length -1] = 'button'
              }

              if (item.parentNode.tagName === 'a') {
                result.type[result.type.length -1] = 'link'
              }

              let attr = ''
              let originalAttr = item.parentNode.attributes
              let len = originalAttr.length
              while (len--) {
                let i = originalAttr[len]
                if (i.name === 'id') {
                  if (i.value.indexOf(' ')) {
                    let idList = i.value.split(' ')
                    idList.forEach(value => {
                      if (value) {
                        attr += `#${value}`
                      }
                    })
                    break
                  }
                  attr += `#${i.value}`
                  break
                }
                if (i.name === 'class') {
                  if (i.value.indexOf(' ')) {
                    let classList = i.value.split(' ')
                    classList.forEach(value => {
                      if (value) {
                        attr += `.${value}`
                      }
                    })
                    break
                  }
                  attr += `.${i.value}`
                  break
                }
                // filter the attributes starts with 'data'
                // data-options
                if (i.name.indexOf('data') > -1 || i.name.indexOf('style') > -1) {
                  continue
                }
                if (i.value.indexOf("\"") > -1) {
                  console.log(i.value)
                  i.value = i.value.replace(/\"/g, "\\\"")
                  attr += `[${i.name}='${i.value}']`
                } else if (i.value.indexOf("\'") > -1) {
                  i.value = i.value.replace(/\'/g, "\\\'")
                  attr += `[${i.name}="${i.value}"]`
                } else {
                  attr += `[${i.name}="${i.value}"]`
                }
              }
              attr = item.parentNode.tagName + attr
              result.tag[result.content.length - 1] = attr + " " + result.tag[result.content.length - 1]
            }
            item = item.parentNode
          }
          // console.log(result.tag[result.content.length - 1])
        }

      })

      let images = xpath.select("//img", doc)
      images.forEach(node =>{
        let originalAttr = node.attributes
        let len = originalAttr.length
        while(len--) {
          if (originalAttr[len].name === 'src') {
            // console.log(originalAttr[len].value)
            result.key.push(shortid.generate())
            result.content.push(originalAttr[len].nodeValue)
            result.tag.push(`img[src='${originalAttr[len].nodeValue}']`)
            result.type.push('image')
            break
          }
        }
      })


      let checkboxes = xpath.select("//input", doc)
      checkboxes.forEach(node =>{
        let originalAttr = node.attributes
        let len = originalAttr.length
        while(len--) {
          if (originalAttr[len].name === 'href') {
            // console.log(originalAttr[len].value)
            result.key.push(shortid.generate())
            result.content.push(originalAttr[len].nodeValue)
            result.tag.push(`a[href='${originalAttr[len].nodeValue}']`)
            result.type.push('link')
            break
          }
        }
      })

      console.log(result)
      // let srcs = xpath.select("//img//@src", doc)
      // srcs.forEach(item =>{
      //   console.log(item.value)
      // })
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
      // console.log(result)
      // fs.writeFileSync('1.txt', JSON.stringify(result))
      console.log(req.body.is_orc)
      let data = await axios.post('http://darkpatternpython-env.eba-dnzamtyr.eu-west-1.elasticbeanstalk.com/api/parse', {
        ...result,
        is_ocr: req.body.is_orc
      })
      console.log(data.data)
      res.send(commons.resReturn(data.data, data.status));
    }catch (e) {
      console.log(commons.resReturn(e, 500, 'error'))
      res.send(commons.resReturn(e, 500, 'error'))
    }

  }

  async newReport(req, res) {

    let table = "Report";
    let id = shortid.generate();
    let params = {
      TableName: table,
      Item: {
        id: {
          S: id
        },
        url: {
          S: req.body.url
        },
        status: {
          N: "1"
        },
        webType: {
          S: "shopping"
        },
        screenshot: {
          N: "5"
        },
        keyword: {
          S: req.body.keyword
        },
        category: {
          N: String(req.body.category)
        },
        description: {
          S: req.body.description
        },
        createdTime: {
          N: String(Date.now())
        },

      },
      // ProjectionExpression: "#u",
      // ExpressionAttributeNames: {
      //   "#u": "url"
      // }
    };
    console.log(params, 'params')

    console.log("Adding a new report");

    const run = async () => {
      try {
        const data = await ddbClient.send(new DynamoDB.PutItemCommand(params));
        console.log(data);
        res.send("Added Report");
      } catch (err) {
        console.error(err);
      }
    };
    run();
  }
  async getList(req, res) {

    let tableName = "Report";
    const scanQuery = {

      TableName: tableName,
      Select: "ALL_ATTRIBUTES",
      Limit: 10
    };

    const run = async () => {
      try {
        const data = await ddbClient.send(new DynamoDB.ScanCommand(scanQuery));
        console.log(data);
        let newData = data.Items.map(item => {
          return unmarshall(item)
        })
        res.send(commons.resReturn(
          {
            data: newData
          }));
      } catch (err) {
        console.error(err);
      }
    };
    run();

  }

  getListPage(req, res) {

    //   let tableName = req.body.tableName;
    //   const scanQuery = {

    //     TableName: tableName,
    //     Select: "ALL_ATTRIBUTES",
    //     Limit: 10
    //   };

    //   docClient.scan(scanQuery, function scanUntilDone(err, data) {
    //     if (err) {
    //       console.log(err, err.stack);
    //     } else {

    //       if (data.LastEvaluatedKey) {
    //         scanQuery.ExclusiveStartKey = data.LastEvaluatedKey;

    //         docClient.scan(params, scanUntilDone);
    //       }
    //     }
    // });

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
        ":q": { N: String(newStatus) },
      },
      ExpressionAttributeNames: {
        "#s": "status"
      },
      ReturnValues: "UPDATED_NEW",
    };

    console.log(params)


    const run = async () => {
        console.log("fdwfw")
        const data = await ddbClient.send(new DynamoDB.UpdateItemCommand(params));
        res.send(commons.resReturn(data));
        if (newStatus == "4") {

          let params = {
            TableName: "Report",
            Key: {
              id: { S: req.body.id },
            },
            ProjectionExpression: "#id, #url, description, keyword, webType", 
            ExpressionAttributeNames: {
              "#id": "id",
              "#url": "url"
            }
          };

          const data2 = await ddbClient.send(new DynamoDB.GetItemCommand(params));
          console.log(data2.Item.url.S);
          params = {
            TableName: "Dataset",
            Item:{
              Website_Page: {
                S: data2.Item.url.S
              },
              Pattern_String: {
                S: data2.Item.description.S
              },
              Pattern_Category:{
                S:data2.Item.webType.S
              },
              Pattern_Type: {
                S:data2.Item.keyword.S
              }
            }
          };
          const data3 = await ddbClient.send(new DynamoDB.PutItemCommand(params));
          console.log(data3);
        }
        else if (newStatus == "3"){
          console.log("here")
          let params = {
            TableName: "Report",
            Key: {
              id: { S: req.body.id },
            }
          };
          const data4 = await ddbClient.send(new DynamoDB.DeleteItemCommand(params));
          console.log(data4);
        }
        
    }
    run();
  }

  async checkDP(req, res) {
    let content = req.body.content
    let data = await axios.post('http://darkpatternpython-env.eba-dnzamtyr.eu-west-1.elasticbeanstalk.com/api/checkDP', {
      "content": content
    })
    res.send(commons.resReturn(data.data));
  }
  async checkOCR(req, res) {
    let content = req.body.content
    let data = await axios.post('http://darkpatternpython-env.eba-dnzamtyr.eu-west-1.elasticbeanstalk.com/api/checkOCR', {
      "content": content
    })
    res.send(commons.resReturn(data.data));
  }
  async autoTrain(req, res) {


    res.send(commons.resReturn({code: 200}));
  }
}

module.exports = dpController;
