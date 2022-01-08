const fs = require('fs');

const writeFile = fileContent => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/index.html', fileContent, err => {
            // if there's an error, reject the Promise and send error to catch method
            if (err) {
                reject(err);
                // return out of the function to make sure the Promise doesn't execute the resolve func too
                return;
            }

            // if theres no error, resolve the promise and pass the info to then method
            resolve({
                ok: true,
                message: 'File created!'
            });
        });
    });
};

const copyFile = () => {
    return new Promise((resolve, reject) => {
        fs.copyFile('./src/style.css', './dist/style.css', err => {
            // if theres an error, send to the catch method
            if (err) {
                reject(err);
                return;
            }

            // if success, send to then method
            resolve({
                ok: true,
                message: 'Stylesheet added!'
            });
        });
    });
};

module.exports = { writeFile, copyFile };
/* above is same as
module.exports = {
    writeFile: writeFile,
    copyFile: copyFile
} */