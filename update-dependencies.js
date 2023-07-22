const { exec } = require("child_process");
const fs = require("fs");

// Leer el archivo package.json
const packageJson = JSON.parse(fs.readFileSync("package.json"));

// Obtener las dependencias y devDependencies
const dependencies = Object.keys(packageJson.dependencies || {});
const devDependencies = Object.keys(packageJson.devDependencies || {});

// Combinar todas las dependencias
const allDependencies = [...dependencies, ...devDependencies];

// Función para actualizar una dependencia y continuar con la siguiente
const updateDependency = (index) => {
  if (index >= allDependencies.length) {
    console.log("Todas las dependencias se han actualizado.");
    return;
  }

  const dependency = allDependencies[index];

  // Ejecutar el comando para actualizar la dependencia
  exec(`npm install ${dependency}@latest`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error al actualizar ${dependency}: ${error.message}`);
    } else {
      console.log(`Se ha actualizado ${dependency}`);
    }

    // Continuar con la siguiente dependencia
    updateDependency(index + 1);
  });
};

// Comenzar a actualizar las dependencias desde la posición 0
updateDependency(0);
