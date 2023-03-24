#!/usr/bin/env node
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const require = createRequire(import.meta.url);
const fs = require('fs');
const path = require('path');
// const { promisify } = require('util');
// const exec = promisify(require('child_process').exec);

// eslint-disable-next-line no-underscore-dangle
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-underscore-dangle
const __dirname = dirname(__filename);

// 定义模板路径和目标路径

const [, , projectName] = process.argv;
const projectPath = path.resolve(projectName);

function filter(file) {
  return !file.endsWith('bin');
}
async function main() {
  try {
    // check if project folder already exists
    if (fs.existsSync(projectPath)) {
      console.error(`Folder '${projectName}' already exists.`);
      process.exit(1);
    }
    const templatePath = path.resolve(__dirname, '../');
    // const files = fs.readdirSync(templatePath);
    // const filteredFiles = files.filter(filter);
    // fs.copyFileSync(templatePath, projectPath, { filter });
    // 复制模板到目标路径
    fs.cpSync(templatePath, projectPath, { recursive: true, filter });
    // fs.unlinkSync(`${projectPath}/bin`);
    const packageJson = JSON.parse(fs.readFileSync(`${projectPath}/package.json`));
    packageJson.name = projectName;
    packageJson.version = '1.0.0';
    delete packageJson.repository;
    delete packageJson.bin;
    delete packageJson.files;
    delete packageJson.keywords;
    delete packageJson.bugs;
    delete packageJson.license;
    delete packageJson.homepage;
    fs.writeFileSync(`${projectPath}/package.json`, JSON.stringify(packageJson, null, 2), 'utf8');
    // 安装项目依赖
    // const installCommand = `cd ${projectName} && npm install`;
    // execSync(installCommand, { stdio: 'inherit' });

    console.log(`Successfully created project ${projectName},Welcome to submit issues!`);
    // // run create-vite-app with your template
    // await exec(`npx create-vite-app ${projectName} --template file:${path.resolve(__dirname, 'template')}`, { stdio: 'inherit' });

    // console.log(`Successfully created '${projectName} - ${path.resolve(__dirname, 'template')}'!`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

main();
// const path = require('path');
// const { execSync } = require('child_process');
// const { copySync } = require('fs-extra');

// // 获取命令行参数
// const args = process.argv.slice(2);
// const projectName = args[0];

// // 定义模板路径和目标路径
// const templatePath = path.join(__dirname, 'template-vue-vite');
// const projectPath = path.join(process.cwd(), projectName);

// // 复制模板到目标路径
// copySync(templatePath, projectPath);

// // 安装项目依赖
// const installCommand = `cd ${projectName} && npm install`;
// execSync(installCommand, { stdio: 'inherit' });

// console.log(`Successfully created project ${projectName}`);
