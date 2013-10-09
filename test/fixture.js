var fs = require("fs")
var assert = require("assert")
var trtd = require("../index.js")

var assertFixture = function(fixtureFile, resultHtml){
  assert.equal( fs.readFileSync("./fixture/" + fixtureFile + ".html", 'utf-8'), resultHtml )
}
describe("trtd", function(){
  it("head = object, body = object", function(){
    var head = {
      param: 'parameter',
      desc: 'description'
    }
    var body = {
      foo: {
        desc: 'hogehoge'
      },
      baz: {
        desc: 'fugafuga'
      }
    }
    assertFixture("normal", trtd(head, body))
  })

  it("head = object, body = array", function(){
    var head = {
      param: 'parameter',
      desc: 'description'
    }
    var body =[
      {
        param: 'foo',
        desc: 'hogehoge'
      },
      {
        desc: 'fugafuga',
        param: 'baz'
      }
    ]
    assertFixture("normal", trtd(head, body))
  })
  it("head = array, body = array", function(){
    var head = [
      'parameter',
      'description'
    ]
    var body =[
      {
        parameter:    'foo',
        description:  'hogehoge'
      },
      {
        description:  'fugafuga',
        parameter:    'baz'
      }
    ]
    assertFixture("normal", trtd(head, body))
  })
  it("head = object, body = array(contain others or lack item)", function(){
    var head = {
      param: 'parameter',
      desc: 'description'
    }
    var body =[
      {
        param: 'foo',
      },
      {
        desc: 'fugafuga',
        param: 'baz',
        other: 'none'
      }
    ]
    assertFixture("lack", trtd(head, body))
  })
  
})