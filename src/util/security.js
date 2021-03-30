const strangeWords = [
    "abjection",
    "enervation",
    "effeting",
    "fatuousness",
    "credulity",
    "remonstration",
    "chad",
    "reprobating",
    "insouciance",
    "risibility",
    "mien",
    "mawkishness",
    "fulsomehood",
    "fractiousness",
    "onism",
    "abjuration",
    "fulmination",
    "importunity",
    "snood",
    "imperiousness",
    "martinet",
    "cavilling",
    "queruling",
    "tendentiousness",
    "expiate",
    "calumny",
    "aglet",
    "apotheosis",
    "impecuniosity",
    "interlocutor",
    "noisomeness",
    "orotund",
    "asperity",
    "guimpe",
    "obeisance",
    "solipsism",
    "sapience",
    "dissimulation",
    "parvenu",
    "sententiouty",
    "spile",
    "serendipity",
    "gobbledygook",
  ];
  
  const normalWords = [
    "different",
    "used",
    "important",
    "large",
    "available",
    "popular",
    "able",
    "basic",
    "known",
    "various",
    "difficult",
    "several",
    "united",
    "historical",
    "hot",
    "useful",
    "mental",
    "scared",
    "additional",
    "emotional",
    "old",
    "political",
    "similar",
    "healthy",
    "financial",
    "medical",
    "traditional",
    "federal",
    "entire",
    "strong",
    "actual",
    "significant",
    "successful",
    "electrical",
    "expensive",
    "pregnant",
    "intelligent",
    "interesting",
    "poor",
    "happy",
    "responsible",
    "cute",
    "helpful",
    "recent",
    "willing",
    "nice",
    "wonderful",
    "impossible",
    "serious",
    "huge",
    "rare",
    "technical",
    "typical",
    "competitive",
    "critical",
    "electronic",
    "immediate",
    "aware",
    "educational",
    "new",
    "environmenta",
    "global",
    "legal",
    "relevant",
    "accurate",
    "capable",
    "dangerous",
    "dramatic",
    "efficient",
    "powerful",
    "foreign",
    "hungry",
    "practical",
    "psychologica",
    "severe",
    "suitable",
    "numerous",
    "sufficient",
    "unusual",
    "consistent",
    "cultural",
    "existing",
    "famous",
    "pure",
    "afraid",
    "obvious",
    "careful",
    "latter",
    "unhappy",
    "acceptable",
    "aggressive",
    "boring",
    "distinct",
    "eastern",
    "logical",
    "reasonable",
    "strict",
    "administrati",
    "automatic",
    "civil",
    "former",
    "massive",
    "southern",
    "unfair",
    "visible",
    "alive",
    "angry",
    "desperate",
    "exciting",
    "friendly",
    "lucky",
    "realistic",
    "sorry",
    "ugly",
    "unlikely",
    "anxious",
    "comprehensiv",
    "curious",
    "impressive",
    "informal",
    "inner",
    "pleasant",
    "sexual",
    "sudden",
    "terrible",
    "unable",
    "weak",
    "wooden",
    "asleep",
    "confident",
    "conscious",
    "decent",
    "embarrassed",
    "guilty",
    "lonely",
    "mad",
    "nervous",
    "odd",
    "remarkable",
    "substantial",
    "suspicious",
    "tall",
    "tiny",
    "more",
    "some",
  ];


  export default function createIDFromEmail(email) {
    let input = shiftLetters(email.split("@")[0], (email.length % 2) + 1);
    let fragments = [];
    fragments.push(getWord(cutList(input.length%3===0 ? strangeWords : [...strangeWords].reverse(), Math.floor(strangeWords.length/input.length)), input));
    fragments.push(getWord(cutList([...normalWords].reverse(), Math.floor(strangeWords.length/input.length)%4), reverseString(input)));
    fragments.push(input.length % 2 === 0 ? "and" : "&");
    fragments.push(
      getWord(
        cutList(normalWords, Math.floor(strangeWords.length/input.length)%2),
        shiftLetters(reverseString(input), Math.floor(input.length / 2))
      )
    );
    fragments.reverse();
    return fragments.join("-");
  }
  
  function getWord(list, input) {
    let word;
    do {
      for (let i = 0; i < input.length; i++) {
        word = list.find((word) => word[0] === input[i]);
        if (word) return word;
      }
      if (!word) input = shiftLetters(input, 1);
    } while (!word);
    return word;
  }
  
  function shiftLetters(word, shift) {
    let letters = word.split("");
    for (let i = 0; i < word.length; i++) {
      letters[i] = String.fromCharCode(word.charCodeAt(i) + shift);
    }
    word = letters.join("");
    return word;
  }
  
  function reverseString(str) {
    return str.split("").reverse().join("");
  }
  
  function cutList(list, index){
    return [...list.slice(0, index+1), ...list.slice(index+1, list.length-1)]
  }