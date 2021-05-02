---
title: SSR PDF with Puppeteer, D3, and Handlebars
description: Looking for a way to create a design-heavy, data-driven, beautifully styled PDF report — server-side with similar tools to what you are already using on the front-end? Stop your Google search. You’ve come to the right place.
date: "2020-07-11"
image: "https://miro.medium.com/max/782/0*XaujefLUYzEMEZMz.png"
tags: pdf-generation, nodejs, puppeteer, d3, handlebars, javascript
---

Looking for a way to create a design-heavy, data-driven, beautifully styled PDF report — server-side with similar tools to what you are already using on the front-end? Stop your Google search. You’ve come to the right place. I was in the same boat as you a few months ago while helping a client with this exact problem. In order to accomplish this feat, I developed a four-step solution using Puppeteer, D3, and handlebars. In this post, I’ll give you step by step instructions on creating server-side pdf reports. Let’s dive in.
<img src="https://miro.medium.com/max/782/0*XaujefLUYzEMEZMz.png" alt="" class="lazyload" />

> Example of a D3 generated page using handlebars and puppeteer

## In this post, we’ll cover

- Setting up Puppeteer & Handlebars
- Creating a generator to make our PDF
- Building out a handlebars template
- Adding the finishing touches

## The challenges of creating these PDF reports:

Because we’re using a template framework to access standard web technologies along with puppeteer to manage the pdf, we’ll need to think about these things during development:

- Pages will manually need to be constrained.
- We won’t have access to css media props other than “screen.” (no “page-break-after” or the print media type)
- We won’t be able to use dev tools to debug irregularities once the PDF is compiled and rendered.
- Puppeteer itself adds extra build time and size to your deployments.
- Generating a report can take a while depending on file size.

### For this example, let’s assume…

We already have the base of our project up and running Node/Express, and some type of ORM and DB solutions. We’re all set to feed our sweet, sweet data into a report.

## The tools we need to make this happen:

### 1\. Handlebars

Html templating framework from the Mustache family. This allows for Partial templating (fancy talk for components) and custom and built-in helper functionality to expand on our logic.

```bash
npm i handlebars
```

_Example using partials and built in blocks_

```HTML
{{#each poleComparison as |page|}}
<div class="page">
  {{#each page.pairs as |polePair|}}
	{{> comparison-header polePair=polePair }}
	    <div class="comparison-tables">
		    {{> comparison-body polePair=polePair }}
	    </div>
  {{/each}}
  {{> footer @root }}
</div>
{{/each}}
```

## Puppeteer

A node library that will provide us access to a chrome headless instance for generating the PDF based on our compiled Handlebars templates.

```bash
npm i puppeteer
```

A list of use cases:

- Generate screenshots and PDFs of pages.
- Crawl a SPA (Single-Page Application) and generate pre-rendered content (i.e. “SSR” (Server-Side Rendering)).
- Create an up-to-date, automated testing environment.
- Test Chrome Extensions.

### 3\. D3 (Data Driven Documents)

