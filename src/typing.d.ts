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
