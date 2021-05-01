---
title: NestJS — The Hero our city needed
description: Find out how NestJS can help you build beautiful scalable and well-documented web servers with built-in validation and Swagger UI.
date: "2021-04-11"
image: "https://miro.medium.com/max/1400/0*kfqu-6XLgQdkPYaB.png"
tags: nodejs, express, nestjs, typescript
---

<img alt="" class="fd el ei hv w" src="https://miro.medium.com/max/2560/0*kfqu-6XLgQdkPYaB.png" width="853" height="473" srcSet="https://miro.medium.com/max/552/0*kfqu-6XLgQdkPYaB.png 276w, https://miro.medium.com/max/1104/0*kfqu-6XLgQdkPYaB.png 552w, https://miro.medium.com/max/1280/0*kfqu-6XLgQdkPYaB.png 640w, https://miro.medium.com/max/1400/0*kfqu-6XLgQdkPYaB.png 700w" sizes="700px" role="presentation"/>

I’ve been building and contributing to projects that use Node + express for a couple of years now. Each time we used different patterns and start from scratch with a lot of the necessities to a server. I realized that this was not just time-consuming in its own right, but also made it difficult for new team members to often contribute as it requires some time to get them up to speed with the architecture. A manager at a client Company once whispered the words “nest” in a really quiet voice during a zoom meeting which happened to makes its way into my ear and sparked a small interest. I’ve heard of it before but dismissed it after hearing it was just an express framework. My thoughts were, why do I want to toss even more stuff on top of Express than I already am 🧐. I then let it go but it kept eating away at my curiosity as most techy things tend to do, so I decided to take some time to explore it.

First, let’s get into what nest is based on the documentation description.

<blockquote class="je jf jg"><p id="f4b9" class="ig ih jh ii b ij ik il im in io ip iq ir is it iu iv iw ix iy iz ja jb jc jd db dw" data-selectable-paragraph=""><em class="fn">A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.</em></p></blockquote>

This made me think that a PR team was in their final form as they wrote this and really wanted to hit a bunch of keywords that make devs like us happy, but what does it mean? In order to further express (pun intended) what this means, let’s take a look at some of the general pros and cons of building an Express server.

</p><ol class=""><li id="5b21" class="ig ih fn ii b ij ik il im in io ip iq ir is it iu iv iw ix iy iz ja jb jc jd ji jj jk dw" data-selectable-paragraph="">Input validation and error handling</li></ol><ul class=""><li id="830a" class="ig ih fn ii b ij ik il im in io ip iq ir is it iu iv iw ix iy iz ja jb jc jd jl jj jk dw" data-selectable-paragraph="">Input validation often requires its own system and teams having to communicate the approach to this. You can create custom middleware to this or just functions but ultimately it requires us to know which errors we want to throw in detail and create a bunch of functions to validate the inputs. This can get messy if you’re not careful and require an additional package like joi in some cases.</li><li id="3f69" class="ig ih fn ii b ij jm il im in jn ip iq ir jo it iu iv jp ix iy iz jq jb jc jd jl jj jk dw" data-selectable-paragraph="">Errors can require you to follow a bunch of conditional flows to see if something exists or not, or if the validation returns a discrepancy. This isn’t too bad but then you might have to make conscious team efforts to collaborate on which layer should take ownership of the error handling.</li></ul><p id="2165" class="ig ih fn ii b ij ik il im in io ip iq ir is it iu iv iw ix iy iz ja jb jc jd db dw" data-selectable-paragraph="">2. Patterns to define an architecture or lack thereof</p><ul class=""><li id="a527" class="ig ih fn ii b ij ik il im in io ip iq ir is it iu iv iw ix iy iz ja jb jc jd jl jj jk dw" data-selectable-paragraph="">Express on it does not generate anything by default. There are some CLI tools that you can use or starters but this is often not the best choice as they’re not strictly followed or maintained. This means that you are free to build your application in whichever way you see fit, good or bad.</li><li id="9b5c" class="ig ih fn ii b ij jm il im in jn ip iq ir jo it iu iv jp ix iy iz jq jb jc jd jl jj jk dw" data-selectable-paragraph="">You could build the greatest server of all time but if the pattern is hard to follow, or they’re just really isn’t one then onboarding new team members can become difficult.</li></ul><p id="6076" class="ig ih fn ii b ij ik il im in io ip iq ir is it iu iv iw ix iy iz ja jb jc jd db dw" data-selectable-paragraph="">3. Documentation is… what documentation??</p><ul class=""><li id="8850" class="ig ih fn ii b ij ik il im in io ip iq ir is it iu iv iw ix iy iz ja jb jc jd jl jj jk dw" data-selectable-paragraph="">Documentation is often left to the dev team to handle. Let’s face it, many of us do a horrible job of documenting our applications. Often times we write about what we think is important which in most cases is just the “getting started” section and that is it. We don’t do well documenting how to add new features to follow the established pattern, or what routes are in place and their details.</li></ul><p id="78dd" class="ig ih fn ii b ij ik il im in io ip iq ir is it iu iv iw ix iy iz ja jb jc jd db dw" data-selectable-paragraph="">4. Adding a new feature is time-consuming</p><ul class=""><li id="c7a6" class="ig ih fn ii b ij ik il im in io ip iq ir is it iu iv iw ix iy iz ja jb jc jd jl jj jk dw" data-selectable-paragraph="">Given a repository pattern where you might have a great file structure, this means you have to manually build out multiple files one at a time which can be very time-consuming.</li><li id="2ecf" class="ig ih fn ii b ij jm il im in jn ip iq ir jo it iu iv jp ix iy iz jq jb jc jd jl jj jk dw" data-selectable-paragraph="">This adds a very heavy boilerplate that can take an entire day to write out and more time to define and test out.</li></ul><p id="0090" class="ig ih fn ii b ij ik il im in io ip iq ir is it iu iv iw ix iy iz ja jb jc jd db dw" data-selectable-paragraph="">Those all sound like a lot of negatives for Express, keep in mind that I’m only pointing those out to define some of the solutions that Nestjs brings to the table. If you truly ♥️ a technology for all of the great things it can do for you, then you also have to acknowledge its pitfalls as well. With that, let’s create a basic project and go through how Nest solves some of these problems.</p><h1 id="bec7" class="jr js fn au jt ju jv il jw jx jy ip jz ka kb kc kd ke kf kg kh ki kj kk kl km dw" data-selectable-paragraph="">Getting Started 🧐</h1><p id="2963" class="ig ih fn ii b ij kn il im in ko ip iq ir kp it iu iv kq ix iy iz kr jb jc jd db dw" data-selectable-paragraph="">I know you’re excited to get started, but before we create our first project.. we’ll need to install the nest CLI globally. Open up your terminal and type in the following.</p>

