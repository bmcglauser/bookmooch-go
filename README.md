# Welcome to BookMooch Go
BookMooch Go is a mobile-optimized portal for BookMooch.com, a successful global book-swapping site with over 300,000 registered users. Currently the site has no user-friendly option for mobile, and I wanted to fix that :)

*Tech stack: React, TypeScript, Sass, GraphQL with Apollo, JWT, and BookMooch's own public API exposing their MySQL database*

Check out a demo here:
https://www.youtube.com/watch?v=C0VSxuoIxmM

<img width="849" alt="Screen Shot 2020-12-12 at 9 46 03 AM" src="https://user-images.githubusercontent.com/25126281/101980903-c126bb00-3c60-11eb-9715-b055f6fd73d5.png">

## Getting Started
If you're interested in getting BookMooch Go up and running on your own machine, follow the steps below and you'll be able to use your own BookMooch account:

**note: you must have Docker and docker-compose installed to follow the steps below**

1. Clone this repo onto your computer with `git clone https://github.com/bmcglauser/bookmooch-go`
2. Enter the directory with `cd bookmooch-go`
3. Run `npm run build-images && docker-compose up` to create images for the client and server containers and launch them on ports 3000 and 4000 respectively
4. Open a browser window in Chrome and access the developer tools, selecting a mobile device view (I designed on iPhone X)
5. Navigate to localhost:3000

Enjoy!

## Contributors
- Founder/Lead developer: Brett Glauser - [GitHub profile](https://www.github.com/bmcglauser)
- Developer: Mohamed Yusuf - [GitHub profile](https://www.github.com/mhyusuf)
- Developer: Matthew Hurst - [GitHub profile](https://www.github.com/Matt-Hurst)

*moving forward:*
- test coverage is expanding, primarily using React Testing Library and Apollo Testing Library
- deployment of demo version on Heroku to come

*bug notes:*
- The user registration feature is only accessible with an app-key from Bookmooch, and they have not responded to my inqueries, so at the moment the feature is unavailable.
