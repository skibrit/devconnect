const mkdirp = require("mkdirp");
const fs = require("fs");
const Jimp = require("jimp");
const rimraf = require("rimraf");

async function createDirectory(dirName) {
  return new Promise(function(resolve, reject) {
    if (!fs.existsSync(dirName)) {
      mkdirp(dirName, function(err) {
        if (err) reject(err);
        else {
          console.log("Created a new directory");
          resolve(true);
        }
      });
    } else {
      resolve(true);
    }
  });
}

function deleteDirectory(dirName) {
  return new Promise(function(resolve) {
    try {
      rimraf.sync(dirName);
      resolve(true);
    } catch (err) {
      resolve(false);
    }
  });
}

function isFileExist(filePath) {
  return new Promise(async function(resolve) {
    fs.stat(filePath, function(err, stat) {
      if (err) {
        resolve(false);
      }
      resolve(true);
    });
  });
}

function writeFile(fileData, filePath, encodeType = "utf8") {
  return new Promise(async function(resolve, reject) {
    fs.writeFile(filePath, fileData, encodeType, function(err) {
      if (err) {
        reject(err.toString());
      } else {
        resolve(true);
      }
    });
  });
}

function readFile(filePath, encodeType) {
  return new Promise(async function(resolve, reject) {
    if (encodeType) {
      fs.readFile(filePath, encodeType, function(err, data) {
        if (err) reject("No File Exist");
        if (data) {
          resolve(data);
        } else {
          reject("No data found");
        }
      });
    } else {
      console.log("No arg");
      fs.readFile(filePath, function(err, data) {
        if (err) reject("No File Exist");
        if (data) {
          resolve(data);
        } else {
          reject("No data found");
        }
      });
    }
  });
}

async function copyFile(sourceFile, DestinationFile) {
  return new Promise(function(resolve, reject) {
    fs.copyFile(sourceFile, DestinationFile, err => {
      if (err) {
        reject(err.toString());
      } else {
        resolve(true);
      }
    });
  });
}

function deleteFile(filePath, throwError) {
  return new Promise(function(resolve, reject) {
    fs.unlink(filePath, function(error) {
      if (error) {
        if (throwError) {
          reject(error);
        }
        resolve(false);
      }
      resolve(true);
    });
  });
}

function getFileExtension(file) {
  let extension = file["originalname"].match(/\.([^\.]+)$/)[1].toLowerCase();
  return extension;
}

function getExtension(fileName) {
  return fileName.split(".").pop();
}

function isDirectoryExist(dir) {
  return new Promise(resolve => {
    fs.stat(dir, function(err) {
      if (!err) {
        resolve(true);
      } else if (err.code === "ENOENT") {
        resolve(false);
      }
    });
  });
}

function resizeAndSave(
  srcPath,
  destPath,
  width = 250,
  height = 250,
  quality = 50
) {
  return new Promise((resolve, reject) => {
    try {
      console.log("SrcPath " + srcPath);
      console.log("DestPath " + destPath);
      try {
        if (height == -1) {
          Jimp.read(srcPath, function(err, file) {
            if (err) throw err;
            file.resize(width, Jimp.AUTO).quality(quality).write(destPath);
          });
        } else {
          Jimp.read(srcPath, function(err, file) {
            if (err) throw err;
            file.resize(width, height).quality(quality).write(destPath);
          });
        }
      } catch (err) {
        reject(err);
      }

      resolve(true);
    } catch (err) {
      reject(err.toString());
    }
  });
}

function resize(buffer, width = 250, height = 250, quality = 50) {
  return new Promise(async (resolve, reject) => {
    try {
      let file;
      if (height == -1) {
        file = await Jimp.read(buffer);
        file.resize(width, Jimp.AUTO).quality(quality);
      } else {
        file = await Jimp.read(buffer);
        file.resize(width, height).quality(quality);
      }
      let fileBuffer = await file.getBufferAsync(Jimp.MIME_JPEG);
      resolve(fileBuffer);
    } catch (err) {
      reject(err.toString());
    }
  });
}

function isValidFile(
  file,
  fileSize = 1e6,
  allowedExt = ["jpg", "jpeg", "gif", "tiff", "png"]
) {
  return new Promise((resolve, reject) => {
    try {
      if (file["size"] <= fileSize) {
        let extension = file["originalname"]
          .match(/\.([^\.]+)$/)[1]
          .toLowerCase();
        let isValidFile = allowedExt.indexOf(extension);
        if (isValidFile > -1) {
          resolve(true);
        } else {
          throw `Please upload a valid image`;
        }
      } else {
        throw `Image size can't be more than ${Globals.FileConfig.maxSize /
          1e6} MB`;
      }
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = {
  createDirectory,
  deleteDirectory,
  writeFile,
  deleteFile,
  copyFile,
  readFile,
  getFileExtension,
  isDirectoryExist,
  resizeAndSave,
  isFileExist,
  getExtension,
  isValidFile,
  resize
};
