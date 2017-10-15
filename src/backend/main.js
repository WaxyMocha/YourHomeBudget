/*jshint esversion: 6 */

/**
 * Checks argument sended from backend (backend window)
 * @param {object} arg argument to check
 */
function checkArg(arg) {
  let task = arg.task;
  if (task == 'save') {
    write(arg.path, jsonParser(false, arg.data), arg.name);
    send({ done: 'saved', to: arg.path });
  } else if (task == 'read') {
    send({ task: 'read', data: jsonParser(true, read(arg.path, arg.name)) });
  } else {
    return 'invalid task';
  }

}

/**
 *Parse or stringify JSON
 * @param {boolean} mode If it's true, it will parse JSON to Object or Array, if it's false it will stringify Object or Array to JSON
 * @return  if mode is set to true {object}, if mode is set to false {string}
 */
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
