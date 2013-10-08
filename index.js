var jsYAML = require('js-yaml')
var cheerio = require("cheerio")
var extend = require("extend")
var html = require("html")
var util = require("util")

module.exports = function(ymlString, opt){
  var options = extend({
    pretty : true,
    indent_size : 2
  }, opt)
  var yaml = jsYAML.safeLoad(ymlString)
  // to table
  var head = yaml.head
  var body = yaml.body
  
  var $ = cheerio.load("<div><table>")
  
  forgeTable($, head, body)
  
  var tableHtml = $("div").html()
  if(options.pretty){
    tableHtml = html.prettyPrint(tableHtml, {
      indent_size: options.indent_size
    })
  }
  return tableHtml

}

var forgeTable = function($, head, body){
  
  // head
  var $head = $("<tr>")
  var headKeys = Object.keys(head)
  $("table").append(forgeRow($, "th", head))

  // body
  var $body = $("<tr>")
  var bodyItems = undefined
  if(util.isArray(body)){
    bodyItems = body
  }else{
    var keyParam = headKeys[0]
    bodyItems = []
    Object.keys(body).forEach(function(bodyKey){
      var item = body[bodyKey]
      item[keyParam] = bodyKey
      bodyItems.push(item)
    })
  }

  bodyItems.forEach(function(item){
    $("table").append(forgeRow($, "td", item, headKeys))
  })

  return $
}

var forgeRow = function($, tag, obj, order){
  var $row = $("<tr>")
  if(order == undefined){
    order = Object.keys(obj)
  }
  order.forEach(function(key){
    $row.append( $("<" + tag + ">").text( obj[key] ) )
  })
  return $row
}