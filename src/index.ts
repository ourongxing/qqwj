import { parse } from "csv/sync"
import fs from "fs-extra"
import genData from "genData"
import { Param, Question } from "typing"
import { Command, Option } from "commander"
import path from "path"
import { ensureSuffix } from "utils"
import export2json from "json"
import export2excel from "excel"
import export2md from "markdown"
const program = new Command()
const main = async (param: Param) => {
  const { src, out, type } = param
  const csvFile = await fs.readFile(src)
  const cols = parse(csvFile, {
    relax_quotes: true,
    columns: true
  }) as Array<Record<string, string>>
  const res = {} as Record<string, Question[]>
  cols.forEach(col => {
    const data = genData(col)
    res[data[0].answers[0]] = data
  })
  switch (type) {
    case "markdown":
      export2md(res, out)
      break
    case "json":
      export2json(res, out)
      break
    default:
      export2excel(res, out)
  }
}

program
  .addOption(
    new Option("-t, --type <type>")
      .choices(["excel", "json", "markdown"])
      .default("excel")
  )
  .option("-o, --output", "output file name", "MNExplor探索计划用户分型")
  .addHelpText(
    "after",
    `
Example :
  $ node qqwj.js xxx.csv
  $ node qqwj.js xxx.csv -t json -o yyy`
  )

program.parse(process.argv)
const options = program.opts() as {
  output: string
  type: "markdown" | "excel" | "json"
}

const [src] = program.args
if (!src) console.log("请输入导出的 csv 文件名，后缀可省略")
else {
  const outFile = (file => {
    switch (options.type) {
      case "markdown":
        return ensureSuffix(file, "md")
      case "json":
        return ensureSuffix(file, "json")
      default:
        return ensureSuffix(file, "xlsx")
    }
  })(options.output)
  main({
    src: path.resolve(process.cwd(), ensureSuffix(src, "csv")),
    out: path.resolve(process.cwd(), outFile),
    type: options.type
  })
}
