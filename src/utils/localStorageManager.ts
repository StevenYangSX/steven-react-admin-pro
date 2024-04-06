const getDataFromLocalStorageByName = (key: string) => {
  let temp = localStorage.getItem(key);
  if (temp) {
    return JSON.parse(temp);
  }
  return null;
};

const setDataToLocalStorageWithName = (key: string, payload: object) => {
  return null;
};

export { getDataFromLocalStorageByName, setDataToLocalStorageWithName };
