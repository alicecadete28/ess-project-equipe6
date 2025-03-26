// cucumber.js
module.exports = {
    default: {
      require: ['tests/step-definition/*.ts'], // Caminho para os arquivos de definição de passos
      format: ['pretty'],
      paths: ['tests/features/*.feature'], // Caminho para os arquivos de feature
      publishQuiet: true,
    },
  };