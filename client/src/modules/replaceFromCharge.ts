export const replaceFromCharge = (target: string): string => {
  return target.replace(/[Ａ-Ｚａ-ｚ０-９！-～]/g, (s) => {
    return String.fromCharCode(s.charCodeAt(0)-0xFEE0)
  }).replace(',', '').replace('.0', '')
}
