export function filterDate(timeStamp) {
  const localDate = new Date(timeStamp * 1000);
  return localDate.toLocaleDateString();
}
// export function currency(params) {
  
// }
