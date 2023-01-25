export const usePromise = function (time: any) {
  // new promise
  return new Promise<void>((resolve) => {
    return setTimeout(() => {
      resolve();
    }, time);
  });
};
