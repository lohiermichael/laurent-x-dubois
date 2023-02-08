# laurent_x_dubois

This is a responsive photography website that I made for a friend of mine.
It uses:

- Node.js and Express
- Scss

It uses no frontend framework nor CSS packages such as Bootstrap. Animations and
responsiveness are implemented using pure CSS and Javascript.

## How to

### ... launch the app?

Build the container:

```COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose build```

Run the container:

```docker-compose up prod```

### ... link my email to the contact page

1. Generate the application token as explained here:
[Google instructions](https://support.google.com/accounts/answer/185833?hl=en)

2. Add the token to the `.env` file under `SENDER_GMAIL_PASSWORD`

### ... add a new gallery of images

1. Place your new set of images under `src/public/galleries` in a <gallery_name>
   folder.

2. In this <gallery_name> folder, there must be:
   - An `images` folder in which the images of the gallery are
   - A `videos` folder with a `video.mp4` that will be the background video

3. Additionally, if you want to add it to the menu, you need to edit the
  `src/views/partials/header.ejs` file.

### ... setup GoogleAnalytics

Add your `ga_measurement_id` under a variable called:
`GOOGLE_ANALYTICS_MEASUREMENT_ID` in the `.env` file and it should be good!

### ... add new SEO words to the site

These SEO words will appear in the `alt` field of images.
You should create (or edit if already existing) a file `SEOWords.txt` under
`/public/data`. There should be only one word by line.
