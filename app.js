const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('Welcome Home');
});

app.get('/pizza/pepperoni', (req, res) => {
    res.send('Your pizza is on its way!');
});

app.get('/pizza/pineapple', (req, res) => {
    res.send('We dont serve that here. Never call again!');
});

app.get('/echo', (req, res) => {
    const responseText = `Here are some details of your request: 
    Base URL: ${req.baseUrl}
    Host: ${req.hostname}
    Path: ${req.path}
    Body: ${req.body}
    Cookies: ${req.cookies}`;
    res.send(responseText);
});
app.get('/queryViewer', (req, res) => {
    console.log(req.query);
    res.end();
});

app.get('/greetings', (req, res) => {
    const name = req.query.name;
    const race = req.query.race;
    if(!name) {
        return res.status(400).send('Please provide a name.');
    }
    if(!race) {
        return res.status(400).send('Please provide a race');
    }
    const greeting = `Greetings ${name} the ${race}, welcome to our kingdom.`;
    res.send(greeting);
});
app.get('/sum', (req, res) => {
    const a = req.query.a;
    const b = req.query.b;
    if(!a) {
        return res.status(400).send('Please provide an initial value for a');
    }
    if(!b) {
        return res.status(400).send('Please provide an initial value for b');
    }
    const intA = parseInt(a, 10);
    const intB = parseInt(b, 10);

    res.send(`The sum of ${a} and ${b} is ${intA + intB}.`);
});
app.get('/cipher', (req, res) => {
    const text = req.query.text;
    const shift = req.query.shift;

    if(!text) {
        return res.status(400).send('Please provide a value for text.');
    }
    if(!shift) {
        return res.status(400).send('Please provide a value for shift.');
    }
    let newShift = parseInt(shift, 10);
    let crypt = [];
    for (let i = 0; i < text.length; i++) {
        let letter = text[i].charCodeAt(0);
        let codeLetter = letter + newShift;
        crypt.push(String.fromCharCode(codeLetter));
    }
    crypt = crypt.join('');
    res.send(crypt);
});
app.get('/lotto', (req, res) => {
    let arr = req.query.arr;

    if (!arr) {
        return res.status(400).send('Please enter at least 1 value.');
    }
    if(arr.length > 6) {
        return res.status(400).send('Only enter 6 numbers at a time.');
    }

    let winNum = [];
    arr = arr.map(item => parseInt(item, 10));
    while(winNum.length < 6) {
        let num = (Math.floor(Math.random() * 20) + 1);

        if (!winNum.find(item => item === num)) {
            winNum.push(num);
        }
    }
    let count = 0;
    arr.sort(function(a, b){return a - b});
    winNum.sort(function(a, b){return a - b});
    
    for (let i = 0; i < winNum.length; i++) {
        if (winNum.find(item => arr[i] === item)) {
            count++;
        }
    }
    if (count < 4) {
        res.send(`Sorry, you lose. Winning Numbers: ${winNum} Arr: ${arr} ${count}`);
    }
    else if (count === 4) {
        res.send(`Congratulations, you win a free ticket. Winning Numbers: ${winNum} ${arr} ${count}`);
    }
    else if (count === 5) {
        res.send(`Congratulations! You win $100! Winning Numbers: ${winNum} ${arr} ${count}`);
    }
    else if (count === 6) {
        res.send(`Wow! Unbelievable! You could have won the mega millions! Winning Numbers: ${winNum} ${count}`);
    }
});
app.listen(8000, () => {
    console.log('Express server is listening on port 8000!');
});

