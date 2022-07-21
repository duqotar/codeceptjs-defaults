const fs = require('fs');
const selenium = require('selenium-standalone');
const { exec } = require('child_process');

async function bootstrapAll() {
  console.log('bootstrapAll called for multiple-browser tests only');
}
async function teardownAll() {
  console.log('teardownAll called for multiple-browser tests only');
}
async function bootstrap() {
  console.log('bootstrap before test suite');

  prepareDirectoriesForResembleHelper();

  console.log('stopping zombie selenium processes before restarting selenium');
  // https://www.npmjs.com/package/selenium-standalone
  exec('pkill -f selenium-standalone', () => {
    console.log('starting selenium');
    selenium.start(() => {
      console.log('selenium started.');
      console.log('clearing ./output directory');
      deleteFolderRecursive('./output', false);
    });
  });
}
async function teardown() {
  console.log('teardown after test suite');
  console.log('stopping selenium');
  exec('pkill -f selenium-standalone'); // https://www.npmjs.com/package/selenium-standalone
}

(module.exports = bootstrapAll), teardownAll, bootstrap, teardown;

// module.exports = { bootstrapAll, teardown, bootstrap, bootstrapAll
// async bootstrapAll(){
//   console.log('bootstrapAll called for multiple-browser tests only');

// },
// async teardownAll(){
//   console.log('teardownAll called for multiple-browser tests only');

// },
//  async bootstrap(){
//   console.log('bootstrap before test suite');

//   prepareDirectoriesForResembleHelper();

//   console.log('stopping zombie selenium processes before restarting selenium');
//   // https://www.npmjs.com/package/selenium-standalone
//   exec('pkill -f selenium-standalone', () => {

//     console.log('starting selenium');
//     selenium.start( ()=> {
//       console.log('selenium started.');
//       console.log('clearing ./output directory');
//       deleteFolderRecursive('./output',false);

//     });

//   });
// },
// async teardown (){
//   console.log('teardown after test suite');
//   console.log('stopping selenium');
//   exec('pkill -f selenium-standalone'); // https://www.npmjs.com/package/selenium-standalone
// },
// }

var mkdirIfNotExits = function (path) {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
};

var deleteFolderRecursive = function (path, rmPath = true) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function (file, index) {
      var curPath = path + '/' + file;
      if (fs.lstatSync(curPath).isDirectory()) {
        // recurse
        deleteFolderRecursive(curPath);
      } else {
        // delete file
        if (!curPath.endsWith('.gitignore')) {
          fs.unlinkSync(curPath);
        }
      }
    });
    if (rmPath) fs.rmdirSync(path);
  }
};

var prepareDirectoriesForResembleHelper = function () {
  mkdirIfNotExits('./screenshots');
  mkdirIfNotExits('./screenshots/base');
  mkdirIfNotExits('./screenshots/diff');
};
