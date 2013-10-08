var fs = require("fs")
var assert = require("assert")
var yamble = require("../index.js")
describe("yaml fixture test", function(){
  var files = [
    "normal",
    "array"
  ]
  files.forEach(function(file){
    it(file, function(){
      var yaml = fs.readFileSync("./fixture/" + file + ".yaml", "utf-8")
      var html = fs.readFileSync("./fixture/" + file + ".html", "utf-8")
      var result = yamble(yaml)
      assert.equal(result, html)
    })
  })
})