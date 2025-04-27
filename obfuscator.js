
function obfuscateText(string, methods = ['replace', 'shuffle', 'invisible']) {
    const replacements = {
      'а': 'a', 'е': 'e', 'о': 'o', 'с': 'c', 'р': 'p', 'к': 'κ', 'и': 'і',
      'А': 'A', 'Е': 'E', 'О': 'O', 'С': 'C', 'Р': 'P', 'К': 'Κ', 'И': 'І'
    };
    
    function replaceSimilarLetters(text) {
      return text.split('').map(char => replacements[char] || char).join('');
    }
  
    function shuffleInnerLetters(text) {
      return text.split(' ').map(word => {
        if (word.length <= 3) return word;
        let first = word[0];
        let last = word[word.length - 1];
        let middle = word.slice(1, -1).split('');
        for (let i = middle.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [middle[i], middle[j]] = [middle[j], middle[i]];
        }
        return first + middle.join('') + last;
      }).join(' ');
    }
  
    function insertInvisibleChars(text) {
      const zeroWidthSpace = '\u200B';
      return text.split('').map(char => char + zeroWidthSpace).join('');
    }
  
    let result = string;
  
    if (methods.includes('replace')) {
      result = replaceSimilarLetters(result);
    }
    if (methods.includes('shuffle')) {
      //result = shuffleInnerLetters(result);
    }
    if (methods.includes('invisible')) {
      //result = insertInvisibleChars(result);
    }
  
    return result;
  }
  
  // Примеры использования:
  
  //const text = "Привет, как дела?";
  //console.log(obfuscateText(text, ['replace']));      // Только замена символов
  //console.log(obfuscateText(text, ['shuffle']));      // Только перемешивание букв
  //console.log(obfuscateText(text, ['invisible']));    // Только невидимые символы
  //console.log(obfuscateText(text, ['replace', 'shuffle', 'invisible'])); // Все три метода сразу
  