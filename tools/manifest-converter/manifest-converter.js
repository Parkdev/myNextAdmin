const { readFileSync, writeFileSync, mkdirSync } = require("fs");
const jsyaml = require("js-yaml");
const YAML = require("yaml");

function readParameterFile() {
  try {
    const parameterString = readFileSync("./variables.json", "utf8");
    return JSON.parse(parameterString);
  } catch (error) {
    throw new Error(`Error reading variables.json file : ${error.message}`);
  }
}

function yamlToJSON(yamlFilePath, parameter) {
  try {
    let yamlString = readFileSync(yamlFilePath, "utf8");
    for (const key in parameter) {
      yamlString = yamlString.replaceAll(`{{${key}}}`, parameter[key]);
    }
    return jsyaml.loadAll(yamlString);
  } catch (error) {
    throw new Error(`Error reading yaml file : ${error.message}`);
  }
}

// =================================================================
// =================================================================
// =================================================================
// =================================================================
// =================================================================
// =================================================================

function main(...filePaths) {
  try {
    const parameter = readParameterFile();
    let result = [];
    filePaths.map((filePath) => {
      if (filePath.endsWith(".yaml") || filePath.endsWith(".yml")) {
        result = [...result, ...yamlToJSON(filePath, parameter)];
      } else {
        throw new Error("Unsupported file type");
      }
    });

    const docs = [];
    for (const res of result) {
      docs.push(YAML.stringify(res));
    }

    mkdirSync("yaml_output", { recursive: true });
    writeFileSync("yaml_output/output.yaml", docs.join("\n---\n"));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

// call the main function
main(...process.argv.slice(2));
// .catch((err) => {
//   console.log("Error occurred: ", err);
//   process.exit(1);
// });
