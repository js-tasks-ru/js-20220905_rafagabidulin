/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  const sortedStrings = [...arr];

  const directions = {
    asc: 1,
    desc: -1,
  };

  const direction = directions[param];

  return sortedStrings.sort((str1, str2) => {
    return direction * str1.localeCompare(str2, ['ru', 'en'], { caseFirst: 'upper' });
  });
}
