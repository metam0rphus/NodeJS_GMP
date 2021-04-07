const reverseString = (str) => str.trim().split('').reverse().join('');
const writeToStdout = (str) => process.stdout.write(str + '\n');

process.stdin.on('data', (chunk) =>
    writeToStdout(
        reverseString(
            chunk.toString()
        )
    )
);