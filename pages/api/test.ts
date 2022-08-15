import { SERVER_DIRECTORY } from 'next/constants';

let modelName;
let modelFabricName;

// process.argv.forEach((val, index, array) => {
//   if (val?.includes('model') || index === 2) {
//     modelName = val?.replace(/^model=(\S)|^(\S)/, ($0, $1) => ($1 ?? $0)?.toUpperCase());
//     modelFabricName = `${modelName}Fabric`;
//   }
//
//   if ((index === 2 && (!modelName || modelName.match(/model=/i))) || array.length <= 2) {
//     console.log('Укажите название модели');
//     process.exit(1);
//   }
// });

// const fs = require('fs');
import path from 'path';
import { constants, promises as fs } from 'fs';

const getPath = (name: string) => `${name}`;

/**
 * @param fileName {string}
 * @return Promise<boolean>
 */
export const checkAvailableFile = (fileName: string): Promise<boolean | string> => {
  return new Promise(async resolve => {
    const jsonDirectory = path.join(process.cwd(), 'json');
    try {
      console.log(`${jsonDirectory}/${fileName}`);
      await fs.access(`${jsonDirectory}/${fileName}`, constants.R_OK | constants.W_OK);
      resolve('can access');
    } catch {
      resolve('cannot access');
    }

    // const fileContents = await fs.readFile(jsonDirectory + '/data.json', 'utf8');
    //Read the json data file data.json
    // fs.access(getPath(fileName), function (error) {
    //   if (error) {
    //     if (error.message.includes('no such file or directory')) {
    //       resolve(getPath(fileName));
    //     } else {
    //       resolve('Что-то пошло не так');
    //     }
    //     // resolve(false);
    //   } else {
    //     resolve(`Файл ${fileName} уже существует`);
    //     // resolve(false);
    //   }
    //   resolve(true);
    // });
  });
};
//
// /**
//  * @param fileName {string}
//  * @param template {string}
//  * @return Promise<boolean>
//  */
// export const writeFile = (fileName, template) => {
//   return new Promise(resolve => {
//     fs.writeFile(getPath(fileName), template, function (error) {
//       resolve(!error);
//     });
//   });
// };
//
// export const replaceModel = modelFileString =>
//   modelFileString
//     .replace('../src/models', '.')
//     .replace(/ModelTemplate/g, modelName)
//     .replace(/src\//g, '');
//
// (async () => {
//   const isModelAvailable = await checkAvailableFile(modelName);
//   const isModelFabricAvailable = await checkAvailableFile(modelFabricName);
//
//   if (!isModelAvailable && !isModelFabricAvailable) {
//     return;
//   }
//
//   const ModelTemplate = fs.readFileSync('./dev/ModelTemplate.ts');
//   const model = replaceModel(ModelTemplate.toString());
//
//   const ModelFabricTemplate = fs.readFileSync('./dev/ModelFabricTemplate.ts');
//   const modelFabric = replaceModel(ModelFabricTemplate.toString());
//
//   let isModelCreated = await writeFile(modelName, model);
//   let isModelFabricCreated = await writeFile(modelFabricName, modelFabric);
//
//   if (isModelFabricCreated || isModelCreated) {
//     console.log('Модель успешно создана');
//   }
// })();


