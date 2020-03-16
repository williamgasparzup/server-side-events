# Server side events

This project was made verify the behavior of some notification Server-Side Event implementation with React.

## Getting Started

Get started by cloning this repo:

```
https://github.com/williamgasparzup/server-side-events.git
```

Then go to the project root folder:

```
cd server-side-events
```

### Prerequisites

In order to make this project run properly, you need to have Yarn installed:

```
npm global add yarn
```

### Installing

Install all dependencies:

```
yarn
```

## Running the application

This monorepo provides both the server and the client.

To take both server and client up and running, just run this on the project root folder:

```
yarn start
```

If you want only to take the client up and running, you can run:

```
yarn start:client
```

To set a custom URL to the client, you can set it by an env var called `REACT_APP_ENDPOINT` (at `./packages/client/.env`), for example:

```
REACT_APP_ENDPOINT='my custom URL here'
```

And then run the `yarn start:client` command.

After thar, the client will be available at the address https://localhost:3000.

IMPORTANT: If you use a custom URL, you must provide and endpoint that returns an object in the following format:

```ts
{
    id: string | number,
    unread: boolean,
    date: string, // Some Date in the ISO String format,
    text: string,
    user: {
        image?: string,
        name: string
    }
}
```

## Authors

* **William Rozin Gaspar** - *Initial work* - [Profile](https://github.com/williamgasparzup)

See also the list of [contributors](https://github.com/williamgasparzup/server-side-events/graphs/contributors) who participated in this project.

