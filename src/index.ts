import { MatchingName, MatchingNameMap } from './matching-name';
import { toMap } from './utils';

export function countNames(text: string, titles: string[], firstNames: string[], lastNames: string[]): Array<{ name: string, timesFound: number }> {
  const allWordsInText = text
    // remove special characters
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`'"~()]+/g, '')
    // trim extra whitespace
    .replace(/\s{2,}/g, ' ')
    // split into separate words
    .split(/[\s\r\n]/)
    // remove empty string entries
    .filter(Boolean);

  const foundNames: MatchingNameMap = new Map();
  // We convert the arrays into maps to make it easier & quicker to access values
  const titlesMap = toMap(titles);
  const firstNamesMap = toMap(firstNames);
  const lastNamesMap = toMap(lastNames);

  // Use a native for loop so that we can modify the index directly inside the loop, enabling us to skip over entries when necessary
  for (let i = 0; i < allWordsInText.length; i++) {
    const currentWord = allWordsInText[i];
    // If a title is found, look for corresponding first/last names
    if (titlesMap[currentWord]) {
      const nameParts: string[] = [currentWord];
      let matchNotFound = false;
      let currentIndex = i;
      // Loop over the next words in the array until you find one that isn't a name, then break the loop.
      while (!matchNotFound) {
        currentIndex++;
        const nextWord = allWordsInText[currentIndex];
        if (firstNamesMap[nextWord]) {
          nameParts.push(nextWord);
        } else {
          matchNotFound = true;
        }
      }

      if (lastNamesMap[allWordsInText[currentIndex]]) {
        nameParts.push(allWordsInText[currentIndex]);
      }

      if (nameParts.length >= 2) {
        const fullName = nameParts.join(' ');
        if (foundNames.has(fullName)) {
          foundNames.get(fullName).increment();
        } else {
          foundNames.set(fullName, new MatchingName(fullName));
        }
        // We increment the `i` index to avoid double counting words we've already processed
        i += nameParts.length - 1;
      }
      // If no title, see if there are first name(s) followed by a last name
    } else if (firstNamesMap[currentWord]) {
      const nameParts: string[] = [currentWord];
      let matchNotFound = false;
      let currentIndex = i;
      while (!matchNotFound) {
        currentIndex++;
        const nextWord = allWordsInText[currentIndex];
        if (firstNamesMap[nextWord]) {
          nameParts.push(nextWord);
        } else {
          matchNotFound = true;
        }
      }

      if (lastNamesMap[allWordsInText[currentIndex]]) {
        nameParts.push(allWordsInText[currentIndex]);
      }

      if (nameParts.length >= 1) {
        const fullName = nameParts.join(' ');
        if (foundNames.has(fullName)) {
          foundNames.get(fullName).increment();
        } else {
          foundNames.set(fullName, new MatchingName(fullName));
        }
        i += nameParts.length - 1;
      }
      // This will handle a surname being used on it's own, e.g. Fagin
    } else if (lastNamesMap[currentWord]) {
      if (foundNames.has(currentWord)) {
        foundNames.get(currentWord).increment();
      } else {
        foundNames.set(currentWord, new MatchingName(currentWord));
      }
      // No need to increment i in this path, as we're only using the current name
    }
  }

  return Array.from(foundNames.values())
    // Sort by times found descending before returning the results
    .sort((a, b) => {
      return b.timesFound - a.timesFound;
    })
    .map(foundName => {
      return {
        name: foundName.toString(),
        timesFound: foundName.timesFound
      };
    });
}