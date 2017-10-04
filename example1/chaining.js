const fs = require('fs');

function readFilePromise(fileName){
    var promise = new Promise(function(resolve, reject) {
        fs.readFile(fileName, function(err, buffer) {
            if (err)
                reject(err);

            resolve(buffer.toString());
        });

    });
    return promise;

}

readFilePromise('file1.txt').then(function(buffer){
        return buffer;
    }).then(function(buffer){
        return buffer.replace('1', '***');
    }).then(function(buffer){
        console.log(buffer);
    }).catch(function(error){
        console.log(error);
    });

readFilePromise('file2.txt').then(buffer => buffer)
.then(buffer => buffer.replace('2', '++++++'))
.then(buffer => console.log(buffer))
.catch(error =>  console.log(error));

console.log([1, 2, 3,4,5,6,7,8,9].reduce((a, b) => a + b));