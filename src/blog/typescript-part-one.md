---
title: Typescript - The Language, The Myth, The Legend Part I
description: We'll take a high level view of what we can get from using a typed language on our web applications.
date: "2021-05-24"
image: https://www.singlestoneconsulting.com/wp-content/uploads/2021/05/TypeScriptBanner1.png
tags: typescript, javascript
---

![](https://www.singlestoneconsulting.com/wp-content/uploads/2021/05/TypeScriptBanner1.png)

The Introduction you’ve been waiting for…

JavaScript developers around the world have a love/hate relationship with TypeScript. If you are coming from a typed background, it may be natural to write code on the web for you. However, if you come from a loosely typed background or started in JavaScript, then it is the essence of pure evil and should be doused in holy water. I began my journey with JavaScript and chose to ignore TypeScript for years. It didn’t feel like a requirement for me on my path to becoming a great developer (still doesn’t). Like many other things we come across, it’s just a tool meant to assist us in our daily tasks. But this article is less about personal opinions and more about what TypeScript is and what it can do for us on the web. We’ll be covering more details on implementation, configuration, and even AssemblyScript in future parts of this series. For now, we’ll explore the key business values that TypeScript gives us, and why it’s necessary in the first place.

_Note: Part I displays some TypeScript code and Part II will include my “Getting Started” approach. This series will not assume previous knowledge over TypeScript but will assume basic proficiency of JavaScript or other loosely typed languages._

What is TypeScript?
-------------------

Picture two children playing with blocks of varying shapes and sizes. They’re tasked with putting the blocks into a box by matching holes to the corresponding shaped blocks. The child on the left has a box titled JavaScript, the one on the right is titled TypeScript. The JavaScript box lets the child put any block into the circle hole regardless of its shape or size. Eventually, as more blocks go in, he’ll notice there’s a problem. Blocks are beginning to pile up in the circle hole and an error is taking place. The JavaScript box didn’t show any sign of problems until the circle hole filled up, leaving no room for the rest and causing a blockage in the process. Now the child must take them out again and try to place them properly. The child with the TypeScript box, however, figured out early that her box was a lot stricter about this approach. She was able to put her blocks away quickly by appropriately, matching the dimensions between the holes and the blocks. This is a depiction of the relationship between JavaScript and TypeScript at a high level during the development cycle.

*   TypeScript is an open-source language designed, developed, and maintained by Microsoft that builds on JavaScript. It is designed to maintain large-scale applications and is transcompiled to JavaScript with some additions commonly found in typed languages like Java and C#.
*   It presents static typing into the JavaScript ecosystem and can be used client-side for UI development as well as server-side with NodeJS.
*   TypeScript can use definition files to express its types to other environments that may not be using TypeScript. Oftentimes, we need to install a package that wasn’t written in TypeScript. This can present a problem for our statically typed environment as it will have no idea what types it should expect from these modules. Definition files allow you to pass on that information as documentation that will help your TS environment do its job to catch errors.
*   Developers who write TypeScript code can expect to use either the TypeScript compiler or babel to transform it into JavaScript code.

Why does TypeScript need to compile into JavaScript?
----------------------------------------------------

*   Browser engines such as Chromes V8 and Firefox’s SpiderMonkey only recognize JavaScript code as a native language.
*   While we have great new additions to the web stack in the form of web assembly, it’s still in infancy and requires the use of JavaScript to communicate with the document object model (DOM). (more on this in Part III)
*   Similar to how a CSS preprocessor like Sass must compile down to CSS, so must TypeScript compile into JavaScript for the sake of the standardized web.

So why do we need TypeScript? 🤷🏽‍♂️
-------------------------------------

##### _slaps hood_ – this bad boy will take you anywhere you want to go

The truth is, you don’t actually _need_ TypeScript and can be an amazing developer without it. Instead, you should _want_ TypeScript for all of the great things it can provide when used appropriately.

JavaScript by nature is both a great and horrible first choice for new programmers to start with. You basically begin painting and decorating the house without knowing how the plumbing and electrical wirings work. For example:

*   It abstracts many concepts you would normally learn in lower-level typed languages such as C++, C#, and Java and takes care of the heavy lifting for you. This can provide a much smaller learning curve to get started as you can focus on the basic concepts of programming.
*   JavaScript takes care of GC (garbage collection), automatically inferred type casting and coercion, automatically resizes arrays and many other concepts you would find in lower-level languages (like c, c++ for example).
*   The browser handles all of the compilation which means we don’t need any setup instructions and can quickly begin writing code.
*   This can lead to a lack of concern over commonly used data structures and types, such as hash tables, strings, and arrays at a lower level. This also means that you don’t need to understand how they affect memory usage and performance within the environments they’re being used in.
*   It’s easy to make simple mistakes as your environment will not always warn you when you’re using bad patterns or write breaking code until runtime. This means we end up writing tests for things that would naturally be caught at compile time in other languages. TS will not capture errors like inputting a string with numerical characters when expecting alphabetic string characters.

What value does TypeScript add that JavaScript doesn’t?
-------------------------------------------------------

TypeScript alone does not improve the performance of your application. It might have some minor negative effects in some extreme cases as it compiles more JavaScript code than you would normally write yourself. This means the browser has to process more lines of JavaScript code as well. Its primary value presents itself in other areas as it adds layers to your development that documents and checks your code. While very little code on the internet is perfect, TypeScript can provide some level of confidence that you’re not likely to hit your own thumb with a hammer while nailing your awesome project.

*   It can assist with documentation as well as provide additional features that would either be impossible or take some work on your part to be able to implement using JavaScript. (enums, decorators, interfaces, etc.)
*   It warns us about possible bugs that can happen from simple edge cases, such as forgetting null checks.
*   Because TypeScript is a superset of JavaScript, you can configure it to target different versions of JavaScript which will help you further develop apps with support for browsers you’re targeting. This means that it warns when you’re trying to use a JavaScript feature that is not supported. This helps with some very confusing errors when attempting to use features that are not yet available for the JS version you’re targeting.
*   TypeScript is often seen in npm packages as a way to assist package users through documentation and IntelliSense. Using TypeScript this way will assist users in identifying methods and properties for components that you’ve exposed for their use. This often minimizes the need for users to feel overly reliant on the web documentation and feel more comfortable picking up your package and getting started.

What doesn’t TypeScript do for you?
-----------------------------------

*   As previously mentioned, it will not always improve performance. The reason is that the browser engine will still receive the JavaScript code that it needs to process. The v8 engine, (also others like SpiderMonkey) uses a **JIT** (Just-In-Time) compiler to compile the JavaScript it receives into machine code at execution.
*   These browser engines include steps for optimizations, execution, and garbage collection through separate threads that become responsible for each action respectively. The optimization process is where it caches values and types that it has observed through repeated calls. This allows the V8 engine to make some smart assumptions about the types of parameters to expect on a function call it has previously seen to make future assumptions. If its assumption is correct based on the data it collected previously, it can bypass the process required to identify the properties of the object and instead use the previously in-memory stored information. This process is known as **Inline Caching**.

    // simplified flow for this process with pseudo-code
    key is foo
    value is bar
    
    assumption based on the previous call is that value is type string
    have we seen key of foo before? 
    	(yes)
    		is value the same type as it was in the previous call?
    			yes (copy over properties stored in memory and paste into key)
    			no (get all of its properties and store it in cache in case we see it again)
    	(no)
    		find what type it is
    		gather all of its properties and store them in memory for the next time we see it. 
    		apply these properties to the current value
    continue...

*   Doing optimizations can be taxing to the engine as it requires more memory for caching and processing. JavaScript dynamic typing means that a value can be a string at one instance, and a number at the next. Objects are increasingly difficult due to their fluid nature. During a loop, the browser engine will continually verify the types against the previous instances to decide if they will have the same properties or need to be given a list of newer ones.

```JavaScript
    function addSum(a, b) {
        return a + b;
    }
    addSum(1, 2); // 3
    addSum("1","2"); // "12"
```

*   The above function depicts how JavaScript could easily fail to provide coverage for a parameter typeset that we intend to be integers. The engine would make an assumption based on the first function call that `a` and `b` are likely meant to be `integers`. It is soon proven wrong as the next instance of these parameters will be a set of `string` values. We would have to implement our own edge case logic to capture incorrect types and return an error.
*   From the v8 [blog](https://v8.dev/blog/adaptor-frame)

```JavaScript
    function add42(x) {
    	return x + 42;
    }
    add42(3);
```

flow of execution inside V8 during a function call

![](https://www.singlestoneconsulting.com/wp-content/uploads/2021/05/flow.svg)

The above call is compiled to the following:

```Bash
0d              LdaUndefined              ;; Load undefined into the accumulator
26 f9           Star r2                   ;; Store it in register r2
13 01 00        LdaGlobal [1]             ;; Load global pointed by const 1 (add42)
26 fa           Star r1                   ;; Store it in register r1
0c 03           LdaSmi [3]                ;; Load small integer 3 into the accumulator
26 f8           Star r3                   ;; Store it in register r3
5f fa f9 02     CallNoFeedback r1, r2-r3  ;; Invoke call
```

How would TypeScript help?
--------------------------

```TypeScript
function addSum(a: number, b: number): number {
     return a + b;
}
addSum(1, 2); // 3
addSum("1", "2"); // vv compile error
// Argument of type 'string' is not assignable to parameter of type 'number'.
```

The above TypeScript code defines both parameters `a` and `b` as type `number`. So when it seems that you are attempting to pass in type `string` values, it tosses up a compiler error to let you know that something is wrong. As a member of your dev team, TS would allow me to see a clear description of the types that will be expected when calling this function as well as what the returning value should look like. Let’s see a more complex situation.

![](https://www.singlestoneconsulting.com/wp-content/uploads/2021/05/Untitled.png)

Above we can see how much information TypeScript can provide about an Object just by hovering over the newly instantiated class. We’re given an error message about missing arguments. We’re told how many arguments are expected as well as what those arguments are and which types they should be. I didn’t have to go and find this code and read through all of its intricate detail to be able to use it. Without looking at the code itself, let’s see what else TypeScript is able to provide for us.

![](https://www.singlestoneconsulting.com/wp-content/uploads/2021/05/Untitled-1.png)

Simply by adding a period, TS is able to provide us a list of possible choices to select from. This is because TypeScript is aware of the shape of this class Person and we have instructed which properties and methods we want to be private (accessible only inside of the class) or public (accessible inside and out of the class). Now let’s take a look at the class itself.

![](https://www.singlestoneconsulting.com/wp-content/uploads/2021/05/Untitled-2.png)

While the class looks very similar to a JavaScript class, we can identify some key differences:

1.  **Type** – Instead of inlining the type declaration, we’ve extracted it into an explicit type declaration. This allows us to define the shape of the Object as well as reuse it in case we have other areas that expect to take in or return a similar shape in our code.

*   Note that TypeScript has multiple other ways to declare the shape of an Object. For now, we’re just showing the `Type`, but there are others such as `Interface`, `Class` & `Enum` as well.

2.  **Private** – Per [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields), JavaScript class properties and methods are considered `public` by default. This means that even if we don’t want outside sources to gain access and potentially mutate fields, there’s nothing we can do to stop them. The current conventional method is to provide an underscore before the name of something you would like to keep private. This is a form of documenting your intent to other contributors.

```JavaScript
    // define your intent to keep this method private
    _myPrivateMethod() {
     // ..some code
```

*   But this does not actually prevent anyone from doing so if they really want to. There’s a proposal in stage 3 (as of this writing) to allow the definition of private methods and properties, but it is currently not supported by many browsers. The use of proposals should be limited to experimentation as implementation details are always liable to change dramatically before it is accepted into the language. `#privateField` `#privateMethod`

3.  **Public** – As mentioned in the above paragraph, properties and methods are public by default. This means that these `Public` declarations are not really needed to accomplish this task. This is primarily used for this example and we could remove them without any consequence (but other more strictly typed languages might not be so forgiving).
4.  **Return Type** – We’re taking the Type that we created earlier and applying it to our method to declare the return type that should be expected. Typing your returns can be helpful as it will let you know if you will get what you are expecting. You can’t say that you’re expecting a type `String` when the shape is providing a type `PersonDetails`. That would be like squeezing an orange and expecting apple juice.

![](https://www.singlestoneconsulting.com/wp-content/uploads/2021/05/Untitled-3.png)

*   Because of this, we are able to take advantage of this and reuse the `PersonDetails` type to define a property inside of an `interface`. In this case, I wouldn’t be able to get away with simply using any other type that doesn’t match our `PersonDetails` shape. Note that while there are subtle differences between an `interface` and `type`, we can use them interchangeably in most cases to define Objects in TypeScript. There are different opinions as to when to use which and some actions that you can do with one but not the other.

5.  **Private Method** – In some typed languages such as Java, we have the concept of `Getters` and `Setters` which define the methods as a gateway for interacting with the class. As previously stated, we don’t always want to expose our methods and properties outside of the class. In this instance, nobody outside of the class should need the `calculateBirthYear` as it is only affecting the private property and has a dependency on the current age. We write `Getters` and `Setters` as a way to safely expose parts of our classes that are intended to be used outside of the classes.

Conclusion
----------

We’ve covered some exciting topics like how the browser engine compiles and optimizes JavaScript at a high level. We’ve also covered some very basic features that TypeScript provides us with IntelliSense and the use of the private properties. In the next part of the series, we’ll cover implementation details and configuration for TypeScript to get you started.

* * *

Whether you’re a TypeScript user or not, I hope this sparked some curiosity for you to play around with it. If you do give it a try, send me a message or drop a comment below—I’d love to hear your thoughts!