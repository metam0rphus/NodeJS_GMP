const reverseString = (str) => str.toString().split('').reverse().join('');

const writeToStdout = (str) => {
    process.stdout.write(str + "\n");
};

process.stdin.on('data', function(data) {
    writeToStdout(
        reverseString(
            data.toString()
        )
    );
});