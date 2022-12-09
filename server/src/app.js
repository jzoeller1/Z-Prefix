const express = require('express');
const app = express();
const port = 8081;
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
//MEMBER CRUD -------------------------------------- //MEMBER CRUD
//get all members
app.get('/members', async (request, response) => {
  if (request.query.name === undefined) {
    try {
      let memberList = await knex.from('member').select('*')
      response.status(200).send(memberList);
    } catch (e) {
      console.log('Error in fetching items:', e);
    }
  } else {
    try {
      let memberList = await knex
        .select('member.id', 'first_name', 'last_name', 'username', 'password')
        .from('member')
      // .innerJoin('member', 'item.id', 'member.member.id')
      response.status(200).send(memberList);

    } catch (e) {
      console.log('Error in fetching members:', e);
    }
  }
})

//create a member
app.post('/members', async (request, response) => {
  const memberData = request.body;
  console.log(memberData)
  try {
    await knex('member')
      .insert({
        'id': memberData.id,
        'first_name': memberData.first_name,
        'last_name': memberData.last_name,
        'username': memberData.username,
        'password': memberData.password,
      })
      .then(response.send("I posted your stuff!"))
  } catch (e) {
    console.log('Error in adding member:', e);
  }
})

//delete a member by id number
app.delete('/members/:id', async (request, response) => {
  try {
    knex('member')
      .where('id', request.params.id)
      .del()
      .then(response.send('I deleted that member!'))
  }
  catch (e) {
    console.log('Error in deleting member:', e);
  }
})

//update certain properties of a member -- works but we run into an issue if we try to update the ID of the member due to foriegn key constraint
app.patch('/members/:id', async (request, response) => {
  console.log('Member patch has been called');
  const updatedid = parseInt(request.params.id);

  try {
    let updatedMember = {
      'id': request.body.id,
      'first_name': request.body.first_name,
      'last_name': request.body.last_name,
      'username': request.body.username,
      'password': request.body.password
    }
    console.log('Member Patch Requested: Patched Member');
    console.log('Member Patch Requested: Patched Member', updatedMember);
    let updatedMemberKnex = await knex('member').where('id', updatedid).update(updatedMember);
    response.status(200).send('Member Updated!')

  } catch (e) {
    console.log('Error in patching member:', e);

  }
})

//update an entire member record
app.put('/members/:id', async (request, response) => {
  const updatedId = parseInt(request.params.id);

  try {
    let updatedMember = {
      ...request.body
    }
    let updatedMemberKnex = await knex('member')
      .where('id', updatedId).update({
        id: updatedMember.id,
        first_name: updatedMember.first_name,
        last_name: updatedMember.last_name,
        username: updatedMember.username,
        password: updatedMember.password
      });
    response.status(200).send('Member Updated')
  }
  catch (e) {
    console.log('Error in updating Member:', e);
  }
})

//ITEM CRUD ---------------------------------------- //ITEM CRUD
//get all items
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

//create an item
app.post('/items', async (request, response) => {
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

//delete an item by id number
app.delete('/items/:id', async (request, response) => {
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

//update certain properties of an item
app.patch('/items/:id', async (request, response) => {
  console.log('Item patch has been called');
  const updatedid = parseInt(request.params.id);

  try {
    let updatedItem = {
      'id': request.body.id,
      'item_name': request.body.item_name,
      'description': request.body.description,
      'quantity': request.body.quantity,
      'member_id': request.body.member_id,
    }
    console.log('Item Patch Requested: Patched Item');
    console.log('Item Patch Requested: Patched Item', updatedItem);
    let updatedItemKnex = await knex('item').where('id', updatedid).update(updatedItem);
    response.status(200).send('Item Updated!')

  } catch (e) {
    console.log('Error in patching item:', e);

  }
})

//update an entire item
app.put('/items/:id', async (request, response) => {
  const updatedId = parseInt(request.params.id);

  try {
    let updatedItem = {
      ...request.body
    }
    // console.log('Put Item', updatedItem);
    let updatedItemKnex = await knex('item')
      .where('id', updatedId).update({
        id: updatedItem.id,
        item_name: updatedItem.item_name,
        description: updatedItem.description,
        quantity: updatedItem.quantity,
        member_id: updatedItem.member_id,
      });
    response.status(200).send('Item Updated')
  }
  catch (e) {
    console.log('Error in updating Item:', e);
  }
})