# ezl.ink

A URL shortener that's easily deployed and implemented into your existing web app solutions.

## Setup

To implement _ezl.ink_ on your own server via Heroku, follow these setup instructions:

1. Clone this repo
2. Log into Heroku

```sh
$ heroku login
```

3. Go to Heroku and create a new app (_ex:_ named `ezl-ink`)
4. Add the Heroku repo as a remote to the repo

```sh
$ heroku git:remote -a ezl-ink
$ cd ezl-ink
```

5. Deploy your changes

```sh
$ git add .
$ git commit -am "message"
$ git push heroku master
```

Add mLab MongoDB to the Heroku repo's resources. It will be okay to just use the "Sandbox - Free" provision for this project.

Update DNS Records from your host (ex: Namecheap)

```diff
+ Type: CNAME Record    Host: @     Value: ${Heroku_DNS_Target}    TTL: 1 min
+ Type: URL Redirect Record     Host: www   Value: https://ezl.ink    Unmasked
```

## Built With

- [Express](URL) - Server
- [Cors](URL) - ...
- [Morgan](URL) - Logging
- [Monk](URL) - MongoDB Interface
- [Helmet](URL) - Security
- [Yup](URL) - Schema validation
-
