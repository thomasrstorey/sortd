# sortd
a web app for sorting out your problems

## development roadmap

### backend

- [x] receive string, output steps, with all text, as json
- [ ] save steps to retrieveable json file
  - [ ] generate unique hash for each set of steps and text
- [ ] send json according to received hash
- [ ] send json after generating steps (callback for saving should call the send function using the hash)

### frontend

- [ ] basic template (handlebars, css)
- [ ] individual page layouts
  - [ ] landing (100% width, big pictures)
  - [ ] about (me pic, bio)
  - [ ] sort (d3 canvas, text directions, next/back, stage directions)
- [ ] d3 canvas
  - [ ] bind and render text
  - [ ] animate changes according to json
- [ ] send text to server with jq + ajax
- [ ] give json to d3 to bind, iterate through
- [ ] loading modal
- [ ] share modal (https://dev.twitter.com/web/tweet-button https://developers.facebook.com/docs/sharing/web)
