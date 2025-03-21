import { evaluate } from "mathjs";

// 수식 계산 함수
export const calculateEquation = (equation, data, columns) => {
  try {
    // 컬럼 이름과 키 매핑 생성
    const columnMap = new Map(columns.map(col => [col.name, col.key]));

    // 수식에서 한글 이름을 영어 키로 변환
    let parsedEquation = equation;

    columnMap.forEach((key, name) => {
      // 공백을 포함한 유연한 매칭
      const regex = new RegExp(`(?<=^|\\s|[+\\-*/()])${name}(?=\\s|[+\\-*/()]|$)`, 'g');
      parsedEquation = parsedEquation.replace(regex, `data.${key}`);
    });

    // 공백 정리 (연속 공백을 단일 공백으로)
    parsedEquation = parsedEquation.replace(/\s+/g, ' ').trim();
    console.log('변환된 수식:', parsedEquation);

    // 데이터 객체를 스코프로 전달하여 mathjs로 평가
    const scope = { data };
    const result = evaluate(parsedEquation, scope);

    return result.toLocaleString('en-US');
  } catch (error) {
    console.error('수식 계산 오류:', error.message);
    return '';
  }
};