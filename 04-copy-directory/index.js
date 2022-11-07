const fs = require('fs/promises');
const path = require('path');


const folderPath = path.join(__dirname, 'files');
const folderPathCopy = path.join(__dirname, 'files-copy');

try {

    (async () => {

        await fs.rm(folderPathCopy, {recursive: true,force: true});
        await fs.mkdir(folderPathCopy, {recursive: true});

        const files = await fs.readdir(folderPath);

        for (let i = 0; i < files.length; i++) {

            let item = files[i];
            const filePath = path.join(folderPath, `${item}`);
            const filePathCopy = path.join(folderPathCopy, `${item}`);

            await fs.copyFile(filePath, filePathCopy);
        }
        console.log('files copied');

    })();

} catch (err) {
    console.log(err);
}