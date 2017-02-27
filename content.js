var elements = document.getElementsByTagName('*');

var sourceWordsToTargetWords = [
    [["friend"], "cobber"],
    [["friends"], "cobs"],
    [["enemy", "mate", "cool guy"], "cunt"],
    [["hello"], "g'day"],
    [["yes"], "yiew"],
    [["hey"], "ay"],
    [["man"], "bloke"],
    [["woman"], "sheila"],
    [["bbq", "barbeque"], "barbie"],
    [["afternoon"], "arvo"],
    [["very"], "bloody"],
    [["exhausted"], "rooted"],
    [["angry", "frustrated"], "cranky"],
    [["dry"], "dry as a dead dingoes donger"],
    [["drunk"], "pissed"],
    [["goodbye", "bye"], "hooroo"],
    [["mcdonalds", "mc donalds"], "maccas"],
    [["it will be ok", "I'll be ok"], "she'll be right"],
    [["middle of nowhere"], "middle of bum fuck nowhere"],
    [["alcoholic"], "old mate"],
    [["candy", "sweets"], "lollies"],
    [["hoon"], "hooligan"],
    [["idiot", "stupid person", "moron"], "drongo"],
    [["beer"], "coldy"],
    [["chicken"], "chook"],
    [["campfire"], "bush telly"],
    [["a lot", "large amount"], "heaps"],
    [["money"], "dosh"],
    [["australia"], "oz"],
    [["vegetarian"], "vego"],
    [["genuine", "legitimate"], "ridgy-didge"]
];

function makeRegex(sourceWords) {
    return new RegExp('\\b' + sourceWords.join('\\b|\\b') + '\\b', 'g');
};

function identity(string) {
    return string;
};

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

function toUpperCase(string) {
    return string.toUpperCase();
};

function makeRegexToTargetWords(sourceWordsToTargetWords, modifyWords) {
    return sourceWordsToTargetWords.map(function(sourceAndTarget) {
        var [source,target] = sourceAndTarget;
        source = source.map(modifyWords);
        target = modifyWords(target);
        return [makeRegex(source), target];
    });
};

var sourceRegexToTargetWords = makeRegexToTargetWords(sourceWordsToTargetWords, identity).concat(makeRegexToTargetWords(sourceWordsToTargetWords, capitalizeFirstLetter)).concat(makeRegexToTargetWords(sourceWordsToTargetWords, toUpperCase));

function replaceTextWithRegexes(text, sourceRegexToTargetWords) {
    for (var k = 0; k < sourceRegexToTargetWords.length; k++) {
        var [regex, targetWord] = sourceRegexToTargetWords[k];
        var replacedText = text.replace(regex, targetWord);
        text = replacedText;
    }
    return text;
};

for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    for (var j = 0; j < element.childNodes.length; j++) {
        var node = element.childNodes[j];

        if (node.nodeType === 3) {
            var text = node.nodeValue;
            replacedText = replaceTextWithRegexes(text, sourceRegexToTargetWords);

            if (replacedText !== text) {
                element.replaceChild(document.createTextNode(replacedText), node);
            }
        }
    }
}
