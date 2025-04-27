class App {
    constructor() {
        this.textAreaCategory1 = document.getElementById('category1')
        this.textAreaCategory2 = document.getElementById('category2')
        this.textAreaCategory3 = document.getElementById('category3')
        this.textAreaCategory4 = document.getElementById('category4')
        this.textResultSize = document.getElementById('result-size')
        this.textAreaResult = document.getElementById('result')
        this.buttonBeautify = document.getElementById('beautify');
        this.addButton = document.querySelector('.add');
        this.shuffleButton = document.querySelector('.shuffle');
        this.razmaz12Button = document.querySelector('.razmaz12');

        this.buttonSeedPlus = document.getElementById('seed-plus');
        this.buttonSeedMinus = document.getElementById('seed-minus');
        this.textSeed = document.getElementById('seed')

        this.buttonImport = document.getElementById('import');
        this.buttonExport = document.getElementById('export');
        this.textProject = document.getElementById('project');

        this.delim = ',';

        this.seed = 0;
        this.generator = this.seededRandom(this.seed);

        this.loadData();

        this.addButton.addEventListener('click', (e) => {
            this.saveData();
            this.textAreaResult.value = this.add();
        })
        this.shuffleButton.addEventListener('click', (e) => {
            this.generator = this.seededRandom(this.seed);
            this.saveData();
            this.textAreaResult.value = this.shuffle();
        })
        this.razmaz12Button.addEventListener('click', (e) => {
            this.saveData();
            this.textAreaResult.value = this.razmaz12();
        })

        this.buttonBeautify.addEventListener('click', (e) => {
            this.textAreaCategory1.value = this.beautify(this.textAreaCategory1.value);
        })

        this.buttonSeedPlus.addEventListener('click', (e) => {
            this.seed++;
            this.textSeed.value = this.seed;
            this.generator = this.seededRandom(this.seed);
            this.saveData();
            this.textAreaResult.value = this.shuffle();
        })
        this.buttonSeedMinus.addEventListener('click', (e) => {
            this.seed--;
            this.textSeed.value = this.seed;
            this.generator = this.seededRandom(this.seed);
            this.saveData();
            this.textAreaResult.value = this.shuffle();
        })
        document.addEventListener('keyup', (event) => {
            this.saveData();
        })

        this.textSeed.addEventListener('keyup', (event) => {
            this.seed = parseInt(this.textSeed.value);
            this.generator = this.seededRandom(this.seed);
            this.saveData();
            this.textAreaResult.value = this.shuffle();
        })

        this.buttonImport.addEventListener('click', (e) => {
            this.import()
        })

        this.buttonExport.addEventListener('click', (e) => {
            this.export();
        })

    }

    beautify(text) {
        let result = []
        let lines = text.split(/[.,|]/).map(part => part.trim()).filter(Boolean);
        lines.forEach((line => {
            result.push(line.trim())
        }))
        result = result.join('\n')
        for (let i = 0; i < 20; i++)
            result = result.replace('  ', ' ')
        return result;
    }


    loadData() {
        let storage = new Storage();
        this.textAreaCategory1.value = storage.get('category1')
        this.textAreaCategory2.value = storage.get('category2')
        this.textAreaCategory3.value = storage.get('category3')
        this.textAreaCategory4.value = storage.get('category4')
        this.textSeed.value = storage.get('seed')
        this.seed = storage.get('seed')
    }

    saveData() {
        let category1 = this.textAreaCategory1.value;    
        let category2 = this.textAreaCategory2.value;    
        let category3 = this.textAreaCategory3.value;    
        let category4 = this.textAreaCategory4.value;
 
        let storage = new Storage()
        storage.set('category1', category1);
        storage.set('category2', category2);
        storage.set('category3', category3);
        storage.set('category4', category4);
        storage.set('seed', this.seed);
    }

    seededRandom(seed) {
        let a = seed | 0;
        return function() {
          a |= 0;
          a = (a + 0x6D2B79F5) | 0;
          let t = Math.imul(a ^ (a >>> 15), 1 | a);
          t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
          return ((t ^ (t >>> 14)) >>> 0) / 4294967296; //
        };
      }

    shuffleArray(array) {
        let currentIndex = array.length;
        while (currentIndex != 0) {
          let randomIndex = Math.floor(this.generator() * currentIndex);
          currentIndex--;
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      }

    textToArray(text) {
        let result = []
        result = text.split('\n')
        return result
    }

    validateMinus(array) {
        //console.log(array)
        let result = [];
        array.forEach((elem) => {
            if (elem[0] != '-') {
                if (elem[0] == '+')
                    result.push(this.obfuscateString(elem))
                else
                    result.push(elem)
            }
                
        })
        return result
    }

    add() {
        let category1 = this.textToArray(this.textAreaCategory1.value);
        let category2 = this.textToArray(this.textAreaCategory2.value);
        let category3 = this.textToArray(this.textAreaCategory3.value);
        let category4 = this.textToArray(this.textAreaCategory4.value);
        let resultArray = [];
        let resultArray2 = [];

        //category2 = this.obfuscate2(category2);


        if (category1.length > 0)
            resultArray = resultArray.concat(category1)
        if (category2.length > 0)
            resultArray = resultArray.concat(category2)
        if (category3.length > 0)
            resultArray = resultArray.concat(category3)
        if (category4.length > 0)
            resultArray = resultArray.concat(category4)

        resultArray = this.validateMinus(resultArray);

        resultArray.forEach((elem) => {
            if (elem != null){
                //console.log(this.obfuscate2(elem, ['replace', 'shuffle', 'invisible']))
                resultArray2.push(this.obfuscate2(elem, ['replace', 'invisible']));
            }
                
        })


        return this.finish(resultArray2.join(this.delim))
    }
    
    shuffle() {
        let category1 = this.textToArray(this.textAreaCategory1.value);
        let category2 = this.textToArray(this.textAreaCategory2.value);
        let category3 = this.textToArray(this.textAreaCategory3.value);
        let category4 = this.textToArray(this.textAreaCategory4.value);
        let resultArray = [];
        let result = '';

        //category1 = this.obfuscate(category1);
        //category2 = this.obfuscate(category2);

        if (category1.length > 0)
            resultArray = category1
        if (category2.length > 0)
            resultArray = resultArray.concat(category2)
        if (category3.length > 0)
            resultArray = resultArray.concat(category3)
        if (category4.length > 0)
            resultArray = resultArray.concat(category4)
        
        resultArray = this.validateMinus(resultArray);

        this.shuffleArray(resultArray)

        result = this.finish(resultArray.join(this.delim))

        return result;
    }

    finish(string) {
        let result = string
        for (let i = 0; i < 20; i++)
            result = result.replace(this.delim + this.delim, this.delim)
        this.textResultSize.textContent = 'promt ' + result.length + ' chars';
        this.copyTextToClipboard(result);
        return result;
    }

    insert(str, index, value) {
        return str.substr(0, index) + value + str.substr(index);
    }

    obfuscateString(string) {
        let result = string;
        if (string.length > 4) {
            let pos = 1 + Math.trunc(Math.random() * (string.length - 2))
            result = this.insert(string, pos, '+')
        }
        return result
    }

    obfuscate(stringArray) {
        let result = []
        let current = '';
        let strings = [];
        stringArray.forEach(element => {
            current = element;
            current = current.trim();
            strings = current.split(' ');
            let resultStrings = []
            strings.forEach(element => {
                resultStrings.push(this.obfuscateString(element))

            })
            //console.log(strings)
            result.push(resultStrings.join(' '));
        });

        console.log(result)
        return result
    }

    generateRazmaz(repeats, size) {
        let result = [];

        for (let i = 1; i <= size; i++) {
            let elem = i;

            result.push(elem % 2)
            result.push(elem % 2)
        }

        return result;
    }

    razmaz12() {

        let data = []
        let result = []
        data.push(this.textToArray(this.textAreaCategory1.value))
        data.push(this.textToArray(this.textAreaCategory2.value))
        data.push(this.textToArray(this.textAreaCategory3.value))
        data.push(this.textToArray(this.textAreaCategory4.value))
        //data = this.validateMinus(data);

        let razmaz = this.generateRazmaz(2, data[0].length);
        //console.log(razmaz);
        let current = [];
        for (let i = 0; i < razmaz.length; i++){
            current = data[razmaz[i]].shift();
            if (current != null)
                result.push(current)
        }

        result = this.validateMinus(result);

        return this.finish(result.join(this.delim))

    }

    obfuscate2(text) {
        let result = ''
        result = obfuscateText(text, ['replace', 'shuffle', 'invisible'])
        return result;
    }

    copyTextToClipboard(text) {
        navigator.clipboard.writeText(text).then(function() {

        }, function(err) {
            console.error('Async: Could not copy text: ', err);
        });
    }

    encodeUnicodeToBase64(str) {
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) => 
          String.fromCharCode('0x' + p1)
        ));
      }
      
      // Декодирование Base64 обратно в Unicode строку
      decodeBase64ToUnicode(base64) {
        return decodeURIComponent(Array.prototype.map.call(
          atob(base64), 
          c => '%' + c.charCodeAt(0).toString(16).padStart(2, '0')
        ).join(''));
      }

    import() {
        let data = this.textProject.value;
        data = this.decodeBase64ToUnicode(data);
        let project = JSON.parse(data);
        this.textAreaCategory1.value = project.category1
        this.textAreaCategory2.value =  project.category2
        this.textAreaCategory3.value = project.category3
        this.textAreaCategory4.value = project.category4
        this.textSeed.value =  project.seed
        this.seed = project.seed
    }

    export() {
        let data = {};
        data.category1 = this.textAreaCategory1.value;
        data.category2 = this.textAreaCategory2.value;
        data.category3 = this.textAreaCategory3.value;
        data.category4 = this.textAreaCategory4.value;
        data.seed = this.seed;
        data = JSON.stringify(data);
        data = this.encodeUnicodeToBase64(data)
        this.textProject.value = data;
        this.copyTextToClipboard(data);
    }

}

window.onload = () => {
    let app = new App();
}