const difficulties = ["Baby steps", "Éasca Péasca", "Medium", "Hard", "Basically Fluent"];
const results = ["Read the question next time", "Were you confused?", "You did Pretty good!", "WOW!", "PERFECT"]

let postData = [{
    title: "The Copula",
    tag: "Vocab",
    date: "2023-01-10",
    excerpt: "A copula is a word that connects the subject and predicate ('copulates').",
    content: `<p>If there is one thing that you should learn when staring to learn Irish is the copula.  </p>
                        <h3 id="how-it-is-used">how it is used</h3>
                        <p>It is used to describe a persons characteristics in Irish. 
                        This means that the word order would be  <strong>noun</strong> + <strong>adjective</strong> + <strong>subject</strong> 
                        When you construct a copula sentence, you need to remember these three things. 
                        </p>
                        <p>The copula,  <strong>IS</strong>, the  <strong>object</strong>, and the <strong>subject</strong>, which is often a pronoun. 
                        E.g. <strong>Is</strong>(Particle) <strong>duine falsa mé</strong> (subject)<br>Which translates to  <em>I am a lazy person</em>. 
                        </p>
                        <h3 id="words-to-remember-">Words to remember:</h3>
                        <ul>
                            <li>cardiúil = friendly</li>
                            <li>sportiúil = sporty</li>
                        </ul>`,
    link: "the-copula",
    difficulty: 1
},
{
    title: "The Past Tense",
    tag: "Grammar, Verbs",
    date: "2",
    excerpt: "Past tense in Irish is probably the simplest tense in Irish.",
    content: `<h3 id="-1-syllable-verbs-"><em>1 Syllable verbs</em></h3>
                        <p>In most cases, to put a 1 syllable verb in the past tense, simply add an "<strong>H</strong>" after the first letter. (E.g. Tóg => T<strong>h</strong>óg)
                        Then we add a <a href="https://">pronoun</a> to the end of the verb.</p>
                        <h4 id="exceptions">Exceptions</h4>
                        <p>If the verb begins with a vowel, we don't add a "<strong>H</strong>", but a "<strong>D'</strong>" instead. (E.g. Ith => <strong>D'</strong> ith)
                        If the verb begins with the letter "<strong>F</strong>" we add a "<strong>H</strong>" and a "<strong>D'</strong>". (E.g. Fan => <strong>D'</strong> f<strong>h</strong>an)</p>
                        <h4 id="first-person-plural">First Person Plural</h4>
                        <p>When we add the pronouns to the verb, we must be careful when handeling the "we" form of the verb. In this case, we have to add special endings to the verb. If the verb stem is broad, the verb takes "<strong>amar</strong>" and if the verb stem is slender, the verb takes "<strong>eamar</strong>". (E.g. Bris => Bhris<strong>eamar</strong>, Tóg => Thóg<strong>amar</strong>)</p>
                        <h3 id="-2-syllable-verbs-"><em>2 Syllable verbs</em></h3>
                        <p>For 2 syllable verbs, most of the rules the 1 syllable verbs had apply, so you have all of the Hs and D's, but there are a few more things you need to think about when conjugations the First Person Plural.</p>
                        <h4 id="first-person-plural">First Person Plural</h4>
                        <p>If the verb ends with "<strong>aigh</strong> or "<strong>igh</strong>" <strong>remove the aigh/igh</strong>. (E.g. Ceannaigh => Cheannaíomar)
                        If the verb doesn't end with "<strong>aigh</strong>" or "<strong>igh</strong>", <strong>remove the last vowel/vowels</strong> before its declaration.
                        Finally add the endings "<strong>íomar</strong>" and "<strong>aíomar</strong>".</p>
                        <h3 id="-questions-and-negatives-"><em>Questions and Negatives</em></h3>
                        <p>When asking questions in the past tense, we add a "<strong>H</strong>" unless the verb begins with a <strong>vowel</strong>, or the letters <strong>L, N or R</strong>. In which case, you leave it alone. For negatives, you just add the word <strong>Níor</strong> in front of the verb, which means no in the past tense.</p>
                        <p><strong>Bris (To Break)</strong></p>
                        <ul>
                            <li>Bhris mé - I broke</li>
                            <li>Bhris tú - You broke</li>
                            <li>Bhriseamar - we broke</li>
                        </ul>
                        <p><strong>Tóg (To Take)</strong></p>
                        <ul>
                            <li>Thóg mé - I took</li>
                            <li>Thóg tú - You took</li>
                            <li>Thógamar - We Broke</li>
                        </ul>
                        <p><strong>Questions and negatives</strong></p>
                        <ul>
                            <li>Ar Shúil tú? - Did you walk?</li>
                            <li>Níor nigh mé - I did not wash.</li>
                        </ul>`,
    link: "past",
    difficulty: 2
},
{
    title: "The Colours",
    tag: "Vocab",
    date: "2",
    excerpt: "Learn about the different words for colour in Irish",
    content: `
                <p>This table provides each basic Irish colour with its English translation. Take a look below:</p>
                <ol>
                    <li>Dearg    Red🔴</li>
                    <li>Buí    Yellow🟡</li>
                    <li>Gorm    Blue🔵</li>
                    <li>Glas    Green🟢</li>
                    <li>Corcra    Purple🟣</li>
                    <li>Bándearg    Pink🌸</li>
                    <li>Liath    Grey🪨</li>
                    <li>Bán    White⚪</li>
                    <li>Donn    Brown🟤</li>
                    <li>Dubh    Black⚫</li>
                </ol>
                <p>Notes:
                Some colours have special words according to the context. Dearg is red, but to describe hair, you use the word rua. E.g. Tá gruaig rua aici: She has red hair. Green on the Irish flag also has a special name. Uaine.</p>`,
    link: "colours",
    difficulty: 1
}, {
    title: "The Copula",
    tag: "Vocab",
    date: "2023-01-10",
    excerpt: "A copula is a word that connects the subject and predicate ('copulates').",
    content: "WWW",
    link: "sas"
}, {
    title: "The Copula",
    tag: "Vocab",
    date: "2023-01-10",
    excerpt: "A copula is a word that connects the subject and predicate ('copulates').",
    content: "WWW",
    link: "sas"
}
]
let questionData = [{
    question: ["What is", "Who is", "How is", "W"],
    options: ["asdas", "asd", "sd", "as"],
    answers: ["w", "a", "s", "d"]
},
{
    // if no quiz, leave blank.
},
{
    question: ["What colour is Liath", "What colour is Glas", "What colour is Corcra", "What colour is Dearg", "What colour is Buí", "What colour is Gorm"],
    options: [],
    answers: ["gray", "green", "purple", "red", "yellow", "blue"]
},
{

},
{

}
]

