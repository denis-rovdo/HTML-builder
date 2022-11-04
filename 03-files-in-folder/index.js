const fs = require('fs/promises');
const path = require('path');


const folderPath = path.join(__dirname, 'secret-folder');

try {

    (async () => {
        const files = await fs.readdir(folderPath, {withFileTypes: true});
    

        for(let i = 0; i<files.length; i++){
            
            let item = files[i];

            if(item.isFile()){
                const stats =  ((await fs.stat(path.resolve(folderPath, item.name))).size)/1024;
                const nameFile = item.name.replace(/\..*/, '');
                const type = path.extname(item.name).replace('.','');
                console.log(`${nameFile} - ${type} - ${stats.toFixed(2)}kb`);
            }
        }
       
    })();

} catch (err) {
    console.log(err);
}