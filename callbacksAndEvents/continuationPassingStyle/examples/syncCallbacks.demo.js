console.log("Program Started");

const numbers = [1, 2, 3, 4];

const doubled = numbers.map((number) => {
    console.log(`Processing ${number}`);
    return number * 2;
});

console.log("Result:", doubled);

console.log("Program Finished");
