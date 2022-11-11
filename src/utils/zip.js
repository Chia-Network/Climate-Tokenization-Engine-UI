import Minizip from 'minizip-asm.js';

export const getContentFromEncryptedZip = (file, password, cb) => {
  var fr = new FileReader();

  fr.onload = function (event) {
    try {
      var zip = new Minizip(new Uint8Array(event.target.result));

      zip.list({ encoding: 'buffer' }).forEach(function (o) {
        const textBuffer = zip.extract(o.filepath, { password: password });
        const detokString = textBuffer.toString();
        cb(detokString);
        return;
      });
    } catch (e) {
      console.log('error: ', e);
      cb(null);
    }
  };

  fr.readAsArrayBuffer(file);
};
