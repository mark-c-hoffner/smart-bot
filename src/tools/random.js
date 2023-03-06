/** 
 * Provides a random number between the given min and max. 
 * @param {number} min - The minimum value of the returned number
 * @param {number} max - The maximum value of the returned number
*/
export default (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}