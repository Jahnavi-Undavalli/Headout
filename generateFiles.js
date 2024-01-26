const fs = require('fs');

const generateRandomTextFile = (fileName, fileSizeInMB) => {
    const fileContent = Buffer.alloc(fileSizeInMB * 1024 * 1024, 'a');
    fs.writeFileSync(`/tmp/data/${fileName}.txt`, fileContent);
};

for (let i = 1; i <= 30; i++) {
    generateRandomTextFile(i, 100);
}
