const fs = require('fs');

function readFilePromise(fileName, milliseconds){
    var promise = new Promise(function(resolve, reject) {
        fs.readFile(fileName, function(err, buffer) {
            if (err)
                reject(err);

            setTimeout(() => { resolve(buffer); }, milliseconds);
        });

    });
    return promise;

}

readFilePromise("src/ejercicio1/file1.txt", 1000).then(handleSuccess,handleError);
readFilePromise("src/ejercicio1/file2.txt", 0).then(handleSuccess,handleError);

function handleSuccess(buffer){
    console.log("FILE CONTENTS ->", buffer.toString());
}

function handleError(err){
    console.log("FILE READ ERROR", err);
}

console.log([1, 2, 3,4,5,6,7,8,9].reduce((a, b) => a + b));
