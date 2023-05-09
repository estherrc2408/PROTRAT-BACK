# PROTRAT-BACK
Este script de SQL crea dos tablas: "users" y "projects".

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users(

iduser int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

email varchar (60) NOT NULL UNIQUE,

password varchar(61) NOT NULL,

nickname varchar(30) NOT NULL UNIQUE,

first\_name varchar(30) NOT NULL,

last\_name varchar(30) NOT NULL ,

birth\_date date NOT NULL CHECK (Birth\_Date>'1900-01-01'),

city varchar(60),

image varchar(300) DEFAULT 'https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg',

rol varchar(10) NOT NULL CHECK (rol='admin' OR rol='standar'),

instagram\_nickname varchar(100),

twitter\_nickname varchar(100),

linkedIn\_url varchar(300),

);

DROP TABLE IF EXISTS projects CASCADE;

CREATE TABLE projects(

idProject int GENERATED ALWAYS AS IDENTITY,

idUser int,

project\_date date CHECK (project\_date>'1900-01-01' AND proyect\_date<Now()),

title varchar(60) NOT NULL,

subtitle varchar(200) NOT NULL,

description varchar(1000) NOT NULL,

location varchar(60),

principal\_img varchar(300),

publication\_project date DEFAULT Now(),

PRIMARY KEY (idProject),

CONSTRAINT fk\_user

`	`FOREIGN KEY (idUser)

`		`REFERENCES users(idUser)

ON UPDATE CASCADE ON DELETE CASCADE

);




La primera línea es una medida precautoria que elimina las tablas "users" y "projects" si ya existen (usando la declaración "DROP TABLE IF EXISTS") y cualquier objeto dependiente (usando "CASCADE").

La tabla "users" tiene las siguientes columnas:

"iduser": un valor entero generado automáticamente que sirve como clave primaria de la tabla.

"email": una cadena no nula y única de hasta 60 caracteres que representa la dirección de correo electrónico del usuario.

"password": una cadena no nula de hasta 61 caracteres que representa la contraseña del usuario.

"nickname": una cadena no nula y única de hasta 30 caracteres que representa el apodo del usuario.

"first\_name": una cadena no nula de hasta 30 caracteres que representa el nombre del usuario.

"last\_name": una cadena no nula de hasta 30 caracteres que representa el apellido del usuario.

"birth\_date": un valor de fecha no nulo que representa la fecha de nacimiento del usuario. Se verifica con una fecha mínima de '1900-01-01'.

"city": una cadena de hasta 60 caracteres que representa la ciudad del usuario.

"image": una cadena de hasta 300 caracteres que representa la URL de la imagen de perfil del usuario. Si no se proporciona, se establece en una imagen predeterminada.

"rol": una cadena no nula de hasta 10 caracteres que representa el rol del usuario. Se verifica con un conjunto de valores predefinidos ('admin' o 'standard').

"instagram\_nickname": una cadena de hasta 100 caracteres que representa el apodo de Instagram del usuario.

"twitter\_nickname": una cadena de hasta 100 caracteres que representa el apodo de Twitter del usuario.

"linkedIn\_url": una cadena de hasta 300 caracteres que representa la URL de LinkedIn del usuario.

La tabla "projects" tiene las siguientes columnas:

"idProject": un valor entero generado automáticamente que sirve como clave primaria de la tabla.

"idUser": una clave externa que hace referencia a la columna "iduser" de la tabla "users". Representa el usuario que creó el proyecto.

"project\_date": un valor de fecha que representa la fecha del proyecto. Se verifica con una fecha mínima de '1900-01-01' y máxima de la fecha actual.

"title": una cadena no nula de hasta 60 caracteres que representa el título del proyecto.

"subtitle": una cadena no nula de hasta 200 caracteres que representa el subtítulo del proyecto.

"description": una cadena no nula de hasta 1000 caracteres que representa la descripción del proyecto.

"location": una cadena de hasta 60 caracteres que representa la ubicación del proyecto.

"principal\_img": una cadena de hasta 300 caracteres que representa la URL de la imagen principal del proyecto.

"publication\_project": un valor de fecha que representa la fecha de publicación del proyecto. Se establece en la fecha actual si no se proporciona.

La restricción "fk\_user" es una clave externa que asegura que el "idUser" en la tabla "projects" hace referencia a un "iduser" válido en la tabla "users". Además, se establece que si se actualiza o elimina un usuario, se actualizarán o eliminarán también todos los proyectos asociados a ese usuario (usando "ON UPDATE CASCADE ON DELETE CASCADE").
