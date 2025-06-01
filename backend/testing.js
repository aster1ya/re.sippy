const id = "hello"
const id2 = new String("hello")
const id3 = ["hello", "hi","greet"] 

const idStr = Array.isArray(id) ? id[0] : id; //handle if multiple IDs are given, take the first one
const idStr2 = Array.isArray(id2) ? id2[0] : id2; //handle if multiple IDs are given, take the first one
const idStr3 = Array.isArray(id3) ? id3[0] : id3; //handle if multiple IDs are given, take the first one

console.log(idStr)
console.log(idStr2)
console.log(idStr3)