```Bash
$ npm i -g @nestjs/cli
```

<p id="541b" class="ig ih fn ii b ij ik il im in io ip iq ir is it iu iv iw ix iy iz ja jb jc jd db dw" data-selectable-paragraph="">You can verify that you now have nest installed globally by doing the following.</p>

```Bash
$ nest --v
```

<p id="48bc" class="ig ih fn ii b ij ik il im in io ip iq ir is it iu iv iw ix iy iz ja jb jc jd db dw" data-selectable-paragraph="">You should now see the current stable version of Nest installed. Now we can use the CLI to generate a new project for us. After typing in the following command, it might take a while to install and scaffold the project so please be patient while it does its magic 🧙🏽&zwj;♂️.</p>

```Bash
$ nest new project-name
```

<p id="ba05" class="ig ih fn ii b ij ik il im in io ip iq ir is it iu iv iw ix iy iz ja jb jc jd db dw" data-selectable-paragraph=""><em class="jh">Note: the </em><code class="ia lf lg lh lb b"><em class="jh">project-name</em></code><em class="jh"> will be the name of your project, so feel free to change this as you see fit.</em></p><p id="c6aa" class="ig ih fn ii b ij ik il im in io ip iq ir is it iu iv iw ix iy iz ja jb jc jd db dw" data-selectable-paragraph="">You should now see something similar to the following.</p>

<img alt="" class="fd el ei hv w" src="https://miro.medium.com/max/698/1*tEw2YK9vrXkpFOf1N4O2ng.png" width="349" height="568" srcSet="https://miro.medium.com/max/552/1*tEw2YK9vrXkpFOf1N4O2ng.png 276w, https://miro.medium.com/max/698/1*tEw2YK9vrXkpFOf1N4O2ng.png 349w" sizes="349px" role="presentation"/></div></div></div><figcaption class="lk ll ev et eu lm ln au b av aw ax" data-selectable-paragraph="">Nest file structure</figcaption></figure><p id="0e02" class="ig ih fn ii b ij ik il im in io ip iq ir is it iu iv iw ix iy iz ja jb jc jd db dw" data-selectable-paragraph="">Our main app files will live within the <code class="ia lf lg lh lb b">src</code> directory, where we will find our <code class="ia lf lg lh lb b">main.ts</code> file. Before moving on and exploring the directory in more detail, let's first run our application and make sure that everything works.</p>

```Bash
$ npm run start:dev
```

<p id="4880" class="ig ih fn ii b ij ik il im in io ip iq ir is it iu iv iw ix iy iz ja jb jc jd db dw" data-selectable-paragraph="">You should see some messages in your terminal defining what actions Nest is taking. As you begin to fill out your app with more “stuff”, you’ll see it taking steps to load your controllers and modules and establish dependencies. Open your browser and go to <code class="ia lf lg lh lb b">http:localhost:3000/</code>, you should see a message on the page that says "hello world". Let's explore your files now and find out where the code responsible for this lives and how it works together starting with <code class="ia lf lg lh lb b">main.ts</code>. 👀</p>

```TypeScript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
   const app = await NestFactory.create(AppModule);
    await app.listen(3000);
}
bootstrap();
```

<p id="cc7b" class="ig ih fn ii b ij ik il im in io ip iq ir is it iu iv iw ix iy iz ja jb jc jd db dw" data-selectable-paragraph="">In a nutshell 🥜, this is your `index.js` or `server.js` in a regular express app. It is where your actual server app lives. You'll be able to apply your middleware here, and define which port your server should be on. Notice that it is importing `AppModule` from `./app.module`, let's take a look at what's in there. we'll be revisiting this file again later.</p>

```TypeScript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
   imports: [],
   controllers: [AppController],
   providers: [AppService],
})
export class AppModule {}
```

If you have ever used Angular on the Front End, you’ll find a lot of similarities between the 2 as they both use decorators and have a very similar implementation. The module directories will inform the app as to what the rest of its directories will look like and what their roles should be. In express, this is often done by you manually through a cycle of imports. As you add modules later to your app such as Users, Projects, Organizations, etc.. these modules will be added here. Notice as well that the decoration is also informing us of what controllers and providers belong to this main module. Let’s take a look at the controller next.</p>

```TypeScript
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
// Controller decorator establishes the route
// adding 'app' string to it changes the route to localhost:3000/app
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
 // allows you to nest routes
// adding 'hello' string to it changes the route to localhost:3000/app/hello
    @Get()
      getHello(): string {
        return this.appService.getHello();
      }
}
```

<p id="dc64" class="ig ih fn ii b ij ik il im in io ip iq ir is it iu iv iw ix iy iz ja jb jc jd db dw" data-selectable-paragraph="">We can think of the controller as where our endpoints would normally be defined and what they should do in a sense. Remember when you opened your browser and saw that the root directory presented you with the “hello world” message? The <code class="ia lf lg lh lb b">@Controller()</code> decorator defaults the path to <code class="ia lf lg lh lb b">/</code>. So if we change it to the following:</p>

```TypeScript
@Controller('app')
```

<p id="d42a" class="ig ih fn ii b ij ik il im in io ip iq ir is it iu iv iw ix iy iz ja jb jc jd db dw" data-selectable-paragraph="">If we refresh our browser, we should now see an error on the page similar to</p>

```JSON
// 20210410222848
// http://localhost:3000/

{
"statusCode": 404,
"message": "Cannot GET /",
"error": "Not Found"
}
```

