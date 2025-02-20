export const flattenObject = (obj) => {
  const result = {};

  for (const key in obj) {
    const value = obj[key];

    // JSON 문자열이면 파싱, 실패하면 원래 값 유지
    let parsedValue;
    try {
      parsedValue = JSON.parse(value);
    } catch {
      parsedValue = value;
    }

    // 객체라면 펼쳐서 추가, 아니라면 그대로 추가
    if (typeof parsedValue === "object" && parsedValue !== null) {
      Object.assign(result, parsedValue);
    } else {
      result[key] = parsedValue;
    }
  }

  return result;
};
