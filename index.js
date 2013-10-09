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
  var headObj = {}
  if(util.isArray(head)){
    head.forEach(function(h){
      headObj[h] = h
    })
  }else{
     headObj = head
  }

  var bodyItems = []
  if(util.isArray(body)){
    bodyItems = body
  }else{
    var keyParam = "key"
    if(headObj){
      keyParam = Object.keys(headObj)[0]
    }
    bodyItems = []
    Object.keys(body).forEach(function(bodyKey){
      var item = body[bodyKey]
      item[keyParam] = bodyKey
      bodyItems.push(item)
    })
  }

  var order = []
  try{
    order = Object.keys(headObj)
  }catch(e){
    order = Object.keys(bodyItems[0])
  }

  var $ = cheerio.load("<div><table>")
  
  if(headObj){
    $("table").append(row($, "th", headObj, order))
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
    $row.append( $("<" + tag + ">").text( str ) )
  })
  return $row
}