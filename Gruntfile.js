module.exports = function(grunt) {
  // Do grunt-related things in here
  grunt.initConfig({
    'create-windows-installer': {
      ia32: {
        appDirectory: 'F:/Programowanie/JS/YourHomeBudget/release-builds/YourHomeBudget-win32-ia32',
        outputDirectory: 'F:/Programowanie/JS/YourHomeBudget/release-builds/YourHomeBudget-win32-ia32-installer',
        authors: 'Epat',
        exe: 'YourHomeBudget.exe',
        iconUrl: 'F:/Programowanie/JS/YourHomeBudget/res/ico/wallet.ico',
        setupIcon: 'F:/Programowanie/JS/YourHomeBudget/res/ico/wallet.ico',
        description: 'lol',
      }
    }
  });

  grunt.loadNpmTasks('grunt-electron-installer');

  grunt.registerTask('default', 'create-windows-installer');
};
