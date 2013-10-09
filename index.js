var cheerio = require("cheerio")
var extend = require("extend")
var html = require("html")
var util = require("util")

var defaultOption = {
  pretty : true,
  indent_size : 2
}

// trtd
//  head , [body , [opt] ]
module.exports = function(head, body, opt){
  if(typeof opt !== "undefined"){
    opt = body
  }
  var options   = extend(defaultOption, opt)
  var tableHtml = table(head, body)

  if(options.pretty){
    tableHtml = html.prettyPrint(tableHtml, {
      indent_size: options.indent_size
    })
  }
  return tableHtml
}


var table = function(head, body){
  if(util.isArray(head)){
    var headObj = {}
    head.forEach(function(h){
      headObj[h] = h
    })
    head = headObj
  }

  var $ = cheerio.load("<div><table>")

  var order = Object.keys(head)
  $("table").append(row($, "th", head, order))

  var bodyItems = undefined
  if(util.isArray(body)){
    bodyItems = body
  }else{
    var keyParam = order[0]
    bodyItems = []
    Object.keys(body).forEach(function(bodyKey){
      var item = body[bodyKey]
      item[keyParam] = bodyKey
      bodyItems.push(item)
    })
  }

  bodyItems.forEach(function(item){
    $("table").append(row($, "td", item, order))
  })

  return $("div").html()
}

var row = function($, tag, obj, order){
  var $row = $("<tr>")
  if(order == undefined){
    order = Object.keys(obj)
  }
  order.forEach(function(key){

    var str = obj[key]
    if(typeof str === "undefined"){
      str = ""
    }
    console.log(key, obj[key], str)

    $row.append( $("<" + tag + ">").text( str ) )
  })
  return $row
}