/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {

  if (size === 0) {
    return '';
  }

  if (size === undefined) {
    return string;
  }

  const arrayOfSymbols = [...string];

  let countSymbols = 1;

  const trimmedArray = arrayOfSymbols.reduce((acc, char) => {
    if (char === acc[acc.length - 1] && countSymbols < size) {
      acc.push(char);
      countSymbols += 1;
    } else if (char !== acc[acc.length - 1]) {
      acc.push(char);
      countSymbols = 1;
    }
    return acc;
  }, []);
  
  const trimmedString = trimmedArray.join('');

  return trimmedString;
}
