# `Proxy`

```plain
把原来的地址改成
//proxy.xinshangshangxin.com/origin_path?__origin__=${encodeURIComponent(your_target_domain)}&__headers__=${cover_header_json_format}

比如原来地址是  http://example.com/path?query=1
改变后地址是    http://proxy.xinshangshangxin.com/path?__origin__=http%3A%2F%2Fexample.com%2Fpath&query=1
```

## build

```bash
yarn
# npm install
# cnpm install

PORT=3000 node index.js
```
