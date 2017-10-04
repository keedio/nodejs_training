/**
 * Created by davidsantamaria on 2/10/17.
 */
//sync
const fs = require('fs');

function readFilePromise(fileName, milliseconds){
    var promise = new Promise(function(resolve, reject) {
        fs.readFile(fileName, function(err, buffer) {
            if (err)
                reject(err);

            setTimeout(() => { resolve(buffer.toString()); }, milliseconds);
        });

    });
    return promise;

}

Promise.all([readFilePromise('file1.txt', 0), readFilePromise('file2.txt', 3000)]).then(function(values) {
    console.log(values); // [5, 7]
});