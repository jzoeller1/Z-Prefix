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

app.post('/items', async(request, response) => {
  const itemData = request.body;
  console.log(itemData)
  try {
      await knex('item')
      .insert({
      'id': itemData.id,
      'item_name': itemData.item_name,
      'description': itemData.description,
      'quantity': itemData.quantity,
      'member_id': itemData.member_id,
      })
      .then(response.send("I posted your stuff!"))
  } catch (e) {
      console.log('Error in adding item:', e);
  }
})

app.delete('/items:id', async(request, response) => {
  try {
      knex('item')
      .where('id', request.params.id)
      .del()
      .then(response.send('I deleted that item.'))
  }
  catch (e) {
      console.log('Error in deleting item:', e);
  }
})

// app.put('/items:id', async(request, response) => {
//   const updatedId = parseInt(request.params.id);

//   try{
//       let updatedItem = {
//           ...request.body
//       }
//       // console.log('Put Item', updatedItem);
//       let updatedItemKnex = await knex('item')
//       .where('id', updatedId).update({
//           id: updatedItem.id,
//           item_name: updatedItem.item_name,
//           description: updatedItem.description,
//           quantity: updatedItem.quantity,
//           member_id: updatedItem.member_id,
//       });
//       response.status(200).send('Item Updated')
//   }
//   catch (e) {
//       console.log('Error in updating Item:', e);
//   }
// })