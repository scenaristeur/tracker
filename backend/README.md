# make the habit file
rename habits_example.json to habits.json

# install
`npm install
node serser.js` 


# tuto

https://theonlytutorials.com/node-js-express-crud-example-storing-data-in-json-file/?expand_article=1

# routes CRUD

- create /habit/add
- read /habit/list
- update /habit/update/:habit_id
- delete /habit/delete/:habit_id

# habit schema

[
{
"habit_id": 1,
"title": "marche au Grand Bornand",
"category":"agurchand",
"begin":"10/12/2023",
"end":"12/12/2023",
"goal":"33 km",
"notes": "ne pas oublier la tente"
},
{...}
]

cat : velo, marcher, nager
