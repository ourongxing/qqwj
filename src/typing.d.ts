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

export type ThreeTypes<T> =
  | T
  | {
      least: number
      options: T[]
    }

export interface Filter {
  title: string
  conditions: ThreeTypes<{
    num: number
    option: string
  }>[]
}
