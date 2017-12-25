
const fs = require('fs');

let input = '  (  (  (  1)  )    )';

const gruffalo = require('../gruffalo');

let grammar = new gruffalo.Grammar({ start: 'E' });
let rule = (left, right, f) => {
  return grammar.add(new gruffalo.Rule(left, right, f));
};

rule('E', ['LP', 'E', 'RP'], (LP, E, RP) => [ E ]);
rule('E', ['ONE'], (one) => one);

rule('ONE', ['_', '1', '_'], (_, a) => a.type);
rule ('LP', ['_', '(', '_'], () => '');
rule ('RP', ['_', ')'], () => '');
// Substituting the former rule by this one produces an error. Seems to be a bug?
//rule ('RP', ['_', ')', '_'], () => ''); 

// whites
rule('_', []);
rule('_', ['_', ' ']); 


let p = eval(gruffalo.compile(grammar))({});

var index = 0;
function lex() {
  return { type: input[index++] || '$' };
}

console.log(JSON.stringify(p(lex)));

