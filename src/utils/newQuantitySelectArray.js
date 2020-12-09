/**
 * @function newQuantitySelectArray - creates an array of number, up to 30
 * @param {number} qtyAvailable - the realtime inventory qty available
 * @returns {[number]}
 */

function newQuantitySelectArray(qtyAvailable) {
  const arr = []
  if (qtyAvailable < 1) {
    return arr
  } else {
    for (let i = 1; i <= qtyAvailable && i <= 30; i++) {
      arr.push(i)
    }
    return arr
  }
}
export default newQuantitySelectArray
