# trtd
Render Html table from object


# install
```
npm install trtd
```

# usage
```js
var trtd = require("trtd")
var html = trtd({ head : "object"}, { body : "object"})
```

# API

## trtd( head, body , [ opt ] )
- `head`
    - `Array` or `Object` or `undefined`
    - Rendered as head.
    - If `undefined`, only render
- `body`
    - `Array` or `Object`
    - Render as body.
- `opt`
    - `Object`
    - `pretty` (default `true`) : pretty print flag
    - `indent_size` (default `2`) : html indet size

# Example

```html
<table>
  <tr>
    <th>parameter</th>
    <th>description</th>
  </tr>
  <tr>
    <td>foo</td>
    <td>hogehoge</td>
  </tr>
  <tr>
    <td>baz</td>
    <td>fugafuga</td>
  </tr>
</table>
```
If you want get above html, can these parameters.

- head = object, body = object

```js
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
trtd(head, body)
```

- head = object, body = array

```js
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
trtd(head, body)
```

- head = array , body = array

```js
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
trtd(head, body)
```
