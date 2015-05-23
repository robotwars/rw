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


Example of your robot code
```
function(){
    // Function which determines your actions

    // Return result
 	return {bearTo: 270}; 
}
```

The JSON which we are ending up with in the return will be;
```
{
  bearTo: 270,
  move: 1,
  aimTo: 90,
  useWeapon: "flame thrower"
}
```
