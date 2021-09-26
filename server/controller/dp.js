const fs = require('fs');
const path = require('path');
const xpath = require('xpath')
const dom = require('xmldom').DOMParser;
const shortid = require('shortid');
const baseController = require('./base.js');
const commons = require("../utils/commons");
const axios = require('axios')

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
                if (i.value.indexOf(' ')){
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
}

module.exports = dpController;
