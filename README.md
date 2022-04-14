## 腾讯问卷数据解析
> 不具备通用性

1. 配置环境
```shell
brew install node pnpm
```
2. 克隆仓库到本地
```shell
git clone https://github.com/ourongxing/qqwj.git
```
3. 初始化
```shell
cd qqwj && pnpm i
```

4. 执行，有两个命令
```shell
pnpm export
pnpm filter
```

### 导出
```shell
pnpm export 腾讯问卷原始数据 -n 导出的文件名 -t 导出的文件类型

Options:
  -t, --type <type>     (choices: "excel", "json", "markdown", default: "excel")
  -o, --output <name>  output file name, default MNExplor探索计划用户分型 (default: "MNExplor探索计划用户分型")
```

### 筛选
目前仅支持筛选 16 和 72 题。需要在 `src/filter.ts` 中修改筛选条件。

```shell
pnpm filter 腾讯问卷原始数据
```