D3.js is a JavaScript library for manipulating documents based on data. D3 helps you bring data to life using HTML, SVG, and CSS. D3’s emphasis on web standards gives you the full capabilities of modern browsers without tying yourself to a proprietary framework, combining powerful visualization components and a [data-driven](https://www.singlestoneconsulting.com/article/data-infrastructure-architecture/) approach to DOM manipulation.

```HTML
<script src="https://d3js.org/d3.v5.min.js"></script>
```

### Step one: setting up Puppeteer & Handlebars

First, we’ll create a directory for our PDF then import the required modules. This will be a JavaScript file that we’ll place within our server-side structure of our application. We can call this generatePDF.js for convenience.

```JavaScript
const puppeteer = require("puppeteer");
const hbs = require("handlebars");
```

Next, we’ll need to let handlebars compile our template. We will create a compile function which will locate the .hbs file and use the handlebars built in compile method to do this.

```JavaScript
const puppeteer = require("puppeteer");
const hbs = require("handlebars");

const compile = async (templateName, data) => {
	const filePath = path.join(__dirname, "templates", `${templateName}.hbs`);
	if (!filePath) {
		throw new Error(`Could not find ${templateName}.hbs in generatePDF`);
	}
	const html = await fs.readFile(filePath, "utf-8");
	return hbs.compile(html)(data);
};
```

This method allows us to also inject the data that we will be using into our template.

Finally, we’ll want to setup our generatePDF function. It’s job will be to open a puppeteer headless chromium instance to convert our template into PDF format.

```JavaScript
let browser;
const generatePDF = async (fileName, data) => {
	try {
		if (!browser) {
			browser = await puppeteer.launch({
				args: [
				"--no-sandbox",
				"--disable-setuid-sandbox",
				"--disable-dev-shm-usage"
				],
				headless: true,
			})
		}
	} catch (err) {
		...
```

We’ve passed some configuration options to our puppeteer browser that will make it headless and lightweight. We also don’t want multiple browsers to be open at the same time, this can cause performance issues when generating multiple reports.

Next, we’ll be creating a new incognito browser context. We’ll use this instead of the usual context method because it won’t share cookies/cache with other browser contexts. This is helpful for other features of puppeteer but won’t be needed for this process.

```JavaScript
        ],
				headless: true,
			})
		}
		const context = await browser.createIncognitoBrowserContext();
		const page = await context.newPage();
		const content = await compile(fileName, data);

	} catch (err) {
		...
	}
}
```

Now we’ll setup our content and tell puppeteer to wait until everything is loaded before rendering the PDF.

```JavaScript
const content = await compile(fileName, data);

		await page.goto(`data: text/html, ${content}`, {
			waitUntil: "networkidle0"
		});
		await page.setContent(content);
		await page.emulateMedia("screen");

	} catch (err) {
		...
	}
}
```

\* **page.goto** takes a URL string and config options. We won’t be traveling to a URL, instead we’ll be utilizing our compiled html.

\* **emulateMedia** changes the CSS media type used on the page. We’ll want our media type to reflect the CSS used for screens.

We’ll get to set our page format so that puppeteer knows how to render. Keep in mind that puppeteer has no concept of where we want to split our actual content (that will be handled later through our templates css).

```JavaScript
await page.emulateMedia("screen");

		const pdf = await page.pdf({
			format: "A4",
			printBackground: true,
		});

		await context.close();
		return pdf;

	} catch (err) {
		...
	}
}
```

### Step two: set up our handlebars templates

We’ll start by creating our first handlebars template file for our report. Notice that the syntax looks and acts just like regular HTML.

```HTML
**our_report.hbs**

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Our Cool PDF Report</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
  <script src="https://d3js.org/d3.v5.min.js"></script>
</head>
  <body>
	  <div>
	    <p>Hello World<p>
	  </div>
  </body>
```

### Lets have our data brought into our template

We can use some handlebars built-in blocks to help us interact with the data that we injected earlier in our compile function. We can use the “with” block to gain context to the data that we need, then an “each” block to iterate over it.

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Our Cool PDF Report</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
  <script src="https://d3js.org/d3.v5.min.js"></script>
</head>
  <body>
	  <div>
		{{#with Data as |myData| }}
		 {{#each myData.text as |text| }}
		 <p>{{text}}<p>
		 {{/each}}
		{{/with }}
	  </div>
  </body>
```

### Now we can add some process to generate our PDF

Now in our node app we can use our generatePDF function to create our PDF. This would be the time for you to decide what you ultimately want to do with the report. You could store it in your database, serve it to the client-side, or stash it into an S3 bucket. There’s a lot of freedom here depending on what your application’s needs.

```JavaScript
const generatePDF = require('./generatePDF.js');

const generateReportWithData = reportData => {
 return generatePDF("our_report", reportData);
  }
```

If you have different types of reports, we can take this opportunity to toss in a switch statement and some logic to decide which report to generate.

### Step three: build out a handlebars template

Now we can set up our template styling.We’ll create a file called style.hbs. I like to set up global variables css variables to keep me honest with a lot of my styling. pt is a recommended unit for printable documents and I found that px didn’t always work so well for text. I also found that em units translate better for letter spacing than pixels. This made it easier to match the design kerning/letter-spacing when converting the values.

### Building out the page constraints

```CSS
**style.hbs**
:root {
	--font-s-small: 8pt;
	--font-s-normal: 10pt;
	--font-s-mid: 12pt;
	--font-s-large: 14pt;
	/* Kerning */
	--ltr-spc-200: 0.2em;
	--ltr-spc-100: 0.1em;
	--ltr-spc-020: 0.02em;
	--ltr-spc-025: 0.025em;
}
```

If you recall, we talked about how Puppeteer has no context on when we want to split up our document into pages. It will generate the PDF and break up the pages appropriate regardless of where our content sits. This means that our content will just spill over to the next page automatically when it overflows, and we don’t want that as we would rather be in control. We’ll add some styling to let our HTML body continue forever and a page container which will match the constraints of an A4 formatted page. If you are using a different format, you’ll need to plug the numbers for that in the height and width of the page container.

```CSS
html, body {
	height: 100%;
	margin: 0;
	padding: 0;
	}
.page {
	background: white;
	display: block;
	margin: 0 auto;
	margin-bottom: 8.5em;
	/* Size = A4 */
	width: 21cm;
	height: 29.7cm;
	padding: 5em 30px 0 30px;
	position: relative;
```

# In the file where you setup puppeteer and handlebars

Since we created a style.hbs file, we’ll want to register as a partial so that we can just plug it into our template. This way we won’t have to jam all of our styles into our main template file and can reuse the code if we need to.

```JavaScript
hbs.registerPartial("style", fs.readFileSync(
    path.join(__dirname, "/path/to/style.hbs"), "utf-8"),
);
```

Now that it has been registered as a handlebars partial, we can simply bring it into our template.

```HTML
{{> styles }}
</head>
  <body>
	  <div class="page">
		{{#with Data as |myData| }}
		 {{#each myData.text as |text| }}
		 <p>{{text}}<p>
		 {{/each}}
		{{/with }}
	  </div>
  </body>
```

# Step four: adding in some d3

We already brought in the d3 CDN link into our template header

```HTML
<script src="https://d3js.org/d3.v5.min.js"></script>
```

Now it’s time to create a partial for our d3 script. We’ll do this using the same method that we used to create the style.hbs partial. Register a d3_script.hbs file as a handlebars helper.

```JavaScript
hbs.registerPartial("d3_script", fs.readFileSync(
	path.join(__dirname, "/path/to/d3_script.hbs"), "utf-8"),
);
```

Then we can drop it into our main template as needed. Also note the canvas anchor div used in the template to give our D3 a foundation to start from.

```HTML
**my_template.hbs**
		{{/each}}
	{{/with }}
  </div>
  <div class="canvas"></div>
</body>

<script type="text/javascript">
const svg = d3
	.select('#canvas')
	.append('svg')
	.attr('viewBox', [-width / 2, -height / 2, width, height]);
</script>
```
