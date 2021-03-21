const reverseString = (str) => str.toString().split('').reverse().join('');

const writeToStdout = (str) => {
    process.stdout.write(str);
    process.stdout.write("\n");
};

process.stdin.on('data', function(data) {
    writeToStdout(
        reverseString(
            data.toString()
        )
    );
});