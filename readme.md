RW - Robot Wars

We are going to use ES6.

Install modules

```
npm install
```

Start server:

```
nf start
```

OR these two commands give you more information and live update the server.

```
make service
make asset
```

Start database in the project directory. We use rethinkdb.
```
rethinkdb
```

## Playing

Example of your robot code:

```
function(args){
  // Function which determines your actions

  // Return result
  return {
    bearTo: 270
  }; 
}
```

The function will receive args like:

```
{
  radar: {
    robots: [],
    walls: {
      0: 1,
      90: 14,
      180: 1,
      270: 14
    }
  },
  status: {
    health: 100
  } 
}
```

The function is expected to return an object like:

```
{
  bearTo: 270,
  move: 1,
  aimTo: 90,
  useWeapon: "flame",
  logs: []
}
```

## TODO:

- Make input for Robot needs
- Calc Game State Changes


