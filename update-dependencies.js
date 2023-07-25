const { exec } = require("child_process");
const fs = require("fs");
const axios = require("axios");

// Leer el archivo package.json
const packageJson = JSON.parse(fs.readFileSync("package.json"));

// Obtener las dependencias y devDependencies
const dependencies = Object.keys(packageJson.dependencies || {});
const devDependencies = Object.keys(packageJson.devDependencies || {});

// Lista de dependencias a ignorar (puedes agregar las que desees)
const ignoreDependencies = [
    "history", "node-sass", "react", "react-redux"
];

// Combinar todas las dependencias
const allDependencies = [...dependencies];

// Filtrar las dependencias ignoradas
const dependenciesToUpdate = allDependencies.filter(
    (dependency) => !ignoreDependencies.includes(dependency)
);

async function getStableDependency(dependency) {
    try {
      const response = await axios.get(`https://registry.npmjs.org/${dependency}`);
      if (response.status === 200 && response.data['dist-tags'] && response.data['dist-tags'].latest) {
        const latestStableVersion = response.data['dist-tags'].latest;
        return latestStableVersion;
      } else {
        console.log(`No se pudo obtener la última versión estable de ${dependency}.`);
      }
    } catch (error) {
      console.error('Error al obtener la dependencia:', error.message);
    }
    return "latest";
}


// Función para actualizar una dependencia y continuar con la siguiente
const updateDependency = async (index) => {
    if (index >= dependenciesToUpdate.length) {
        console.log("Todas las dependencias se han actualizado.");
        return;
    }

    const dependency = dependenciesToUpdate[index];

    // Obtener información sobre las versiones disponibles del paquete
    try {
        const response = await axios.get(`https://registry.npmjs.org/${dependency}`);
        const versions = Object.keys(response.data.versions || {});
        

        // Encontrar la versión más reciente
        const latestVersion =  await getStableDependency(dependency);

        // Ejecutar el comando para actualizar la dependencia
        exec(`npm install ${dependency}@${latestVersion}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error al actualizar ${dependency}: no se debió actualizar ${dependenciesToUpdate[index - 1]}`);
            }
            // Continuar con la siguiente dependencia
            updateDependency(index + 1);
        });
    } catch (error) {
        console.error(`Error al obtener información sobre ${dependency}: ${error.message}`);
        // Continuar con la siguiente dependencia si ocurre un error
        updateDependency(index + 1);
    }
};

// Comenzar a actualizar las dependencias desde la posición 0
updateDependency(0);
