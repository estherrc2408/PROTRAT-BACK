const multer = require('multer');

// Configuración de multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads'); // Carpeta donde se guardarán las imágenes
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname); // Nombre del archivo
  }
  //nombre será una combinación del nombre del campo en el formulario, la fecha actual y el nombre original del archivo
});

const upload = multer({ storage: storage });

module.exports={
    storage,
    upload
}