const genData = (col: string[]) => {
  const res = [] as {
    num: number
    question: string
    answers: string[]
  }[]
  Object.entries(col).reduce(
    (acc, cur) => {
      let [question, answer] = cur
      if (answer) {
        const num = /^(\d+).*$/.test(question)
          ? Number(question.replace(/^(\d+).*$/, "$1"))
          : 0
        question = question.replace(/^\d+\.\s*/, "").replace(/:.*$/, "")
        if (question.includes("编号")) question = "编号"
        answer = answer.replace("[图片]", "").trim()
        const n = {
          num,
          question,
          answers: [answer]
        }
        if (num && num === acc.num) {
          const last = res[res.length - 1].answers
          if (
            /^[A-Z]{0,2}\./.test(last[0]) &&
            !/^[A-Z]{0,2}\./.test(answer) &&
            answer
          ) {
            last[last.length - 1] = last[last.length - 1].replace(
              /___+.*$/,
              `（${answer}）`
            )
          } else last.push(answer)
        } else res.push(n)
        return n
      }
      return acc
    },
    {} as {
      num: number
      question: string
      answers: string[]
    }
  )
  res.forEach(({ answers }, index) => {
    if (answers.length > 1 && answers.every(k => Number.isInteger(Number(k)))) {
      res[index].answers = answers.map((k, i) => {
        return res[index - 1].answers[Number(k) - 1]
      })
    }
  })
  res.forEach(({ num, answers }) => {
    if (num === 16) {
      answers.forEach(k => {
        const index = "ABCDEFGHIJKLMNOPQRS".indexOf(k[0])
        if (index > 0) {
          res.reduce((acc, cur) => {
            if (cur.num < 36) {
              if (cur.num === 18 + index - 1) {
                acc = {
                  ...acc,
                  ...cur.answers.reduce((a, h, i) => {
                    a[36 + i + 2 * (index - 1)] = [k, h].map(x =>
                      x.replace(/^\w+\.\s*/, "").replace(/^\d+\.\s*/, "")
                    )
                    return a
                  }, {} as Record<string, string[]>)
                }
              }
            } else {
              // console.log(acc)
              if (Object.keys(acc).includes(String(cur.num))) {
                const [x, xx] = acc[cur.num]
                cur.question = cur.question.replace("XX", xx).replace("X", x)
              }
            }
            return acc
          }, {} as Record<string, string[]>)
        }
      })
    } else if (num === 74 || num === 78) {
      for (let i = 0; i < 3; i++) {
        res.forEach((d, j) => {
          if (d.num === num + i + 1) {
            if (answers[i])
              d.question = d.question.replace(
                /XXX/,
                answers[i].replace(/^\w+\.\s*/, "").replace(/^\d+\.\s*/, "")
              )
          }
        })
      }
    }
  })
  res.forEach(({ answers }, index) => {
    res[index].answers = answers.map(k =>
      k
        .replace(/^\w+\.\s*/, "")
        .replace(/^\d+\.\s*/, "")
        .replace(/___+.*$/, "")
    )
  })
  return res.filter(k => !k.question.includes("X"))
}

export default genData
