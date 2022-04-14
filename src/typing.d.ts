export interface Question {
  num: number
  question: string
  answers: string[]
}

export interface Param {
  src: string
  out: string
  type: "markdown" | "excel" | "json"
}

export type MayBeArray<T> = T[] | T
export interface Filter {
  title: string
  req: {
    and: MayBeArray<{
      num: number
      option: string
    }>[]
    or: {
      num: number
      option: string
    }[]
  }
}
