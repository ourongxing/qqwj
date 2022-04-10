# 腾讯问卷数据解析导出

支持导出 excel，json，markdown，不具备通用性。

### 使用方法

1. 安装 nodejs（自行搜索安装教程
2. 下载脚本 `qqwj.js`
3. 导出腾讯问卷原始数据
4. 命令行执行命令

```shell
// 可以不要文件后缀名
node qqwj.js 需要解析的csv文件 -t excel -o 输出的文件名

// 查看帮助
node qqwj.js -h

Options:
  -t, --type <type>   (choices: "excel", "json", "markdown", default: "excel")
  -o, --output       output file name
  -h, --help         display help for command

Example :
  $ node qqwj.js xxx.csv
  $ node qqwj.js xxx.csv -t json -o yyy
```

### 开发

```js
pnpm i
pnpm dev
```
