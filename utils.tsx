function debounce(callback: Function, timeout = 300){
  let timer: NodeJS.Timeout;
  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => { callback.apply(args); }, timeout);
  };
}

export { debounce };