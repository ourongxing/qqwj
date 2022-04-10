import fs from "fs-extra"
import path from "path"
import { Question } from "typing"
const export2md = (res: Record<string, Question[]>, file: string) => {
  let content = `# ${path.basename(file, ".md")}\n`
  Object.entries(res).forEach(([num, data]) => {
    content += `\n## ${num}\n`
    data.forEach(({ num, question, answers }, index) => {
      if (index === 0) {
        content += `\n**问卷信息**\n`
      } else if (num === 0) {
        content += `\n${question}`
        content += `\n- ${answers[0]}\n`
      } else {
        content += `\n**${num}. ${question}**`
        answers.forEach(k => {
          content += `\n- ${k}\n`
        })
      }
    })
  })
  fs.writeFileSync(file, content)
}
export default export2md
