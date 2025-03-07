import { evaluate } from "mathjs"

const EXCEL_JS_FUNCTION_MAP = {
  // JavaScript Math와 직접 매핑
  floor: "Math.floor",
  ceil: "Math.ceil",
  round: "Math.round",
  abs: "Math.abs",
  min: "Math.min",
  max: "Math.max",
  pow: "Math.pow",
  sqrt: "Math.sqrt",
  // 엑셀 함수와의 매핑 (필요 시 확장)
  ROUND: "Math.round",
  CEILING: "Math.ceil",
  FLOOR: "Math.floor",
  ABS: "Math.abs",
}

const extractKeywords = (equation) => {
  // 함수 이름과 인자 분리 (예: "round(x, 2)" → "round"과 "x, 2")
  const functionRegex = /^([a-zA-Z]+)\((.+)\)$/
  const match = equation.match(functionRegex)

  if (!match) return []

  const funcName = match[1] // "floor", "round" 등
  const innerExpression = match[2] // "bk_price + m_supply_total_price - pre_payment - balance"

  // 연산자와 숫자(인자) 제외하고 변수 이름만 추출
  const parts = innerExpression
    .split(/[\s]*(?:[-+*/()]|,\s*\d+\s*|\d+\s*,)[\s]*/) // 연산자, 괄호, 숫자 인자 분리
    .map((part) => part.trim())
    .filter(
      (part) =>
        part.length > 0 && // 빈 문자열 제외
        !/^\d+$/.test(part) && // 숫자 제외
        !Object.keys(EXCEL_JS_FUNCTION_MAP).includes(part) // 함수 이름 제외
    )

  return parts
}

const calculateEquation = (equation, data) => {
  console.log("equation: ", equation)
  const keywords = extractKeywords(equation)
  const newData = {}
  keywords.forEach((key) => {
    newData[key] = data[key] ?? 0 // null/undefined 처리
  })
  console.log("newData: ", newData)
  try {
    return evaluate(equation, newData)
  } catch (error) {
    console.error("Evaluation error:", error)
    return 0
  }
}
