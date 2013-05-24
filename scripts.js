  var fileName = "log2.txt";

  function onError(err) {
  var msg = 'Error: ';
  switch (err.code) {
    case FileError.NOT_FOUND_ERR:
      msg += 'File or directory not found';
      break;
    case FileError.SECURITY_ERR:
      msg += 'Insecure or disallowed operation';
      break;
    case FileError.ABORT_ERR:
      msg += 'Operation aborted';
      break;
    case FileError.NOT_READABLE_ERR:
      msg += 'File or directory not readable';
      break;
    case FileError.ENCODING_ERR:
      msg += 'Invalid encoding';
      break;
    case FileError.NO_MODIFICATION_ALLOWED_ERR:
      msg += 'Cannot modify file or directory';
      break;
    case FileError.INVALID_STATE_ERR:
      msg += 'Invalid state';
      break;
    case FileError.SYNTAX_ERR:
      msg += 'Invalid line-ending specifier';
      break;
    case FileError.INVALID_MODIFICATION_ERR:
      msg += 'Invalid modification';
      break;
    case FileError.QUOTA_EXCEEDED_ERR:
      msg += 'Storage quota exceeded';
      break;
    case FileError.TYPE_MISMATCH_ERR:
      msg += 'Invalid filetype';
      break;
    case FileError.PATH_EXISTS_ERR:
      msg += 'File or directory already exists at specified path';
      break;
    default:
      msg += 'Unknown Error';
      break;
  };

  console.log(msg);
}


function save() {



function append(fs, filePath, blob) {
  fs.root.getFile(filePath, {create: false}, function(fileEntry) {
    // Create a FileWriter object for our FileEntry.
    fileEntry.createWriter(function(fileWriter) {
      fileWriter.seek(fileWriter.length); // Start write position at EOF.
      fileWriter.write(bb.getBlob('text/plain'));
    }, onError);
  }, onError);
}


var onFs = function (fs) {

  fs.root.getFile(fileName, {create: true}, function(fileEntry) {
    
    // Create a FileWriter object for our FileEntry.

    fileEntry.createWriter(function(fileWriter) {
      
      fileWriter.onwrite = function(e) {
         console.log('Write completed.');
      };
      
      fileWriter.onerror = function(e) {
         console.log('Write failed: ' + e.toString());
      };

      window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;

      var bb = new BlobBuilder(); // Create a new Blob on-the-fly.

      bb.append("hola");
      // append(fs, 'log.txt', bb.getBlob('text/plain'));

      fileWriter.write(bb.getBlob('text/plain'));
      console.log(window.webkitStorageInfo);
      // fileWriter.write(bb.getBlob('text/plain'));

      // alert(bb.getBlob('text/plain'));
   

    }, onError);

  }, onError);

}


window.webkitRequestFileSystem(PERSISTENT, 1024*1024 /*1MB*/, onFs, onError);

}

function read() {
  function onFs(fs) {
  fs.root.getFile(fileName, {}, function(fileEntry) {
    // Obtain the File object representing the FileEntry.
    // Use FileReader to read its contents.
    fileEntry.file(function(file) {
       var reader = new FileReader();
       reader.onloadend = function(e) {
          var textarea = document.createElement('textarea');
          textarea = this.result;
          document.body.appendChild(textarea);
          console.log(this.result);
       };
       reader.readAsText(file); // Read the file as plaintext.
    }, onError);
  }, onError);
}

window.webkitRequestFileSystem(PERSISTENT, 1024*1024 /*1MB*/, onFs, onError);

}