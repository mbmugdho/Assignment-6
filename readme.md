1. What is the difference between var, let, and const?

# Answer:

Let vs Const vs Var in JavaScript: Understanding the ...var is function-scoped, meaning it's accessible throughout the entire function it's declared in, while let and const are block-scoped, limited to the {} block they're in. var allows variables to be redeclared and reassigned, whereas let allows reassignment but not redeclaration, and const does not allow either reassignment or redeclaration after initialization.

2. What is the difference between map(), forEach(), and filter()?

# Answer:

.forEach(), is used to execute the same code on every element in an array but does not change the array and it returns undefined.
.map() executes the same code on every element in an array and returns a new array with the updated elements.
.filter() checks every element in an array to see if it meets a certain criteria and returns a new array with the elements that return truthy for the criteria.

3. What are arrow functions in ES6?

# Answer:

An arrow function expression is a compact alternative to a traditional function expression, with some semantic differences and deliberate limitations in usage:
Arrow functions don't have their own bindings to this, arguments, or super, and should not be used as methods.
Arrow functions cannot be used as constructors. Calling them with new throws a TypeError. They also don't have access to the new.target keyword.
Arrow functions cannot use yield within their body and cannot be created as generator functions.

4. How does destructuring assignment work in ES6?

# Answer:

The destructuring syntax is a JavaScript syntax that makes it possible to unpack values from arrays, or properties from objects, into distinct variables. It can be used in locations that receive data (such as the left-hand side of an assignment or anywhere that creates new identifier bindings).

5.  Explain template literals in ES6. How are they different from string concatenation?

# Answer:

Template literals are literals delimited with backtick (`) characters, allowing for multi-line strings, string interpolation with embedded expressions, and special constructs called tagged templates.
Template literals are sometimes informally called template strings, because they are used most commonly for string interpolation (to create strings by doing substitution of placeholders). However, a tagged template literal may not result in a string; it can be used with a custom tag function to perform whatever operations you want on the different parts of the template literal.

They different because:
String concatenation is the process of joining one string to the end of another string, for example concatenation of “happy” and “holiday” is “happy holiday”

Template literals are literals bound with back-ticks (`) allowing embedded expressions called substitutions.Template string are sometimes informally called template strings, however they are not string literals and can not be used everywhere a string literal can be used. Template literals provide us with an alternative to string concatenation .They also allow us to insert variables in to a string.
