export const getDataFromLocalStorageByName = (key: string) => {
  let temp = localStorage.getItem(key);
  if (temp) {
    return JSON.parse(temp);
  }
  return null;
};

export const setDataToLocalStorageWithName = (key: string, payload: object) => {
  return null;
};


export const deleteLocalStorageByName = (key:string) =>{
  localStorage.removeItem(key);
}

export const deleteLocalStorageData = () =>{
  localStorage.clear();
}
