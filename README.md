# Welcome to BookMooch Go
BookMooch Go is a mobile-optimized portal for BookMooch.com, a successful global book-swapping site with over 300,000 registered users. Currently the site has no user-friendly option for mobile, and I wanted to fix that :)

*Tech stack: React, TypeScript, Sass, GraphQL with Apollo, JWT, and BookMooch's own public API exposing their MySQL database*

Check out a demo here:
https://www.youtube.com/watch?v=C0VSxuoIxmM&t=2s

<img width="849" alt="Screen Shot 2020-12-12 at 9 46 03 AM" src="https://user-images.githubusercontent.com/25126281/101980652-ce42aa80-3c5e-11eb-81d3-5b4fae351b8c.png">

## Getting Started
If you're interested in getting BookMooch Go up and running on your own machine, follow the steps below and you'll be able to use your own BookMooch account:

1. Clone this repo onto your computer:
- `git clone https://github.com/bmcglauser/bookmooch-go`
2. Enter the directory:
- `cd bookmooch-go`
3. Install back-end dependencies with `cd server && npm install` and create your own .env file in the server folder with this single line of code:
- `JWT_SECRET=somestring`
4. Start the server, using localhost:4000 with `npm run start`
- on success, you should get a console output of `🚀 Server ready at http://localhost:4000/`
5. Open another terminal in the directory and do the same for the client with `cd client && npm install`
- (if you plan on using your real BookMooch account to request books, follow the .env.example file in your own .env file within the client folder. It is fine to skip this step)
- run `npm run start`
6. A window will automatically open with the client, but in a distorted desktop view. Open the developer tools.
7. Select 'Toggle device toolbar' from the Elements tab, in the upper left of the panel. Select a mobile device at the top of the window (I designed using iPhone X).
8. Navigate away from localhost to any other page. Return to localhost:3000 *using the address bar* - please note clicking 'Back' to return will not prompt the browser to automatically resize.
9. You should now see the app in the correct proportion and are now ready to explore the full extent of Bookmooch Go. Enjoy!

## Authors
- Founder/Lead developer: Brett Glauser - [GitHub profile](https://www.github.com/bmcglauser)
- Developer: Mohamed Yusuf - [GitHub profile](https://www.github.com/mhyusuf)
- Developer: Matthew Hurst - [GitHub profile](https://www.github.com/Matt-Hurst)
