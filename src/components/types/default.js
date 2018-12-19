import diacriticless from 'diacriticless';

const escapeRegExp = str => str.replace(/[\\^$*+?.()|[\]{}]/g, '\\$&');

export default {
  format(x) {
    return x;
  },
  filterPredicate(rowval, filter, skipDiacritics = false) {
    // take care of nulls
    if (typeof rowval === 'undefined' || rowval === null) {
      return false;
    }

    // row value
    const rowValue = skipDiacritics
      ? String(rowval).toLocaleLowerCase('tr-TR')
      : diacriticless(String(rowval).toLocaleLowerCase('tr-TR'));

    // search term
    const searchTerm = skipDiacritics
      ? escapeRegExp(filter).toLocaleLowerCase('tr-TR')
      : diacriticless(escapeRegExp(filter).toLocaleLowerCase('tr-TR'));

    // comparison
    return (rowValue.indexOf(searchTerm) > -1);
  },

  compare(x, y) {
    function cook(d) {
      if (typeof d === 'undefined' || d === null) return '';
      return diacriticless(d.toLocaleLowerCase('tr-TR'));
    }
    x = cook(x);
    y = cook(y);
    if (x < y) return -1;
    if (x > y) return 1;
    return 0;
  },
};
