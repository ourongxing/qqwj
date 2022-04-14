import { Filter, Question } from "typing"
const filter = (res: Record<string, Question[]>) => {
  const filter: Filter[] = [
    {
      title: "CaseNo.2_全文检索Case搜索部分",
      req: {
        and: [
          { num: 72, option: "全局搜索｜搜索参阅、首页搜索、Spotlight" },
          {
            num: 72,
            option: "几种关系临时参阅浮窗：链接、引用、同标签、全局搜索结果"
          },
          { num: 72, option: "错题库，标签编码库" },
          { num: 72, option: "#学习模式 🔗标题链接" },
          { num: 72, option: "概要关系编辑、PK连线手势" }
        ],
        or: [
          { num: 72, option: "子脑图视图组合、悬浮分割视图❇️" },
          { num: 16, option: "类似标签的知识推荐，自由漫步推荐" },
          { num: 16, option: "rence，并选择创建和已有笔记间的链接" },
          { num: 16, option: "、通过字段看板多维透视数据库笔记" }
        ]
      }
    }
  ]
  const result = {} as Record<string, string[]>
  Object.entries(res).forEach(([id, data]) => {
    filter.forEach(({ req, title }) => {
      const and = req.and.every(k => {
        if (Array.isArray(k))
          return k.some(m =>
            data
              .find(j => j.num === m.num)
              ?.answers.find(h => h.includes(m.option))
          )
        else
          return data
            .find(j => j.num === k.num)
            ?.answers.find(h => h.includes(k.option))
      })
      const or = req.or.some(k =>
        data.find(j => j.num === k.num)?.answers.find(h => h.includes(k.option))
      )
      if (and && or) result[title] = [...(result[title] ?? []), id]
    })
  })
  return result
}

export default filter
