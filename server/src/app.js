const express = require('express');
const app = express();
const port = 8084;
const knex = require('knex')(require('../knexfile.js')["development"]);
const cors = require('cors');
app.use(express.json());
app.use(cors());

app.get('/', (request, response) => {
  response.send('Application up and running.')
})

app.listen(port, () => {
  console.log('Your knex and express application are running succesfully')
})

app.get('/members', (request, response) => {
  knex('member')
    .select('*')
    .then(members => {
      var memberNames = members.map(member => member.first_name)
      response.json(memberNames)
    })
})

app.get('/items', async (request, response) => {
  // console.log(request.query)
  if (request.query.name === undefined) {
    try {
      let itemList = await knex.from('item').select('*')
      response.status(200).send(itemList);
    } catch (e) {
      console.log('Error in fetching items:', e);
    }
  } else {
    try {
      let itemList = await knex
      .select('item.id', 'item_name', 'description', 'quantity', 'member_id')
      .from('item')
      .innerJoin('member', 'item.id', 'member.member.id')
      response.status(200).send(itemList);

    } catch (e) {
      console.log('Error in fetching items:', e);
    }
  }
})

