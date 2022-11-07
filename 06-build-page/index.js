const fsPromise = require('fs/promises');
const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'assets');
const folderPathStules = path.join(__dirname, 'styles');
const folderPathHtml = path.join(__dirname, 'template.html');
const folderPathComponents = path.join(__dirname, 'components');
const folderPathCopy = path.join(__dirname, 'project-dist');
const folderPathCopyAssets = path.join(__dirname, 'project-dist', 'assets');

//копирование файйлов и папок 

const copyFilesAndDir = async (copyFrom, copyTo) => {

    await fsPromise.rm(copyTo, {recursive: true,force: true});
    await fsPromise.mkdir(copyTo, {recursive: true});

    const files = await fsPromise.readdir(copyFrom, {withFileTypes: true});

    for (let i = 0; i < files.length; i++) {

        let item = files[i];
        const filePath = path.join(copyFrom, `${item.name}`);
        const dirPathCopy = path.join(copyTo, `${item.name}`);

        if (item.isFile()) {

            await fsPromise.copyFile(filePath, dirPathCopy);

        } else {
            await fsPromise.mkdir(dirPathCopy, {recursive: true});
            copyFilesAndDir(filePath, dirPathCopy);
        }
    }


};
//копирование  и создание файла стилей

const createStuleFile = async (pathStules) => {
    const files = await fsPromise.readdir(pathStules, {withFileTypes: true});
    const writeStream = fs.createWriteStream(path.join(folderPathCopy, 'style.css'), 'utf-8');

    for (let i = 0; i < files.length; i++) {

        let item = files[i];
        const type = path.extname(item.name);

        if (item.isFile() & type === '.css') {

            const readStream = fs.createReadStream(path.join(pathStules, `${item.name}`));
            readStream.on('data', data => writeStream.write(`${data}\n`));
        }

    }

};

//добавление разметки в файл

const creatHtmlFile = async ()=> {
   const files = await fsPromise.readdir(folderPathComponents, {withFileTypes: true});
   let htmlFile = await fsPromise.readFile(folderPathHtml, 'utf-8');
   const writeStream = fs.createWriteStream(path.join(folderPathCopy, 'index.html'), 'utf-8');

    for(let i = 0; i<files.length; i++){

        const item = files[i];
        const type = path.extname(item.name);
        const nameFile = item.name.replace(/\..*/, '');

        if (item.isFile() & type === '.html') {

            const data = await fsPromise.readFile(path.join(folderPathComponents, item.name), 'utf-8');
            htmlFile = htmlFile.replace(`{{${nameFile}}}`, data);
            
          }
             
        }
        writeStream.write(htmlFile); 

      
};





const createPage = async ()=> {
    try {
        await fs.promises.mkdir(folderPathCopy, {recursive: true});
        copyFilesAndDir(folderPath, folderPathCopyAssets);
        createStuleFile(folderPathStules);
        creatHtmlFile();
        console.log('Page is created');

    } catch (err) {
        console.log(err);
    }
};
createPage();










