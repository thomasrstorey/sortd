# sortd
a web app for sorting out your problems

## development roadmap

### backend

- [x] receive string, output steps, with all text, as json
- [x] save steps to retrieveable json file
  - [x] generate unique hash for each set of steps and text
- [x] send json according to received hash
- [x] send json after generating steps (callback for saving should call the send function using the hash)

### frontend

- [x] basic template (handlebars, css)
- [ ] individual page layouts
  - [x] landing (100% width, big pictures)
  - [ ] about (me pic, bio)
  - [x] sort (d3 canvas, text directions, next/back, stage directions)
- [x] d3 canvas
  - [x] bind and render text
  - [x] animate changes according to json
- [x] send text to server with jq + ajax
- [x] give json to d3 to bind, iterate through
- [x] loading modal
- [ ] share modal (https://dev.twitter.com/web/tweet-button https://developers.facebook.com/docs/sharing/web)
