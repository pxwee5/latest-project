To deploy this project, you'll need to do the following:

# To Deploy
You need to have npm installed. If you haven't installed npm please head over to https://nodejs.org/en/

Once done, clone the repository and run the following code:

```
npm install
```

The development packages are managed by bower, so you will need to install the packages using:

```
bower install
```

Once that is done, you can start the a local development server (serving files from app folder). You do that using:

```
gulp serve
```

To get the distribution files, you will need to build them:

```
gulp build
```

And then you can serve the distribution files using (you will be serving the files from the dist folder):

```
gulp serve:dist
```

## Image Sizes
This section lists out the minimum size of an image and its ratio.

Most images are added via the "style" attribute on the section that automatically sizes according to its templates.

No matter what size you put, the images will be styled according to the "background: no-repeat center / cover" rule. But it is still a good practice to follow the image ratios for a better result.

* D = Desktop
* T = Tablet
* M = Mobile

#### Hero (Carousel and Static)

* D - 1440 x 640 - 2.2:1
* T - 700 x 570 - 1.2:1
* M - 320 x 160 - 2:1

#### Article Thumbnails (Products/News)

* DTM - 645 x 430 - 1.5:1

#### Index Video

* DTM - 100% x H - 16:9
