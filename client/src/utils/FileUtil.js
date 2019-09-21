export const fileChooser = (
  fileSelector,
  fileSizeLimit = 1e6,
  allowedType = ["jpg", "jpeg", "png", "gif", "tif"]
) => {
  return new Promise((resolve, reject) => {
    try {
      console.log(fileSelector);
      let evHandler;
      fileSelector.onchange = evHandler = function() {
        try {
          let selectedFile = this.files[0];
          console.log(`File Size is ${selectedFile["size"]}`);
          if (selectedFile["size"] <= fileSizeLimit) {
            let fileReader = new FileReader();
            let extension = selectedFile["name"]
              .match(/\.([^\.]+)$/)[1]
              .toLowerCase();
            let isValidFile = allowedType.indexOf(extension);

            if (isValidFile != -1) {
              fileReader.onload = function(e) {
                let file = e.target.result;
                resolve({ base64: file, fileData: selectedFile });
              };
              fileReader.readAsDataURL(selectedFile);
            } else {
              throw "Please enter a valid Image File";
            }
          } else {
            throw `File size can't be more than ${fileSizeLimit / 1e6} Mb`;
          }

          this.value = "";
        } catch (err) {
          reject(err.toString());
        }
      };
      fileSelector.removeEventListener("onchange", evHandler);
      //trigger click event
      fileSelector.click();
    } catch (err) {
      reject(err.toString());
    }
  });
};
