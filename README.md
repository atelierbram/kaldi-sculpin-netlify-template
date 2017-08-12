# Small-business template with Sculpin and Netlify CMS

This is a small business template built with [Sculpin](https://sculpin.io/) and [Netlify CMS](https://github.com/netlify/netlify-cms), it was adapted by [Bram de Haan](http://atelierbramdehaan.nl/) from [a design](https://github.com/netlify-templates/kaldi-hugo-cms-template) by [Darin Dimitroff](http://www.darindimitroff.com/), [spacefarm.digital](https://www.spacefarm.digital) and the [Blog Skeleton](https://github.com/sculpin/sculpin-blog-skeleton) for Sculpin.

## Getting started

### Creating your Git Repo
Create a new repository on GitHub. To avoid errors, do not initialize the new repository with README, license, or gitignore files. You can add these files after your project has been pushed to GitHub.

Open terminal (or your command-line tool of choice) and make sure the current working directory is set to your local project. If not, navigate there like below:

```
cd /PATH/TO/YOUR/PROJECT
```

Initialize the local directory as a Git repository.
```bash
git init
```

Download (don’t clone) [this repository](https://github.com/atelierbram/kaldi-sculpin-netlify-template) and make it your own by editing the `package.json` and config files to reflect the name of your own new repo.

Copy or move the files from this `kaldi-sculpin-netlify-template` into your new local repository. This stages them for the first commit.

```bash
git add .
```

Commit the files that you’ve staged in your local repository.

```bash
git commit -m 'First commit'
```

At the top of your GitHub repository’s Quick Setup page, click the clipboard icon to copy the remote repository URL.

In Terminal, add the URL for the remote repository where your local repository will be pushed.

```bash
git remote add origin YOUR_GITHUB_REPOSITORY_URL
```

Verify your URL

```bash
git remote -v
```

Now, it’s time to push the changes in your local repository to GitHub.

```bash
git push origin master
```

### Install Dependencies
Now [download and install composer](https://getcomposer.org/download/), following the instructions from [Sculpin’s quick start guide](https://sculpin.io/getstarted/) for installing [Sculpin’s Blog Skeleton](https://github.com/sculpin/sculpin-blog-skeleton).

Now unlike the instructions in [Sculpin’s quick start guide](https://sculpin.io/getstarted/) instead of using [Sculpin’s Blog Skeleton](https://github.com/sculpin/sculpin-blog-skeleton) one can use the same commands within the working directory of the new project <sup><a href="#notes">1</a></sup>.

Install Sculpin

```bash
composer install
```


Install dependencies from NPM for generating the static assets defined in `gruntfile.js`

```bash
npm install

```

Generate the static assets from `source` to `dist`

```bash
grunt build
```

Build the static site locally with one of these commands for Sculpin

```bash
php vendor/bin/sculpin generate --watch --server
```

Or with an alias defined in `package.json` which does the same

```bash
npm run sculp
```

Your newly generated project, this clone of kaldi-sculpin-netlify-template is now accessible at `http://localhost:8000/`.

When you have LiveReload installed as a browser extension, in for example Chrome, than your edits in Sass and javaScript which are compiled by Grunt are reflected and updated automagically without the need to manually refresh the page (, one has to have Grunt watching with having the `npm run sculp` command running though).

Be sure to edit the config file `app/sculpin_site_prod.yml` and replace the variables to reflect yours:

```yml
imports:
  - sculpin_site.yml
url: //name-of-your-website.netlify.com
slug: //name-of-your-website.netlify.com
slug_posts: //name-of-your-website.netlify.com/blog
```

Now rebuild the static site again (`CTRL-C` to stop the “watching”), but now with this command:

```bash
npm run prod
```

this is an alias for running:
```bash
sculpin generate --env=prod
```

This will change the paths for some links to be the same as on your remote host (the ones you just edited in `app/sculpin_site_prod.yml`)


Make all the edit’s and changes that is needed to make this begin to look like your own project, dive into the templates, edit some content. When everything works and all the changes are again committed in Git and pushed to GitHub, let’s connect them to Netlify.

In the next bit we will make it so that every time when you push to GitHub, Netlify will automagically deploy all of the updates or changes.

## Getting started on Netlify
If you are not already a Netlify user, go ahead and [sign up for free here](https://app.netlify.com/signup) first.

### Step 1: Add Your New Site

![add a new project on Netlify](http://i.imgur.com/GHkydj7.png "getting started on Netlify - add new project")

Once you’ve logged in, to create a new site on Netlify you’ll be taken to https://app.netlify.com. If you’re just starting out, there’s only one option, Click the **Add A New Project** button shown above.

### Step 2: Link to Your GitHub

Clicking “Add A New Project” brings you to this screen:

![link to your Github on Netlify](http://i.imgur.com/TBtVo58.png "getting started on Netlify - link to your Github")


Since your repo is already pushed to GitHub, all we need to do is link Netlify to GitHub. Click the **GitHub** button as illustrated in the screenshot above.

### Step 3: Authorize Netlify

![authorize Netlify](http://i.imgur.com/S8lQAgU.png "getting started on Netlify - authorize Netlify")

It’s time to allow Netlify and GitHub to talk to each other. Clicking the Authorize Application button will do just that. Like it says in the image below, Netlify doesn’t store your GitHub access token on our servers. If you’d like to know more about the permissions Netlify requests and why they are necessary, you can visit https://docs.netlify.com/github-permissions/.


### Step 4: Select Your Repo

![select Your Repo on Netlify](http://i.imgur.com/t8OXnB6.png "getting started on Netlify - select your repo")

Now that you’ve connected Netlify and GitHub, you can see a list of your Git repos. Look for the “Sculpin” repo we just pushed to GitHub. Let’s select it.

### Step 5: Configure Your Settings

![configure settings on Netlify](http://i.imgur.com/hvNWJYW.png "getting started on Netlify - configure settings")

Here you can configure your options. Make sure your Directory is `dist/` and your build command is `npm run build`. Then click the **Build your site** button to continue.

### Step 6: Build Your Site

![build and generate your site on Netlify](http://i.imgur.com/OH2hKfL.png "getting started on Netlify - build your site")

Now wait a minute until the build process is done.

Netlify went ahead and gave your site a temporary name, but you can update that to make it look a little prettier.
Take it a step further and setup your custom domain. Learn how to do that [here](https://www.netlify.com/blog/2016/03/14/setting-up-your-custom-domain/).

### Step 7: Authorize Github integration for Netlify CMS

When the deploy completes, you can see your site, but in order to use the CMS, you'll need to set up authentication with GitHub.

First, register the site CMS as an authorized application with your GitHub account:

1. Go to your account **Settings** page on GitHub, and click **Oauth Applications** under **Developer Settings** (or use [this shortcut](https://github.com/settings/developers)).
2. Click **Register a new application**.
3. For the **Authorization callback URL**, enter `https://api.netlify.com/auth/done`. The other fields can contain anything you want.

![GitHub Oauth Application setup example](http://i.imgur.com/PD1IEam.png "GitHub Oauth Application setup example")

When you complete the registration, you'll be given a **Client ID** and a **Client Secret** for the app. You'll need to add these to your Netlify project:

1. Go to your [**Netlify dashboard**](https://app.netlify.com/) and click on your project.
2. Click the **Access** tab.
3. Under **Authentication Providers**, click **Install Provider**.
4. Select GitHub and enter the **Client ID** and **Client Secret**, then save.

![Netlify install auth provider](http://i.imgur.com/T1MYsth.png "install-auth-provider")

### Access the CMS

With the site deployed and authentication in place, you'll be able to enter the CMS by going to the URL of your new site and appending `/cms`.

Login with Github

![login with github](http://i.imgur.com/htug2X9.png)

When logged in you have arrived at Netlify’s CMS admin

![login with github](http://i.imgur.com/1tFGkIB.png)

Clicking on an entry will bring you to the editor where you can edit your content

![Netlify CMS - edit post](http://i.imgur.com/r6UKqJ7.png)


***   ***   ***   ***   ***   ***   ***   ***   ***

## About the template

### Layouts

The template is based on small, content-agnostic includes that can be mixed and matched. The pre-built pages showcase just a few of the possible combinations. Go to the `source/_includes/` folder to see all available includes.

The layouts for the pages and posts inherit from the default `layouts/default.html` template. Those templates can be found in the `source/_views` folder.

Take note of the differences in syntax between an include `{% include "image_grid" %}` and outputting a variable from the meta-data defined in the Yaml front matter at the top of your page or post `{{ page.main.heading }}`.

```twig
{% include "image_grid.twig" %}

<h3 class="f3 b lh-title mb2">{{ page.main.heading }}</h3>
```

We can have things like if statements and for loops as well with Sculpin and Twig:

```twig
{% if page.tags %}
  <p class="tags"><span class="primary">Tags:</span>
  <ul class="mb1 inline-flex">
    {% for tag in page.tags %}
    <li><a href="{{ site.url }}/blog/tags/{{ tag|url_encode(true) }}" class="link pl1-ns">{{ tag }}</a></li>{% if not loop.last %}, {% endif %}
    {% endfor %}</ul></p>
{% endif %}
```

### CSS

The template uses a custom implementation of [Tachyons](http://tachyons.io/) for utility styles and renders the Sass from the Grunt build – or watch command into CSS. To customize the template, look for `source/assets/sass/imports/_variables.scss` where most of the important global variables like colors and spacing are stored.

### SVG

All SVG icons stored in `src/assets/img/icons` are automatically optimized with grunt-svgstore and concatenated into a single SVG sprite stored as an include called `svgstore.twig` in `source/_includes`. Make sure you use consistent icons in terms of viewport and art direction for optimal results. Refer to an SVG via the `<use>` tag like so:

```html
<svg width="16px" height="16px" class="db">
  <use xlink:href="#SVG-ID"></use>
</svg>
```

<h3 id="notes">NOTES</h3>

In the original [Blog Skeleton](https://github.com/sculpin/sculpin-blog-skeleton) for Sculpin two modules in the subdirectory are installed as submodules:
 - `vendor/sculpin/sculpin`
 - `vendor/dflydev/embedded-composer`

This did throw errors on the initial deploy process, so I had to change this, remove the `.git` and remove it from cache, re `git add` those folders in order for them to show up in the git repo, and thus for the deploy process to succeed.

### RESOURCES
- [Kaldi Hugo CMS Template](https://github.com/netlify-templates/kaldi-hugo-cms-template)
- [Sculpin’s Blog Skeleton](https://github.com/sculpin/sculpin-blog-skeleton)
- [Tutorials on Netlify](https://www.netlify.com/tags/tutorial/)
- [Authenticate with GitHub](https://github.com/netlify/netlify-cms/blob/master/docs/test-drive.md)
- [Tachyons](http://tachyons.io/)
- [Sculpin](https://sculpin.io/)
- [Sculpin’s quick start guide](https://sculpin.io/getstarted/)

### LICENSE
Released under [MIT Licence](http://atelierbram.mit-license.org)


