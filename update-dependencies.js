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

      // Realizar un checkout del cambio para deshacer la actualización fallida
      exec(`git checkout package.json`, (checkoutError, checkoutStdout, checkoutStderr) => {
        if (checkoutError) {
          console.error(`Error al hacer git checkout: ${checkoutError.message}`);
        } else {
          console.log(`Se ha realizado un git checkout para ${dependency}`);
        }
        // Continuar con la siguiente dependencia
        updateDependency(index + 1);
      });
    } else {
      console.log(`Se ha actualizado ${dependency}`);

      // Realizar git add y git commit para el archivo package.json
      exec(`git add package.json`, (addError, addStdout, addStderr) => {
        if (addError) {
          console.error(`Error al hacer git add: ${addError.message}`);
          // Continuar con la siguiente dependencia
          updateDependency(index + 1);
        } else {
          const commitMessage = `Actualización de ${dependency} a la última versión`;
          exec(`git commit -m "${commitMessage}"`, (commitError, commitStdout, commitStderr) => {
            if (commitError) {
              console.error(`Error al hacer git commit: ${commitError.message}`);
            } else {
              console.log(`Se ha realizado un git commit para ${dependency}`);
            }
            // Continuar con la siguiente dependencia
            updateDependency(index + 1);
          });
        }
      });
    }
  });
};

// Comenzar a actualizar las dependencias desde la posición 0
updateDependency(0);
