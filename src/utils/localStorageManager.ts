export const getDataFromLocalStorageByName = (key: string) => {
  let temp = localStorage.getItem(key);
  if (temp) {
    return JSON.parse(temp);
  }
  return null;
};




export const deleteLocalStorageByName = (key:string) =>{
  console.log("found delete staorage")
  localStorage.removeItem(key);
}

export const deleteLocalStorageData = () =>{
  localStorage.clear();
}
