const fs = require('fs');
const path = require('path');
const {
    stdin,
    stdout
} = process;

const writeStream = fs.createWriteStream(path.join(__dirname, 'text.txt'), 'utf-8');

stdout.write('write some text\n');

const endInput = () => {
    stdout.write('good bye');
    process.exit();
};

const writeText = (data) => {
    const exitText = data.toString().trim();

    if (exitText === 'exit') {
        endInput();
    }

    writeStream.write(data);
};


stdin.on('data', writeText);
process.on("SIGINT", endInput);