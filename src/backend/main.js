/*jshint esversion: 6 */

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
