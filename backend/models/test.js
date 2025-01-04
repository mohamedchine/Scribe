const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string(), // Optional by default
  age: Joi.number().required(), // Explicitly required
});

const result1 = schema.validate({ age: 3 }); 
// This will be valid because 'name' is optional and 'age' is missing but required

const result2 = schema.validate({ name: 'John', age: 25 }); 
// This will be valid because both fields are present and 'age' is required

const result3 = schema.validate({}); 
// This will be invalid because 'age' is required, but it's missing
console.log("r1  : " , result1 ," \n r2 \n  ",result2 ,"r3 \n \n ", result3) ;