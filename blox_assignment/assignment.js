/* 3. Write a function to parse any valid json string into a corresponding Object, List, or Map
object. You can use C,C++, Java, Scala, Kotlin, Python, Node. Note that the integer and
floating point should be arbitrary precision. */

function parseJSON(jsonString) {
    try {
        return JSON.parse(jsonString);
    } catch (error) {
        console.log(`Invalid JSON ${error}`);
        return null;
    };
};

const jsonString = '{ "name": "amit", "age": 17, "isActive": true, "balance": 12345.6789 }';
const parse_json = parseJSON(jsonString);
console.log(parse_json);


/* 4. There is an API that one must call to get data. The trouble is it will not let you cross the
limit of call - say 15 calls per minute. If you cross the limit, the system penalizes you by one
additional minute of penalty where you can not make any call. Here is how the API looks
like: function string call_me(string input).

Propose a solution by which:
    1. You would be able to use the API within the safe limit.
    2. What happens if you are supposed to call the API 20 times per minute? Is there
    any way to accomplish this?
    3. If you were the API designer, what would you do to implement this behavior? */

const axios = require('axios');

let callCount = 0;
let penalityTimeout = false;

async function getData(){
    if(penalityTimeout){
        console.log('In penality period, can not make calls');
        return;
    };
    if(callCount >= 15){
        console.log('Rate limit reached, entering panalty period');
        penalityTimeout = true;

        setTimeout(() => {
            penalityTimeout = false;
            callCount = 0;
        }, 6000);
        return;
    };
    try {
        const response  = await axios('https://jsonplaceholder.typicode.com/posts');
        console.log(response);
    } catch (error) {
        console.error(error);  
    };
};

setInterval(() => {
    getData();
}, 6000);