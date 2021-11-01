---
title: A How-To Guide On Design for Developers
description: “I’m not a designer.” Most of us have thrown out this disclaimer just before or just after sharing a technical project. I bet most of us have made it to the mid-way point of a feature or component build, only to back track because the final implementation didn’t seem to fit.
date: "2020-07-13"
image: "https://www.singlestoneconsulting.com/wp-content/uploads/2020/07/daniel-mingook-kim-Pd-bOA-MZQs-unsplash-865x1300.jpg"
tags: guide, design, work-flow, development, production
---

<img src="https://www.singlestoneconsulting.com/wp-content/uploads/2020/07/daniel-mingook-kim-Pd-bOA-MZQs-unsplash-865x1300.jpg" class="lazyload" />

“I’m not a designer.” Most of us have thrown out this disclaimer just before or just after sharing a technical project. I bet most of us have made it to the mid-way point of a feature or component build, only to back track because the final implementation didn’t seem to fit. From one “I’m not a designer” developer to another, I hear you. Thus, I want to share my workflow that incorporates the best tools and thought patterns, for helping us “non-designer” developers, design better.

### First, **let’s create a scenario**.

You have an exciting idea for an e-commerce app and you finally have time to begin working on the project. Your aim is to service a specific group of people whose needs aren’t being met by the current market applications. You see this as an opportunity to solve some problems and maybe even create a business.

What’s the first thing we should do? Should we create a GitHub repo, create a react app, and start knocking out a redux boilerplate? Should we start looking up technologies that we’ll be using to host the application such as AWS, Heroku, firebase, etc? Maybe we should start setting up a node/express backend with some cool tech that we’ve always wanted to try like [GraphQL](https://www.singlestoneconsulting.com/article/graphql-how-to-guide-create-query-models-for-functional-test-automation/).

### **The solution**.

![A design workflow for developers](https://www.singlestoneconsulting.com/wp-content/uploads/2020/07/jo-szczepanska-5aiRb5f464A-unsplash-1300x868.jpg)

First, rewind even further than the above-mentioned approach. By writing down the “who” and “why” above, we can begin to fill in the “what.” Currently, the application is a blank canvas with details of it living only inside your imagination. Many questions haven’t been asked yet, and there is a huge fog as to what this application can become beyond the initial ideas when we decided that we were going to dive in.

We need to fill in the blanks for this application. We need to identify ALL the features we would like to have for the application by listing them out. I find that this is best written down either on a piece of paper, sticky notes, or even on a word doc. Then we can begin to think about what features are most important at launch and which can be added later. We can assign priorities to the features long before we begin adding them into focus on what matters now. Once we have all the features written and plotted by priority, we can begin to think about design.

## **So how should I design this amazing app?**

<img src="https://www.singlestoneconsulting.com/wp-content/uploads/2020/07/image-12.png" class="lazyload" />
While there are plenty of tools for designing, [Figma](http://figma.com/) is my go-to for a quick wireframe. It’s a free, extremely powerful web application that lets you design and prototype mockups.

Built for both developers and designers, you can use a lot of your web styling knowledge as well as plugin like packages you might already be familiar with.

### **Okay so now what, I still don’t know how to design**.

Now we can start looking at competitor sites for an e-commerce app and ask yourself the following questions:

- What are some of the things that you notice as a user going into their site?
- Does anything pop out at you in the landing page (call to action buttons, product advertisements, menus)?
- What is the priority of the layout?
- Is there a size or spatial difference between items they want you to pay more attention to?
- Can you see any problems they solved that you might run into during development?
- What is the user experience like when you go through their site?

<img src="https://www.singlestoneconsulting.com/wp-content/uploads/2020/07/image-11.png" class="lazyload" />
At this point, I would begin to block out my layout in Figma using temporary components (rectangles work well here). The great part about design is that everything can be changed later if we don’t like it, often with less effort than removing an entire component in code. Figma lets you embed images into the rectangles so no need to worry about resizing later.

At this point, I often do a quick google search for “great e-commerce site designs” or something similar. This usually results in a treasure trove of great looking sites that will give you ideas on how to refine the layout of the app. Explore some layouts that interest you and cherry-pick what you like about them. Move things around to see what feels natural and ask around for feedback.

### **Time to fill in the content**.

Personally, I love a lot of the colors and styles used in [Material Design](https://material.io/). They are consistent, focus heavily on accessibility, and aren’t too difficult to replicate. A lot of their components include icons and good use of very basic color ranges that make items easy to identify at a quick glance. I like to use this [color tool](https://material.io/resources/color/#!/?view.left=0&view.right=0) to help guide my palette choices as I go through branding and theming. This familiarity will make the user experience better as they won’t need to “learn” your application, we aim to make it feel natural. While the logic behind your components might include a lot of thought and lines of code, we don’t want users to feel all that work when using the site. The biggest compliment you could strive for is, “this looks simple.”
<img src="https://www.singlestoneconsulting.com/wp-content/uploads/2020/07/image-10.png" class="lazyload" />
#### In the Figma designed image on the right we can see the following patterns being used:

- Call to action buttons are colorized (often on the brighter side to stand out).
- Icons are on the left to follow the flow of how English readers view text content.
- Items are aligned and evenly spaced out so that the viewer can digest what they need in sections.
- Because I am not a designer, I aim for simplicity and familiarity in my components.
- There is a good focus on padding, items are aligned vertically inside of their containers.

The same approach can be recycled as you begin to build out the rest of the features for your application. We can create other pages and get a view of what we want the users experience to be. We can also take this opportunity to start fitting in those features we mapped out earlier into the design. Try to reuse as much as possible to help the user maintain familiarity with your site and how it works. You don’t want buttons to have unexpected behavior throughout your application or forms to look like they were made by different people. Through each iteration, you can present your design to your target audience for feedback. Design can be a fun process that can save you hours, days, or even weeks worth of code if done with care.

### To recap, the workflow and approach to design for developers is:

1.  Map out and prioritize your features.

1.  Research competitors and see how they solve some design challenges.

1.  Google search some great designs for the components or layouts that you’re trying to build, then cherry pick ideas.

1.  Block out your layout with primitive shapes.

1.  Fill in the content, reuse components and styles to maintain a theme.

1.  Show design to someone for feedback.

1.  Adjust if needed, then repeat step 3 to 6 until completion.

### **Design is done, can I write some code now please?**

<img src="https://www.singlestoneconsulting.com/wp-content/uploads/2020/07/image-9.png" class="lazyload" />
Once the design is done, it’s very tempting to hop into some code. But, this is where we should put the project management hats on and start setting up expectations for the sprint. That’s right, sprints are a valuable format to tracking expectations and your progress throughout the lifetime of your project. If you are familiar and comfortable with Kanban tools like [Jira](https://www.atlassian.com/software/jira) or [PivotalTracker](http://www.pivotaltracker.com/), then feel free to use those. For the sake of simplicity, I like to go with [Trello](https://trello.com/en-US).

Trello is easy and fast to get into, so you won’t be spending a lot of time trying to “learn” the system. It doesn’t have as many features as the other two options, which might be perfect for a personal project.

---

We’ve got your design files done, your first sprint plotted, and now we’re able to confidently lay down some code. Thanks to the planning and design that we took care of first, we can easily focus on building rather than swimming through a sea of doubt.

Next time you’re about to start a project, try following these guidelines and let me know if they improve your design and process, or made things easier. I’d love to hear from you!