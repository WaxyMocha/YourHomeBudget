/*jshint esversion: 6 */

function checkArg(arg) {
  let task = arg.task;
  if (task == 'save') {
    write(arg.path, jsonParser(false, arg.data));
  }

}

function jsonParser(mode, arg) { //true parse, false stringify
  if (mode == true) {
    if ((typeof arg == 'string') && (arg.slice(0, 1) == '{' || arg.slice(0, 1) == '[')) {
      arg = JSON.parse(arg);
      console.log('mode: true');
      console.log(arg);
    }
  } else if (mode == false) {
    if (typeof arg == 'object') {
      arg = JSON.stringify(arg);
      console.log('mode: false');
    }
  } else {
    arg = null;
    console.log('invalid mode');
  }

  return arg;
}
