# Getting Started with Vue.js in .NET Core

Beginner tutorial on using Vue.js with .NET Core and Razor Pages in Visual Studio

## Prerequisites

You will need to have Node and NPM installed.

## Usage

Open **_Command Prompt_**, clone this repo and `cd` into the project to install JavaScript dependencies

```
git clone https://github.com/esausilva/vuejs-aptnet-core.git
cd vuejs-aptnet-core\netcore-vuejs
npm i
```

**Note**: Since this project is using `gulp-sass` and the latest version is not compatible with Node 10.x because it depends on an older version of `node-sass`. If you have Node 10.x installed, you will have to update `node-sass` dependency in `gulp-sass` directory.

In **_Command Prompt_**, type the following from the root of the project

```
cd netcore-vuejs\node_modules\gulp-sass
npm i node-sass@latest
```

If you are running Node 11 or greater, you will need to install `natives`. This is because Gulp breaks with Node 11 and this is the fix. See [this issue](https://github.com/gulpjs/gulp/issues/2246) for more info.

```
npm i natives@1.1.6
```

After installing dependencies, double click `netcore-vuejs.sln` to open the project in Visual Studio.

## Tutorial

Follow the tutorial: [https://blog.bitsrc.io/getting-started-with-vue-js-in-net-core-using-visual-studio-efbb43703630](https://blog.bitsrc.io/getting-started-with-vue-js-in-net-core-using-visual-studio-efbb43703630)

## Giving Back

If you would like to support my work and the time I put in making tutorials, you can click the image below to get me a coffee. I would really appreciate it (but is not required).

[![Buy Me A Coffee](https://www.buymeacoffee.com/assets/img/custom_images/black_img.png)](https://www.buymeacoffee.com/esausilva)

-Esau
