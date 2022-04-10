import { Question } from "typing"
import fs from "fs-extra"
const export2json = (res: Record<string, Question[]>, file: string) => {
  fs.writeFileSync(file, JSON.stringify(res, undefined, 2))
}
export default export2json
