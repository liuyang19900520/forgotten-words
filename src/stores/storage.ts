const storage = {
  set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  get: function (key: string) {
    // @ts-ignore
    return JSON.parse(localStorage.getItem(key));
  },
  remove(key: string) {
    localStorage.removeItem(key);
  },
};

export default storage;
