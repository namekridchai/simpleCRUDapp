const express = require('express');
const methodOverride = require('method-override')
const app = express();
const port = 3000;
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'));
const { v4: uuidv4 } = require('uuid');


app.post('/tacos', (req, res) => {
   const {meat,qty} = req.body;
    res.send(`${meat}  ${qty}`);
  })

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})

app.get('/comments',(req,res) =>{
  res.render('comments/index',{comments});
})

app.post('/comments',(req,res) =>{
  const {name,comment} = req.body;
  comments.push({name,comment,id:uuidv4()});
  res.redirect('comments');
})

app.get('/comments/new',(req,res) =>{
  res.render('comments/new');
})

app.get('/comments/:id/edit',(req,res) =>{
  const {id} = req.params;
  const comment = comments.find(c=>c.id===id);
  res.render('comments/edit',{comment});
})

app.get('/comments/:id',(req,res) =>{
  const {id} = req.params;
  const comment = comments.find(c=>c.id===id);
  if(comment)
    res.render('comments/show',{comment});
  else
     res.render('comments/index',{comments});
})

app.patch('/comments/:id',(req,res) =>{
  const {id} = req.params;
  const newComment = req.body.comment;
  const comment = comments.find(c=>c.id===id);
  console.log(comment);
  comment.comment = newComment;
  res.redirect('comments');
})

app.delete('/comments/:id',(req,res) =>{
  const {id} = req.params;
  console.log(id);
  console.log('delete');
  comments = comments.filter(c=>c.id!==id);
  res.redirect('comments');
})



let comments = [
  {
    id:uuidv4(),
    name:'todd',
    comment:'It\'s funny'
  },
  {
    id:uuidv4(),
    name:'hehehe',
    comment:'I Love YoYo'
  }
]

