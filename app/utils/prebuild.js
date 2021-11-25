const path = require('path');
const { existsSync } = require('fs');
const fs = require('fs/promises');
const { promisify } = require('util');
const rimraf = promisify(require('rimraf'));
const { spawn } = require('child_process');

async function execPostReactBuild(buildFolderPath, outputFolderPath) {
  if (existsSync(buildFolderPath)) {
    if (existsSync(outputFolderPath)) {
      await rimraf(outputFolderPath);
      await fs.rename(buildFolderPath, outputFolderPath);
    } else {
      await fs.rename(buildFolderPath, outputFolderPath);
    }
  } else {
    throw new Error('build folder does not exist');
  }
}

module.exports = async () => {
  return new Promise((resolve, reject) => {
    const scriptPath = path.resolve(
      process.cwd(),
      './node_modules/.bin/react-scripts'
    );
    spawn(scriptPath, ['build'], { stdio: 'inherit', shell: true }).on(
      'exit',
      (code) => {
        if (code === 0) {
          execPostReactBuild(
            path.resolve(process.cwd(), './build'),
            path.resolve(process.cwd(), './www')
          )
            .then(resolve)
            .catch(reject);
        } else {
          reject(new Error('build error'));
        }
      }
    );
  });
};
