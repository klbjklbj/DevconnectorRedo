const isEmpty = value => 
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) || //if object has no keys
    (typeof value === "string" && value.trim().length === 0);



//Can also be written as...
// function isEmpty(value) {
//   return (
//     value === undefined ||
//     value === null ||
//     (typeof value === "object" && Object.keys(value).length === 0) || //if object has no keys
//     (typeof value === "string" && value.trim().length === 0)
//   );
// }

export default isEmpty; //module.exports is for server
