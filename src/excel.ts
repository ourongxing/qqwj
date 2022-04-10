import xlsx from "node-xlsx"
import fs from "fs-extra"
import { Question } from "typing"
const export2excel = (res: Record<string, Question[]>, file: string) => {
  const sheet = Object.values(res).reduce((acc, cur) => {
    const questions = [] as string[]
    const answers = [] as string[]
    cur.forEach(k => {
      questions.push(k.num ? `${k.num} ${k.question}` : k.question)
      answers.push(
        k.answers.length > 1
          ? k.answers.map((h, j) => `${j + 1}. ${h}`).join("\n")
          : k.answers[0]
      )
    })
    acc.push(questions)
    acc.push(answers)
    return acc
  }, [] as string[][])
  const buffer = xlsx.build([{ name: "Sheet", data: sheet, options: {} }])
  fs.writeFileSync(file, buffer)
}
export default export2excel
