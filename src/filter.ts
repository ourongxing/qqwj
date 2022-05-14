import { Filter, Question } from "typing"
const filter = (res: Record<string, Question[]>) => {
  const filter: Filter[] = [
    {
      title: "CaseNo.2_全文检索Case搜索部分",
      conditions: [
        {
          least: 3,
          options: [
            { num: 72, option: "回忆模式、划重点、荧光笔" },
            {
              num: 72,
              option: "示标题、回忆模式、划重点、荧光笔"
            },
            { num: 72, option: "分类、筛选、排序" },
            { num: 72, option: "果评价、草稿纸、参阅原文" },
            { num: 72, option: "题/正反，填空Cloze、遮挡" },
            { num: 72, option: "统计）、间隔重复复习" }
          ]
        },
        {
          least: 1,
          options: [
            { num: 16, option: "GTD、番茄钟、学习任务管理" },
            {
              num: 16,
              option: "间隔重复或遗忘算法自测记忆、回顾优先级排序、渐进阅读"
            }
          ]
        },
        {
          least: 1,
          options: [
            { num: 74, option: "忆模式、划重点、荧光笔" },
            { num: 74, option: "示标题、回忆模式、划重点、荧光笔" },
            {
              num: 74,
              option: "分类、筛选、排序"
            },
            { num: 74, option: "效果评价、草稿纸、参阅原文" },
            { num: 74, option: "填空Cloze、遮挡" },
            { num: 74, option: "统计）、间隔重复复习" }
          ]
        }
      ]
    }
  ]
  const result = {} as Record<string, string[]>
  Object.entries(res).forEach(([id, data]) => {
    const cacheIndex = {} as Record<number, number>
    filter.forEach(({ conditions: req, title }) => {
      const flag = req.every(k => {
        if ("least" in k) {
          return (
            k.options.filter(m =>
              data
                .find(j => j.num === m.num)
                ?.answers.find(h => h.includes(m.option))
            ).length >= k.least
          )
        } else
          return data
            .find(j => j.num === k.num)
            ?.answers.find(h => h.includes(k.option))
      })
      if (flag) result[title] = [...(result[title] ?? []), id]
    })
  })
  return result
}

export default filter