<p id="9038" class="ig ih fn ii b ij ik il im in io ip iq ir is it iu iv iw ix iy iz ja jb jc jd db dw" data-selectable-paragraph="">This is because we changed the route earlier in our decorator to be the app. So now, if you go to <code class="ia lf lg lh lb b">[&lt;http://localhost:3000/app&gt;](http://localhost:3000/app)</code> You should see our precious "hello world" message again. If we look at the rest of the code, we'll see the method which is calling the <code class="ia lf lg lh lb b">getHello()</code> service.</p>

```TypeScript
@Get()
getHello(): string {
  return this.appService.getHello();
}
```

<p id="365a" class="ig ih fn ii b ij ik il im in io ip iq ir is it iu iv iw ix iy iz ja jb jc jd db dw" data-selectable-paragraph="">If we wanted our route to be <code class="ia lf lg lh lb b">http://localhost:3000/app/hello</code>, then all we have to do is add the following to the <code class="ia lf lg lh lb b">@Get()</code> decorator:</p><pre class="ks kt ku kv kw kx ky kz"><span id="bb32" class="dw la js fn lb b dc lc ld s le" data-selectable-paragraph="">@Get('hello')</span></pre><p id="a2c0" class="ig ih fn ii b ij ik il im in io ip iq ir is it iu iv iw ix iy iz ja jb jc jd db dw" data-selectable-paragraph="">Now you should be able to check out that URL and see that our “hello world” message has relocated once again. We can come back here again once we’ve explored the <code class="ia lf lg lh lb b">app.service.ts</code> file and build out some services.</p>

```TypeScript
import { Injectable } from '@nestjs/common';
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
```

<p id="3f1a" class="ig ih fn ii b ij ik il im in io ip iq ir is it iu iv iw ix iy iz ja jb jc jd db dw" data-selectable-paragraph="">In most cases, service will be where your communication with your ORM happens. In this case, we aren’t establishing that connection yet (that will come in a later post), we’re simply returning a value once the <code class="ia lf lg lh lb b">getHello()</code> method is called from AppService. We've finally reached the point where "Hello World!" is being created 🎉🎊. We can imagine doing many other things here right now but instead, let's create a feature of our own. To walk through the steps that lead to all of this pattern.</p><h1 id="ee14" class="jr js fn au jt ju jv il jw jx jy ip jz ka kb kc kd ke kf kg kh ki kj kk kl km dw" data-selectable-paragraph="">Adding a Feature 💆🏽&zwj;♀️</h1><p id="a677" class="ig ih fn ii b ij kn il im in ko ip iq ir kp it iu iv kq ix iy iz kr jb jc jd db dw" data-selectable-paragraph="">In express, if we wanted to add a new feature.. we had to do it manually. We had to create files that fit the established pattern and add all of the logic in. Of course, this can get daunting and eat up a good chunk of time. Nest provides us a few CLI commands to do this for us.</p>

<img alt="Nest commands for CLI" class="fd el ei hv w" src="https://miro.medium.com/max/1400/1*aOzFKoLL3ZjaeRNBwmLjZQ.png" width="700" height="610" srcSet="https://miro.medium.com/max/552/1*aOzFKoLL3ZjaeRNBwmLjZQ.png 276w, https://miro.medium.com/max/1104/1*aOzFKoLL3ZjaeRNBwmLjZQ.png 552w, https://miro.medium.com/max/1280/1*aOzFKoLL3ZjaeRNBwmLjZQ.png 640w, https://miro.medium.com/max/1400/1*aOzFKoLL3ZjaeRNBwmLjZQ.png 700w" sizes="700px"/>

> NestJs CLI commands

<p id="ff0f" class="ig ih fn ii b ij ik il im in io ip iq ir is it iu iv iw ix iy iz ja jb jc jd db dw" data-selectable-paragraph="">From the list above, we’ll be using <code class="ia lf lg lh lb b">generate</code> often to create new features. We can create a <code class="ia lf lg lh lb b">User</code> feature with the following commands one file at a time.</p>

```Bash
$ nest generate module users
$ nest generate service users
$ nest generate controller users
```

<p id="20bf" class="ig ih fn ii b ij ik il im in io ip iq ir is it iu iv iw ix iy iz ja jb jc jd db dw" data-selectable-paragraph="">After generating the module, you’ll see it automatically added to the <code class="ia lf lg lh lb b">app.module.ts</code> import within the decorator.</p>

```TypeScript
import { UsersModule } from './users/users.module';

@Module({
    imports: [UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
```

Then after adding the service and controller, you see it added to your <code class="ia lf lg lh lb b">user.module.ts</code> automatically so you don't need to worry about making this connection yourself. Personally, I don't like having to add each individual file so I'd rather scaffold them all at once. That is exactly what the next command will do for us.</p>

```Bash
$ nest g resource users
```

<p id="52d3" class="ig ih fn ii b ij ik il im in io ip iq ir is it iu iv iw ix iy iz ja jb jc jd db dw" data-selectable-paragraph="">This command comes with a few extra choices as it can build into different things depending on your selection. If you choose to use this command, to follow along with this article, you can select <code class="ia lf lg lh lb b">RESTful API</code> as your first option, and then answer <code class="ia lf lg lh lb b">yes</code> to <code class="ia lf lg lh lb b">CRUD</code> if you would like. We'll be building out the additional directories that are scaffolded by this option. Your file structure should now include a folder called <code class="ia lf lg lh lb b">users</code> and include the following files.</p>
<img alt="" class="fd el ei hv w" src="https://miro.medium.com/max/534/1*FTq0EZiZHX0E0mUFqORs4w.png" width="267" height="157" role="presentation"/>

> NestJS Module for our users</figcaption>

<p id="f30d" class="ig ih fn ii b ij ik il im in io ip iq ir is it iu iv iw ix iy iz ja jb jc jd db dw" data-selectable-paragraph="">Many of the concepts we already covered in the app structure apply here. You’ll notice that it shares the exact same pattern which will be shared throughout the entirety of your app as you build it out. This makes it much easier for your team members to learn the pattern and be able to contribute. As we saw that adding a new feature is just a quick command and familiarizing yourself with the pattern is very simple. We can skip <code class="ia lf lg lh lb b">users.module.ts</code> as it will be similar to its app counterpart with no new additions and begin by looking at <code class="ia lf lg lh lb b">users.controller.ts</code>.</p><p id="d2b4" class="ig ih fn ii b ij ik il im in io ip iq ir is it iu iv iw ix iy iz ja jb jc jd db dw" data-selectable-paragraph="">Let’s begin by adding our <code class="ia lf lg lh lb b">getUsers</code> endpoint.</p>

```TypeScript
import {
    Controller,
  Get
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}
      @Get()
  getUsers(): any {
      return this.usersService.findAll();
  }
}
```

You’ll notice this pattern is also currently similar to our apps as well. Before moving on to our service file, let’s also add the <code class="ia lf lg lh lb b">getUsersById</code> controller as well since we're in the area.</p>

```TypeScript
@Get(':id')
  getUserById(@Param('id') id: string): any {
      const user = this.usersService.findById(Number(id));
    return user;
  }
```

  <p id="adc0" class="ig ih fn ii b ij ik il im in io ip iq ir is it iu iv iw ix iy iz ja jb jc jd db dw" data-selectable-paragraph="">Woahhh 👀 That looks a little different than the <code class="ia lf lg lh lb b">getUsers</code> method? You're correct!! This method presents a few key differences from the previous.</p><ol class=""><li id="0f6c" class="ig ih fn ii b ij ik il im in io ip iq ir is it iu iv iw ix iy iz ja jb jc jd ji jj jk dw" data-selectable-paragraph=""><code class="ia lf lg lh lb b">@Get</code> decorator now has a <code class="ia lf lg lh lb b">:id</code> inside of it. If we remember our earlier coverage of this decorator, adding a string inside of it appends to the route. In this case, is creating a variable for the user's id for us. This will come to us in the form of a parameter.</li><li id="a94a" class="ig ih fn ii b ij jm il im in jn ip iq ir jo it iu iv jp ix iy iz jq jb jc jd ji jj jk dw" data-selectable-paragraph=""><code class="ia lf lg lh lb b">@Param</code> was added to the parameters for the <code class="ia lf lg lh lb b">getUserById</code>. This is a built-in Nest decorator that allows us to define what our params look like for this endpoint. In the strings, we're able to give it the name of <code class="ia lf lg lh lb b">id</code> then use typescript to define what an id should be, in our case it will come in as a string. We'll need to change this later as we'll be using numbers as a string.</li><li id="dd09" class="ig ih fn ii b ij jm il im in jn ip iq ir jo it iu iv jp ix iy iz jq jb jc jd ji jj jk dw" data-selectable-paragraph="">Our service call is using <code class="ia lf lg lh lb b">(Number(id))</code>, this is because our ids will be numbers so we're having to manually typecast them from a <code class="ia lf lg lh lb b">string</code> to a <code class="ia lf lg lh lb b">number</code>. We'll explore how Nest can do this for us later with Pipes.</li></ol><p id="ae09" class="ig ih fn ii b ij ik il im in io ip iq ir is it iu iv iw ix iy iz ja jb jc jd db dw" data-selectable-paragraph="">Now that is out of the way, let’s check out our <code class="ia lf lg lh lb b">users.service.ts</code> file</p>
  
  ```TypeScript
  import { Injectable } from '@nestjs/common';
  
  @Injectable()
export class UsersService {}
```
<p id="8122" class="ig ih fn ii b ij ik il im in io ip iq ir is it iu iv iw ix iy iz ja jb jc jd db dw" data-selectable-paragraph="">Wow, so much empty!! If you used the scaffolding command then you might actually have some stuff written in here thanks to the <code class="ia lf lg lh lb b">CRUD</code> option which is pretty nice, we're going to work this out from scratch. First, because we won't be using a database for this article (later article).. we'll create an array of users to interact with. Note that normally this is where you would introduce an ORM rather than saving data in memory like we're about to do. Let's add that array in now.</p>
```TypeScript
@Injectable()
export class UsersService {
    private users: User[] = [ // these are my team members LOL
    { id: 0, name: 'Andre' },
    { id: 1, name: 'Carlos' }, // &lt;-- hey, that's me
    { id: 2, name: 'Emily' },
    { id: 3, name: 'Norbert' },
    { id: 4, name: 'Alex' },
  ];
  ```
  <p id="00ed" class="ig ih fn ii b ij ik il im in io ip iq ir is it iu iv iw ix iy iz ja jb jc jd db dw" data-selectable-paragraph="">Great!! Now we have users that we can interact with. We can now move on to creating our services.</p>
  ```TypeScript
  findAll(): any {
      return this.users;
  }
  findById(userId: number): User {
      return this.users.find((user) =&gt; user.id === userId);
  }
  ```
  <p id="4641" class="ig ih fn ii b ij ik il im in io ip iq ir is it iu iv iw ix iy iz ja jb jc jd db dw" data-selectable-paragraph="">That’s it!! We’re done, we can now put up a Pull Request for review, pack our stuff and go home. Just kidding, this is where the fun begins actually. In express, normally when we get to this point.. we would end up having to open up <code class="ia lf lg lh lb b">Postman</code> or <code class="ia lf lg lh lb b">Insomnia</code> to test our endpoint and validate responses and exceptions. To me, this is daunting and doesn't really contribute to anything but our own personal testing. Instead, what we can do is include swagger documentation. So let's take this time to talk about swagger, what it is and what it can do for us and our team.</p><h1 id="76e0" class="jr js fn au jt ju jv il jw jx jy ip jz ka kb kc kd ke kf kg kh ki kj kk kl km dw" data-selectable-paragraph="">Toss In Some Swagger 😎</h1><p id="a224" class="ig ih fn ii b ij kn il im in ko ip iq ir kp it iu iv kq ix iy iz kr jb jc jd db dw" data-selectable-paragraph="">Swagger is an interactive documentation tool that allows you to detail your endpoints. You do these multiple ways such as by visiting their <a href="https://swagger.io/" class="bp lx" rel="noopener nofollow">website</a> and utilizing their API tools to generate documentation. We’ll be taking a different approach which will allow us to implement the documentation as we work and generate the swagger docs whenever someone hits a <code class="ia lf lg lh lb b">/docs</code> route. First, we'll need to install swagger UI into our application.</p>
  
  ```Bash
  $ npm install --save @nestjs/swagger swagger-ui-express
  ```
  <p id="3493" class="ig ih fn ii b ij ik il im in io ip iq ir is it iu iv iw ix iy iz ja jb jc jd db dw" data-selectable-paragraph="">Because Nest uses ExpressJS, we’re allowed to use modules that are meant for Express as part of Nest. This means that we can get the best of both worlds. Now that we have the swagger UI installed, we can go into our <code class="ia lf lg lh lb b">main.ts</code> file to add in the middleware and pass some configuration options.</p>

```TypeScript

import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // configuration for swagger, we can set different values
  const config = new DocumentBuilder()
    .setTitle('Our Nest API')
    .setDescription('Super cool API that uses Nest to return Users')
    .setVersion('1.0')
    .build();
    // tells the swagger module to create the document
// with the config options we just built up
  const document = SwaggerModule.createDocument(app, config);
  // sets the route for the docs, adds it to the our app
// and passes in the documentation
  SwaggerModule.setup('/docs', app, document);
    await app.listen(3000);
}
bootstrap();
```

<p id="07eb" class="ig ih fn ii b ij ik il im in io ip iq ir is it iu iv iw ix iy iz ja jb jc jd db dw" data-selectable-paragraph="">And that’s it!! Now we should be able to open our browser to the docs endpoint <code class="ia lf lg lh lb b">[&lt;http://localhost:3000/docs&gt;](&lt;http://localhost:3000/docs&gt;)</code> and see our swagger docs begin to form. Now we can test out our two endpoints.</p>

<img alt="our swagger docs" class="fd el ei hv w" src="https://miro.medium.com/max/1286/1*d34q2Wq8xaIOdUqhjm2Hvw.png" width="643" height="383" srcSet="https://miro.medium.com/max/552/1*d34q2Wq8xaIOdUqhjm2Hvw.png 276w, https://miro.medium.com/max/1104/1*d34q2Wq8xaIOdUqhjm2Hvw.png 552w, https://miro.medium.com/max/1280/1*d34q2Wq8xaIOdUqhjm2Hvw.png 640w, https://miro.medium.com/max/1286/1*d34q2Wq8xaIOdUqhjm2Hvw.png 643w" sizes="643px"/>

> our swagger docs

<p id="6ff9" class="ig ih fn ii b ij ik il im in io ip iq ir is it iu iv iw ix iy iz ja jb jc jd db dw" data-selectable-paragraph="">Notice that the details we added to our configurations are used to populate the header data of the page. We should also see our two super awesome endpoints on full display. We can use these to test our work and document our endpoints for others to see and use. Just from a few lines of code, we’re already getting a lot of value but as we explore our endpoints in more detail, we’ll see that many things are missing. Swagger can’t really tell us ahead of time what our objects should look like or what we should expect to get back. This is a problem as it doesn’t define our intent or help us or teammates very much, we’ll fix that now.</p><h1 id="45b1" class="jr js fn au jt ju jv il jw jx jy ip jz ka kb kc kd ke kf kg kh ki kj kk kl km dw" data-selectable-paragraph="">Even More Swagger!! 😎 x2</h1><p id="1459" class="ig ih fn ii b ij kn il im in ko ip iq ir kp it iu iv kq ix iy iz kr jb jc jd db dw" data-selectable-paragraph="">First, we’ll realize that we’re not using much of the great advantages that typescript is providing us. We’re dropping <code class="ia lf lg lh lb b">any</code> everywhere and so we don't know what to expect from our function calls. Let's take this time to fill out create the entity that will define our user. In your <code class="ia lf lg lh lb b">/src/users</code> directory, add a new folder called <code class="ia lf lg lh lb b">entities</code>. Then create the file <code class="ia lf lg lh lb b">users.entity.ts</code>.</p>

```TypeScript
import { ApiProperty } from '@nestjs/swagger';
export class User {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
}
```

<p id="5ddc" class="ig ih fn ii b ij ik il im in io ip iq ir is it iu iv iw ix iy iz ja jb jc jd db dw" data-selectable-paragraph="">Here we’re defining a <code class="ia lf lg lh lb b">User</code> entity with an <code class="ia lf lg lh lb b">id</code> and <code class="ia lf lg lh lb b">name</code> (the two fields we provided our users array in our service file). We're also including a super fancy swagger decorator <code class="ia lf lg lh lb b">@ApiProperty()</code>. You can check out the <a href="https://docs.nestjs.com/openapi/types-and-parameters" class="bp lx" rel="noopener nofollow">documentation</a> for more details but essentially this lets swagger know that these are properties for the <code class="ia lf lg lh lb b">User</code> type. We can also pass an object to define a field as not required.</p><pre class="ks kt ku kv kw kx ky kz"><span id="ea07" class="dw la js fn lb b dc lc ld s le" data-selectable-paragraph="">@ApiProperty({ required: false })</span></pre><p id="70c8" class="ig ih fn ii b ij ik il im in io ip iq ir is it iu iv iw ix iy iz ja jb jc jd db dw" data-selectable-paragraph="">There is also a <a href="https://docs.nestjs.com/openapi/cli-plugin" class="bp lx" rel="noopener nofollow">plugin</a> that you can opt into if you would like to have swagger do this automatically for you. In a smaller project, this won’t be such a big deal, but in a bigger project this would get very verbose so let’s add that plugin and remove the above <code class="ia lf lg lh lb b">@ApiProperty()</code> decorators. Note that you will make ALL of your fields required by default, so if you have any that should be optional, please add the above-required option. Let's open our <code class="ia lf lg lh lb b">nest-cli.json</code> in the root directory and in our plugin.</p>

```JSON
{
    "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
      "plugins": ["@nestjs/swagger"]
  }
}
```

<p id="b302" class="ig ih fn ii b ij ik il im in io ip iq ir is it iu iv iw ix iy iz ja jb jc jd db dw" data-selectable-paragraph="">That’s it!! Now we should be able to remove our <code class="ia lf lg lh lb b">@ApiProperty()</code> from our user entity. Now we can finally go back to our <code class="ia lf lg lh lb b">users.service.ts</code> file and adding in our newly created user type.</p>

```TypeScript
import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    private users: User[] = [
      { id: 0, name: 'Andre' },
    { id: 1, name: 'Carlos' },
    { id: 2, name: 'Emily' },
    { id: 3, name: 'Norbert' },
    { id: 4, name: 'Alex' },
  ];

findAll(): User[] {
      return this.users;
  }
  findById(userId: number): User {
      return this.users.find((user) =&gt; user.id === userId);
  }
}
```

<p id="9160" class="ig ih fn ii b ij ik il im in io ip iq ir is it iu iv iw ix iy iz ja jb jc jd db dw" data-selectable-paragraph="">Great!! Now when we take a look at our swagger docs, we should see the following Schema included. This will allow everyone to see what is expected from your endpoints, as your server scales and includes more endpoints, this will become extremely valuable for us.</p><figure class="ks kt ku kv kw hp et eu paragraph-image"><div role="button" tabindex="0" class="hq hr ah hs w ht"><div class="et eu ma"><div class="hz s ah ia"><div class="mb ic s"><div class="nj sj fd el ei hv w hw hx hy"><img alt="" class="fd el ei hv w" src="https://miro.medium.com/max/1238/1*q-AdiRMHGnB5HFlWyTQtsg.png" width="619" height="345" srcSet="https://miro.medium.com/max/552/1*q-AdiRMHGnB5HFlWyTQtsg.png 276w, https://miro.medium.com/max/1104/1*q-AdiRMHGnB5HFlWyTQtsg.png 552w, https://miro.medium.com/max/1238/1*q-AdiRMHGnB5HFlWyTQtsg.png 619w" sizes="619px" role="presentation"/>

> Swagger UI example object

<h1 id="23a9" class="jr js fn au jt ju jv il jw jx jy ip jz ka kb kc kd ke kf kg kh ki kj kk kl km dw" data-selectable-paragraph="">Adding a POST method</h1><p id="a0a4" class="ig ih fn ii b ij kn il im in ko ip iq ir kp it iu iv kq ix iy iz kr jb jc jd db dw" data-selectable-paragraph="">So I noticed that some of my teammates are missing from our list of users. Let’s fix that by adding a POST method. Let’s begin by moving onto our <code class="ia lf lg lh lb b">users.controller.ts</code> and adding in the code for creating a user.</p>

```TypeScript
@Post()
  createUser(CreateUserDto): User {
      return this.usersService.createUser(body);
  }
```

<p id="c9fa" class="ig ih fn ii b ij ik il im in io ip iq ir is it iu iv iw ix iy iz ja jb jc jd db dw" data-selectable-paragraph="">Again with the new stuff!! Let’s go over some of the additions that this method has brought in.</p><ol class=""><li id="b85c" class="ig ih fn ii b ij ik il im in io ip iq ir is it iu iv iw ix iy iz ja jb jc jd ji jj jk dw" data-selectable-paragraph=""><code class="ia lf lg lh lb b">@Post()</code> decorator - similar to its <code class="ia lf lg lh lb b">@Get()</code> counterparts, it allows us to define a nested endpoint for this request (optional).</li><li id="0c6d" class="ig ih fn ii b ij jm il im in jn ip iq ir jo it iu iv jp ix iy iz jq jb jc jd ji jj jk dw" data-selectable-paragraph=""><code class="ia lf lg lh lb b">CreateUserDto</code> type - DTO stands for Data Transfer Object, this is not a built-in element. Data Transfer Object is a term that defines the object that will be transferred into a database. I Like to think of this as being the opposite of an <code class="ia lf lg lh lb b">entity</code>. While an <code class="ia lf lg lh lb b">entity</code> can define an object coming out of the database, the <code class="ia lf lg lh lb b">DTO</code> would define the data that is being transferred in. These two are not always exclusive and can be of different shapes or types.</li></ol><p id="e765" class="ig ih fn ii b ij ik il im in io ip iq ir is it iu iv iw ix iy iz ja jb jc jd db dw" data-selectable-paragraph="">With that out of the way, let’s create our DTO now. Within your user’s directory, create a new folder and name it <code class="ia lf lg lh lb b">dto</code>, then add a file called <code class="ia lf lg lh lb b">create-user.dto.ts</code>. The naming isn't anything special, we're just following a pattern similar to what we'll find in the rest of the project. Inside the newly created DTO file, we can add in what we expect to be returned as the response object.</p>

```TypeScript
export class CreateUserDto {
    name: string;
}
```

<p id="0e69" class="ig ih fn ii b ij ik il im in io ip iq ir is it iu iv iw ix iy iz ja jb jc jd db dw" data-selectable-paragraph="">Now we can import it and use it in the POST request for our user in our <code class="ia lf lg lh lb b">users.controller.ts</code> file. Now we can get into our <code class="ia lf lg lh lb b">users.service.ts</code> file and add the logic to push the user into our in-memory array.</p>

```TypeScript
createUser(createUserDto: CreateUserDto): User {
      const newUser = {
        id: this.users[this.users.length - 1].id + 1,
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }
```

  <p id="061c" class="ig ih fn ii b ij ik il im in io ip iq ir is it iu iv iw ix iy iz ja jb jc jd db dw" data-selectable-paragraph="">This is great as we now know the shape of our response and body objects. Earlier, however, we talked about validation being a built-in part of NestJS. Normally at this point, we would either handwrite a bunch of validation for our params or bring in a library to attempt to do it for us. Both of these solutions require some boilerplate and intrusive logic management. Nest, this is a lot simpler. We can start by using the <code class="ia lf lg lh lb b">ValidationPipe</code>, you can read more about this <a href="https://docs.nestjs.com/techniques/validation#using-the-built-in-validationpipe" class="bp lx" rel="noopener nofollow">here</a> in the docs but essentially, this provides us with access to the following already included libraries.</p><ol class=""><li id="b52d" class="ig ih fn ii b ij ik il im in io ip iq ir is it iu iv iw ix iy iz ja jb jc jd ji jj jk dw" data-selectable-paragraph=""><a href="https://www.npmjs.com/package/class-validator" class="bp lx" rel="noopener nofollow">Class validator</a> — A decorator validator that uses <code class="ia lf lg lh lb b">validator.js</code> under the hood.</li><li id="6402" class="ig ih fn ii b ij jm il im in jn ip iq ir jo it iu iv jp ix iy iz jq jb jc jd ji jj jk dw" data-selectable-paragraph=""><a href="https://www.npmjs.com/package/class-transformer" class="bp lx" rel="noopener nofollow">Class Transformer</a> — This allows you to transform a plain object to some instance of class and versa.</li></ol><p id="c138" class="ig ih fn ii b ij ik il im in io ip iq ir is it iu iv iw ix iy iz ja jb jc jd db dw" data-selectable-paragraph="">To add this to our Nest project, we can do so in our <code class="ia lf lg lh lb b">main.ts</code>.</p>
  
```TypeScript
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
const app = await NestFactory.create(AppModule);
app.useGlobalPipes(new ValidationPipe());
const config = new DocumentBuilder()
.setTitle('Nest API')
.setDescription('the description of the API')
.setVersion('1.0')
.build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('/docs', app, document);
await app.listen(3000);
}

bootstrap();

````

<p id="da20" class="ig ih fn ii b ij ik il im in io ip iq ir is it iu iv iw ix iy iz ja jb jc jd db dw" data-selectable-paragraph="">Now we can begin taking advantage of this by going into our <code class="ia lf lg lh lb b">users.controller.ts</code> and some decorators and pipes.</p>

```TypeScript
// the import
import { ParseIntPipe, Param, Body } from '@nestjs/common';
// in our controller class
...
getUserById(@Param('id', ParseIntPipe) id: number): User {
      return user;
  }
  createUser(@Body() body: CreateUserDto): User {
      return this.usersService.createUser(body);
  }
````

  <ol class=""><li id="33dd" class="ig ih fn ii b ij ik il im in io ip iq ir is it iu iv iw ix iy iz ja jb jc jd ji jj jk dw" data-selectable-paragraph=""><code class="ia lf lg lh lb b">@param()</code> - This decorator is used to validate request parameters. In this case, we're using it to validate that our id is a number now instead of a string.</li><li id="71f9" class="ig ih fn ii b ij jm il im in jn ip iq ir jo it iu iv jp ix iy iz jq jb jc jd ji jj jk dw" data-selectable-paragraph=""><code class="ia lf lg lh lb b">ParseIntPipe</code> - Because of the nature of JSON parsing, the id comes in as a <code class="ia lf lg lh lb b">string</code> but our database ids are all <code class="ia lf lg lh lb b">numbers</code>. This pipe will type-cast the id for us from a string to a number so that we can remove the old logic forcing us to do it ourselves.</li><li id="37a2" class="ig ih fn ii b ij jm il im in jn ip iq ir jo it iu iv jp ix iy iz jq jb jc jd ji jj jk dw" data-selectable-paragraph=""><code class="ia lf lg lh lb b">@Body()</code> - This decorator allows us to validate incoming items coming through the request body. This means that if an issue is found at this level, we won't have to write logic to capture this and send a user-friendly error, Nest will take care of this for us. But how does it know</li></ol><p id="d11d" class="ig ih fn ii b ij ik il im in io ip iq ir is it iu iv iw ix iy iz ja jb jc jd db dw" data-selectable-paragraph="">Now we can go into our DTO file and further define any constraints that we would like.</p>
  
  ```TypeScript
  import { IsAlphanumeric, MaxLength, IsNotEmpty } from 'class-validator';
  export class CreateUserDto {
    @IsNotEmpty() // validates name is not empty
  @IsAlphanumeric() // validates name is alphanumeric
  @MaxLength(10) // validates name is no longer than 10 chars
  name: string;
}
```
<p id="4d09" class="ig ih fn ii b ij ik il im in io ip iq ir is it iu iv iw ix iy iz ja jb jc jd db dw" data-selectable-paragraph="">The above validation would normally take an entire system of handwritten regex wizardry and other conditional logic. We were able to write a few lines and add this validation. We can even go into our Swagger UI docs and test these out on our POST and GET by id endpoints to see the different error messages that we get.</p><h1 id="5305" class="jr js fn au jt ju jv il jw jx jy ip jz ka kb kc kd ke kf kg kh ki kj kk kl km dw" data-selectable-paragraph="">Queries — the hidden jewel of RESTful API’s</h1><p id="7af8" class="ig ih fn ii b ij kn il im in ko ip iq ir kp it iu iv kq ix iy iz kr jb jc jd db dw" data-selectable-paragraph="">Queries often require some parsing and logic to define, NestJS lets us define and validate this all in one line in our <code class="ia lf lg lh lb b">users.controller.ts</code>.</p>

```TypeScript
import { Query } from '@nest/common';
getUsers(@Query('name') name?: string): User[] {
      return this.usersService.findAll(name);
}
```

<p id="4fa2" class="ig ih fn ii b ij ik il im in io ip iq ir is it iu iv iw ix iy iz ja jb jc jd db dw" data-selectable-paragraph="">Then make a quick change to incorporate this into our service in <code class="ia lf lg lh lb b">users.service.ts</code></p>

```TypeScript
findAll(name?: string): User[] {
      if (name) {
          return this.users.filter(name);
    }
    return this.users;
}
```

<h1 id="1522" class="jr js fn au jt ju jv il jw jx jy ip jz ka kb kc kd ke kf kg kh ki kj kk kl km dw" data-selectable-paragraph="">Error Handling</h1><p id="58f4" class="ig ih fn ii b ij kn il im in ko ip iq ir kp it iu iv kq ix iy iz kr jb jc jd db dw" data-selectable-paragraph="">Nest comes with a built-in exception layer that handles the processing for all unhandled exceptions across your application. This means that when an exception is not handled by your app (say you forgot to write one or just didn’t get detailed enough with your exceptions), it will bubble up to this layer which will automatically send an appropriate user-friendly response. This is important as we can easily miss some common exceptions, or it can just be time-consuming to write the logic needed for some of them.</p>

```TypeScript
// basic usage of HttpException class
@Get()
async findAll() {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
}
// overriding the entire response body of the HttpException class
@Get()
async findAll() {
    throw new HttpException({
      status: HttpStatus.FORBIDDEN,
    error: 'This is a custom message',
  }, HttpStatus.FORBIDDEN);
}

```

<p id="6b0b" class="ig ih fn ii b ij ik il im in io ip iq ir is it iu iv iw ix iy iz ja jb jc jd db dw" data-selectable-paragraph="">Here we are seeing an exception handler in action called <code class="ia lf lg lh lb b">HttpException()</code>. This class is the base from which all other Nest exceptions are extended to give out more detailed user-friendly error messages. We can also use it to create our own custom error objects that extend from the <code class="ia lf lg lh lb b">HttpException</code> class.</p>

```TypeScript
// implementation
export class ForbiddenException extends HttpException {
    constructor() {
      super('Forbidden', HttpStatus.FORBIDDEN);
  }
}
// usage in your controller
@Get()
async findAll() {
    throw new ForbiddenException();
}
```

Obviously, it wouldn’t be much fun to have to write a bunch of custom exception handlers that extend from <code class="ia lf lg lh lb b">HttpException</code> each time you come across a new common exception that you have to deal with. For this, Nest provides a bunch of premade built-in HTTP exception classes that already do this complete with user-friendly error messages.</p><p id="6785" class="ig ih fn ii b ij ik il im in io ip iq ir is it iu iv iw ix iy iz ja jb jc jd db dw" data-selectable-paragraph="">Let’s say that we have a very common case where we want to search for a user by id but they do not exist in our database. This often requires a few things to happen on our side of the server building process. First would probably be the auth check, then parameter validation, then finally exception handling. We’ll be talking about that last part here by using Nest’s <code class="ia lf lg lh lb b">NotFoundException</code> class.</p>

```TypeScript
getUserById(id: number): User {
      const user = this.usersService.findById(id);
    if (!user) {
        throw new NotFoundException();
    }
    return user;
  }
  // returned response Object
{
    "statusCode": 404,
  "message": "Not Found"
}
```

<p id="737d" class="ig ih fn ii b ij ik il im in io ip iq ir is it iu iv iw ix iy iz ja jb jc jd db dw" data-selectable-paragraph="">There are a few advantages that this provides us.</p><ol class=""><li id="cf70" class="ig ih fn ii b ij ik il im in io ip iq ir is it iu iv iw ix iy iz ja jb jc jd ji jj jk dw" data-selectable-paragraph="">We don’t have to write our own exception logic, this gives us out-of-the-box human-readable code that team members can easily parse.</li><li id="0cf9" class="ig ih fn ii b ij jm il im in jn ip iq ir jo it iu iv jp ix iy iz jq jb jc jd ji jj jk dw" data-selectable-paragraph="">We can be more explicit about what exception is being thrown.</li><li id="5bee" class="ig ih fn ii b ij jm il im in jn ip iq ir jo it iu iv jp ix iy iz jq jb jc jd ji jj jk dw" data-selectable-paragraph="">We can use this chance to further define our error message.</li></ol><h1 id="8a1c" class="jr js fn au jt ju jv il jw jx jy ip jz ka kb kc kd ke kf kg kh ki kj kk kl km dw" data-selectable-paragraph="">EVEN MORE SWAGGERRRR!!! 😎 x100</h1><p id="2a67" class="ig ih fn ii b ij kn il im in ko ip iq ir kp it iu iv kq ix iy iz kr jb jc jd db dw" data-selectable-paragraph="">One problem with our Swagger UI docs is that it does not define enough of our endpoints. If you scaffold another feature it will pile up on top of your user endpoints because swagger does not currently recognize where one ends and another begins. Also, it does not know what our return objects Objects and messages should be before running the tests. We can fix this with Swagger decorators. Let’s hop back into <code class="ia lf lg lh lb b">users.controllers.ts</code> and add some in.</p>

```TypeScript
import {
    Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import {
    ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
@ApiTags('users') // separates users items in swagger docs
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}
      @ApiOkResponse({
      type: User,
    isArray: true,
    description: 'Returns all users in array',
  })
  @ApiQuery({ name: 'name', required: false })
  @Get()
  getUsers(@Query('name') name?: string): User[] {
      return this.usersService.findAll(name);
  }
    @ApiNotFoundResponse()
  @ApiOkResponse({
      type: User,
    isArray: false,
    description: 'Returns Single User by Id',
  })
  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number): User {
      const user = this.usersService.findById(id);
    if (!user) {
        throw new NotFoundException();
    }
    return user;
  }
    @ApiCreatedResponse({
      type: User,
    description: 'Creates a user in memory',
  })
  @ApiBadRequestResponse()
  @Post()
  createUser(@Body() body: CreateUserDto): User {
      return this.usersService.createUser(body);
  }
}
```

<ol class=""><li id="7310" class="ig ih fn ii b ij ik il im in io ip iq ir is it iu iv iw ix iy iz ja jb jc jd ji jj jk dw" data-selectable-paragraph=""><code class="ia lf lg lh lb b">@ApiOkResponse</code> - This allows us the opportunity to define beforehand what the reader should expect to get back. In our <code class="ia lf lg lh lb b">getUsers</code> case, we're explicitly defining that we'll be getting an array of <code class="ia lf lg lh lb b">Users</code>.</li><li id="f905" class="ig ih fn ii b ij jm il im in jn ip iq ir jo it iu iv jp ix iy iz jq jb jc jd ji jj jk dw" data-selectable-paragraph=""><code class="ia lf lg lh lb b">@ApiNotFoundResponse</code> - For those pesky 404 responses we can also define these for swagger to let our readers know what to expect in that case.</li><li id="976a" class="ig ih fn ii b ij jm il im in jn ip iq ir jo it iu iv jp ix iy iz jq jb jc jd ji jj jk dw" data-selectable-paragraph=""><code class="ia lf lg lh lb b">@ApiCreatedResponse</code> - As a FrontEnd developer, I've often had to ask my Backend developer what I should expect from a created response. In some cases, you can just expect the id, the whole object, or nothing at all. With this, we can just take a look at the Swagger UI docs and get back to it.</li><li id="1ba8" class="ig ih fn ii b ij jm il im in jn ip iq ir jo it iu iv jp ix iy iz jq jb jc jd ji jj jk dw" data-selectable-paragraph=""><code class="ia lf lg lh lb b">@ApiBadRequestResponse()</code> - When creating or updating, very commonly bad requests happen. It's nice to be able to tell a reader what to expect in this case as well.</li></ol><h1 id="7cb4" class="jr js fn au jt ju jv il jw jx jy ip jz ka kb kc kd ke kf kg kh ki kj kk kl km dw" data-selectable-paragraph="">Conclusion 😤</h1><p id="0f5f" class="ig ih fn ii b ij kn il im in ko ip iq ir kp it iu iv kq ix iy iz kr jb jc jd db dw" data-selectable-paragraph="">We explored many of the base features of NestJS in this article. There’s still so much to go through including the ability to create microservices, WebSockets, and much more. If you’re a die-hard Express user like I am, then I hope that this inspires you to be curious enough to explore Nest and play around with it.</p></div></div></section></div>
