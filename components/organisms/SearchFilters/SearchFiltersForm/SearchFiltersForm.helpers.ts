// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const transformQueryParamToArray = (param: any): number[] => {
  if (Array.isArray(param)) {
    return param.map(Number)
  }
  return param ? [Number(param)] : []
}
