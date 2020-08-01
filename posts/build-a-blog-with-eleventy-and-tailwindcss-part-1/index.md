---
title: Build a Blog with Eleventy and Tailwind CSS - Part 1 - Installation
date: 2020-07-27
videoDuration: 9 mins
videoLink: https://youtu.be/J20id5ToeLg
description: "This is the first in a series of tutorials that show how to create a blog with the static generator Eleventy and the utility-first Tailwind CSS framework."
---

{{ videoLink }}

This series of posts shows you how I created the blog for stubborncode.com using Eleventy and Tailwind CSS. Its aim is to help you create and style your own static sites.

This first tutorial talks a bit about Eleventy and Tailwind CSS. What they are, why you would want to use them and how to install them.

We:

- <a href="#introduce-eleventy-and-tailwindcss" target="_self">Introduce Eleventy and Tailwind CSS</a>
- <a href="#install-eleventy" target="_self">Install Eleventy</a>
- <a href="#install-tailwindcss" target="_self">Install Tailwind CSS</a>

_Whenever you see the '\$' symbol in front of a command, it's a terminal command._

### <span id="introduce-eleventy-and-tailwindcss">Introduce Eleventy and Tailwind CSS<span>

Eleventy is a simple static site generator. A static site generator reads our content, feeds it to templates and outputs static HTML files that we can upload to our web hosting service. There are a lot of different static site generators out there. stubborncode.com was previously built with Hugo, which uses the Go language that I'm not very familiar with. Eleventy is using JavaScript, which I know quite well. It's also quite simple, but powerful enough that I can add more features in the future.

Tailwind CSS is a low-level utility class CSS framework. Most CSS frameworks do too much. Frameworks such as [Bootstrap](https://getbootstrap.com/), or [Bulma](https://bulma.io/) give you full fledged components that are easy and fast to work with. However, this also leads to sites that might look similar to each other and are difficul to customize. Tailwind's classes give you the ability to create true custom designs, but that does not come without a cost. If you want a quick design, you might still want to use a component framework. Tailwind resets all styles by default, which practically means that you need to style everything yourself.

### <span id="install-eleventy">Install Eleventy<span>

In order to use Eleventy you need to install node.js. You can get its installer from [here](https://nodejs.org/en/). I prefer to use a node version manager that gives me the flexibility to install and use different node versions if I ever need to. If you're on a Mac or Linux computer, you can use [nvm](https://github.com/nvm-sh/nvm). I am on Windows, so I'm using [nodist](https://github.com/nullivex/nodist). After you install node, you automatically get npm, the node package manager, as well. To use that you need a console emulator. If you are on a UNIX-like system, you can use the native terminal app. On Windows, you can use something like [cmder](https://cmder.net/).

Unlike other static site generators, Eleventy does not scaffold your project, but only generates files in an existing project folder.

In a terminal, we can create a project folder with `mkdir` and `cd` into it using the commands below:

```
$ mkdir name_of_your_project
$ cd name_of_your_project
```

We can now initialize a node project with:

```
$ npm init -y
```

The -y flag will accept everything and give us the default configuration.

We can either install Eleventy globally with:

```
$ npm install -g @11ty/eleventy
```

or locally, as a development dependency running the below command:

```
$ npm install --save-dev @11ty/eleventy
```

I'm going to go ahead and install it as a dev dependency, which will also be helpful for the deployment as we will see in a later post.

Eleventy compiles any files that have a valid template extension in the folder of our project into an output folder in the root of our project, which is named `_site` by default. We can also tell Eleventy to copy other file types that you might need such as images, or fonts, which we will do in a later post.

### <span id="install-tailwindcss">Install Tailwind CSS<span>

We'll also install Tailwind CSS though npm. Note that Tailwind is a PostCSS plugin. PostCSS is a tool that transforms CSS through JavaScript. In order to use it in our project we need to install a few more dependencies as well.

```
$ npm install tailwindcss postcss-cli autoprefixer
```

'tailwindcss' obviously installs Tailwind.
We are going to use the 'postcss-cli' to process our CSS and 'autoprefixer' is another PostCSS plugin that adds vendor prefixes to our CSS.

With Tailwind installed, we run:

```
$ npx tailwind init
```

to create a Tailwind configuration file in our project folder named 'tailwind.config.js'. We will use that to customize Tailwind.

We also need to create a PostCSS config file. I am going to create a file named 'postcss.config.js' in the root of our project folder. Here we specify which PostCSS plugins we want to use.

This is what our PostCSS config looks like for now:

```
module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer')
  ]
}
```

We also need to create a CSS file for our plugins to process.

I am going to create a folder named 'css' and inside it a file named 'tailwind.css'.

This is what the 'tailwind.css' file contains:

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

When PostCSS compiles our CSS, the '@tailwind' directive is going to insert Tailwind's base, components and utilities classes into our final CSS file.

In order to compile our CSS, we are going to write a script in our 'package.json' file that is located in the root of our project folder.

By default it only contains the following script:

```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

We are going to change the above to:

```
"scripts": {
    "build": "postcss css/tailwind.css -o _site/css/tailwind.css"
  },
```

We want to run the postcss command, provide our input file which is located at 'css/tailwind.css' and use the -o flag to specify where we want our output file. Since we are using the default Eleventy output folder, which is '\_site', we are going to save our output CSS in '\_site/css/tailwind.css'.

Now if we run:

```
$ npm run build
```

in our terminal, we should get our PostCSS generated css file.

And that's it!

## You have now setup a basic project with Eleventy and Tailwind CSS!
