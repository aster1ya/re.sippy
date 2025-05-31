console.log("start Test");
const input = undefined;

//interface asd {
//  key: String;
//}

const funct = ({ key = "default" }) => {
  console.log(key);
};

funct({ key: input });
