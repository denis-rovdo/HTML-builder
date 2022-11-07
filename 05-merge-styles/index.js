const fsPromise = require('fs/promises');
const fs = require('fs');
const path = require('path');


const folderPath = path.join(__dirname, 'styles');
const folderPathCopy = path.join(__dirname, 'project-dist');

const writeStream = fs.createWriteStream(path.join(folderPathCopy, 'bundle.css'), 'utf-8');


try {

    (async () => {
        const files = await fsPromise.readdir(folderPath, {withFileTypes: true});
        
        for(let i = 0; i<files.length; i++){
            
            let item = files[i];
            const type = path.extname(item.name);
            
            if(item.isFile() & type === '.css'){
            const readStream = fs.createReadStream(path.join(folderPath, `${item.name}`));
            readStream.on('data', data => writeStream.write(`${data}\n`));
                    
            }
            
        }
        console.log('bundle.css created');
       
    })();

} catch (err) {
    console.log(err);
}