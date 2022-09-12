/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  const sortedStrings = [...arr];

  const compareStrings = (str1, str2) => {
    if (param === 'asc') {
      return str1.localeCompare(str2, ['ru', 'en'], { caseFirst: 'upper' });
    } else {
      return str2.localeCompare(str1, ['ru', 'en'], { caseFirst: 'upper' });
    }
  };

  return sortedStrings.sort(compareStrings);
}
