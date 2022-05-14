import { parse } from "csv/sync"
import fs from "fs-extra"
import genData from "genData"
import { Question } from "typing"
import { Command, Option } from "commander"
import path from "path"
import { ensureSuffix } from "utils"
import export2json from "json"
import export2excel from "excel"
import export2md from "markdown"
import filter from "filter"
import genDataEN from "genDtataEN"
const program = new Command()
const main = async (src: string, isEnglish = false) => {
  const csvFile = await fs.readFile(src)
  const cols = parse(csvFile, {
    relax_quotes: true,
    columns: true
  }) as Array<Record<string, string>>
  const res = {} as Record<string, Question[]>
  cols.forEach(col => {
    const data = isEnglish ? genDataEN(col) : genData(col)
    res[data[0].answers[0]] = data
  })
  return res
}

program.addHelpText(
  "after",
  `
Example :
  $ node qqwj.js xxx.csv
  $ node qqwj.js xxx.csv -t json -o yyy`
)

program
  .command("export <src>")
  .description("export to excel, json, markdown")
  .addOption(
    new Option("-t, --type <type>")
      .choices(["excel", "json", "markdown"])
      .default("excel")
  )
  .option(
    "-o, --output <name>",
    "output file name, default MNExplor探索计划用户分型",
    "MNExplor探索计划用户分型"
  )
  .option("-e, --english", "英文问卷", false)
  .action(async (src, { type, output, english }) => {
    const outFileName = ((type, output) => {
      switch (type) {
        case "markdown":
          return ensureSuffix(output, "md")
        case "json":
          return ensureSuffix(output, "json")
        default:
          return ensureSuffix(output, "xlsx")
      }
    })(type, output)
    const res = await main(
      path.resolve(process.cwd(), ensureSuffix(src, "csv")),
      english
    )
    const filePath = path.resolve(process.cwd(), outFileName)
    try {
      switch (type) {
        case "markdown":
          export2md(res, filePath)
          break
        case "json":
          export2json(res, filePath)
          break
        default:
          export2excel(res, filePath)
      }
      console.log(`导出成功，${filePath}`)
    } catch (err) {
      console.log("导出失败")
      console.log(err)
    }
  })

program
  .command("filter <src>")
  .option("-e, --english", "英文问卷", false)
  .description("clone a repository into a newly created directory")
  .action(async (src, { english }) => {
    const res = await main(
      path.resolve(process.cwd(), ensureSuffix(src, "csv")),
      english
    )
    console.log(filter(res))
  })

program.parse(process.argv)
