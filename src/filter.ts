import { Filter, Question } from "typing"
const filter = (res: Record<string, Question[]>) => {
  const filter: Filter[] = [
    {
      title: "CaseNo.2_全文检索Case搜索部分",
      req: {
        and: [
          "#首页 🔍全局搜索｜搜索参阅、首页搜索、Spotlight",
          "几种关系临时参阅浮窗：链接、引用、同标签、全局搜索结果",
          "纲筛选视图，错题库，标签编码库",
          "#学习模式 🔗标题链接",
          "概要关系编辑、PK连线手势"
        ],
        or: [
          "窗口 📘多个子脑图视图组合、悬浮分割视图❇️",
          "基于NLP词频的SeeAlso智能推荐，类似标签的知识推荐，自由漫步推荐",
          "接收推荐Unlinked reference，并选择创建和已有笔记间的链接",
          "笔记库、知识库、通过字段看板多维透视数据库笔记"
        ]
      }
    },
    {
      title: "CaseNo.3_子脑图的二次综合Case",
      req: {
        and: [
          "多个子脑图视图组合、悬浮分割视图❇️",
          "图手写区｜位置绑定到卡、圈卡手势、背景",
          "脑图创建、塌缩分支、焦点模式、子脑图列表",
          "脑图（+大纲）并列组合视图",
          "概要关系编辑、PK连线手势",
          "Apple Pencil手写记录笔记"
        ],
        or: [
          "多任务｜分屏，多开，跨窗口联动定位，拖",
          "质打印：脑图笔记、PDF笔记、大纲笔记",
          "习联动，打印纸质资料，对照纸质课本，扫描纸质资料，拍照摘录纸质",
          "、接收推荐Unlinked reference，并选择创建和已有笔记间的链接"
        ]
      }
    }
  ]
  const result = {} as Record<string, string[]>
  Object.entries(res).forEach(([id, data]) => {
    const answers = [] as string[]
    data.forEach(({ num, answers: answer }) => {
      if (num === 16 || num === 72) {
        answers.push(...answer)
      }
    })
    filter.forEach(({ req, title }) => {
      const and = req.and.every(k =>
        answers.filter(h => h.includes(k)).length ? true : false
      )
      const or = req.or.some(k =>
        answers.filter(h => h.includes(k)).length ? true : false
      )
      if (and && or) result[title] = [...(result[title] ?? []), id]
    })
  })
  return result
}

export default filter
