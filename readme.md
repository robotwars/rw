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
 
}
```

The function is expected to return an object like:

```
{
  bearTo: 270,
  move: 1,
  aimTo: 90,
  useWeapon: "flame thrower"
}
```

## TODO:

- Make input for Robot needs
- Calc Game State Changes


