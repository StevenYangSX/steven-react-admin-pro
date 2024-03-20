
function customValidateStatus(status:number) {
  // Return true if the status code is in the range 200-299
  // In this example, we also consider 404 as a success
  return (status >= 200 && status < 300) || status === 404 || status === 40000;
}

export default customValidateStatus // Define a custom validateStatus function
