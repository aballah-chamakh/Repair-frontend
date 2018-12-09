import React from 'react' ;
import Input from '../Ui/Input' ;
import {ChangeHandler,CheckValidity} from '../Shared/FormFunc' ;
import axios from 'axios' ;
import { Motion, spring } from "react-motion";
import {connect} from 'react-redux' ;
import './styleOffers.css' ;
class Crud extends React.Component {
state = {
url  :'',
id : null ,
form : {
  image : {
    type :'fileInput',
    inputConfig:{type:'file'},
    props : {
      field:'image',
      label:'Image',
      value : '',
      msg:'',
      validators :{required:true},
      isValid : true,
      classes : 'previewImageSuccess',
      imageUrl : '',

    }
  },
  title : {
    type :'input',
    inputConfig:{type:'text',placeholder:'enter title'},
    props : {
      field:'title',
      label:'title',
      msg:'',
      value : '',
      validators :{required:true},
      isValid : true,
      classes : 'form-control',

    }
  },
  description : {
    type :'textarea',
    inputConfig:{type:'textarea',placeholder:'enter a description for your service'},
    props : {
      field:'description',
      label:'Description',
      value : '',
      msg:'',
      validators :{required:true},
      isValid : true,
      classes : 'form-control',

    }
  },

  categorie : {
    type :'select',
    inputConfig:{type:'',placeholder:'enter your password'},
    props : {
      options : ['categorie','web development','web designe'],
      field:'categorie',
      label:'Categorie',
      value : 'categorie',
      msg:'',
      validators :{required:true},
      isValid : true,
      classes : 'form-control',


    }
  }



}

}
change(event,field){

let state = ChangeHandler(event,this.state,field)
this.setState({state:state})
console.log(this.state.form[field].props.value);
console.log(this.state.form.image.props.imageUrl);
}
submit(){
console.log('we submit now');
  let fields = ['image','title','description','categorie']
  fields.map(field=>{
    let payload = CheckValidity(this.state,field)
    console.log(payload);
    if(!payload.isValid){ this.setState({state:payload.state}) }
  })
let titleValidity = this.state.form.title.props.isValid
console.log(titleValidity);
let imageValidity = this.state.form.image.props.isValid
console.log(imageValidity);
let descriptionValidity = this.state.form.description.props.isValid
console.log(descriptionValidity);
let categorieValidity = this.state.form.categorie.props.isValid
console.log(categorieValidity);
if(titleValidity && imageValidity && descriptionValidity && categorieValidity){
let url ='http://127.0.0.1:8000/api/offer/' ;
let config =  {headers: {Authorization : 'Bearer '+localStorage.getItem('token')}} ;
let formData = new FormData()

formData.append('title',this.state.form.title.props.value)
if (this.state.form.image.props.value != this.state.form.image.props.imageUrl){
console.log(' they dont match');
formData.append('image',this.state.form.image.props.value)}
formData.append('description',this.state.form.description.props.value,)
formData.append('categorie',this.state.form.categorie.props.value)
console.log('check the id ==========================');
console.log(this.state.id);
switch (this.props.crudState) {
  case true:

console.log('we gonna update now ');
url ='http://127.0.0.1:8000/api/offer/'+this.state.id+'/'
axios.put(
url,
formData,
config,
).then(res => {
console.log(res.data);
this.props.apiCall(this.props.id)
this.props.onToogle()
this.props.history.push('/profile/'+this.props.id+'/')
})
    break;
  case false:
  console.log(' we gonna create ');
  axios.post(
  url,
  formData,
  config,
  ).then(res => {
  console.log(res.data);
  this.props.apiCall(this.props.id)
  this.props.onToogle()
  this.props.history.push('/profile/'+this.props.id+'/')
  })
    break;

}}else{
console.log('the are some validity problem');
}



}
updateForm(){
    let state = this.state ;
console.log(this.props.updateOffer.id);
    state.form.title.props.value = this.props.updateOffer.title
    state.form.description.props.value = this.props.updateOffer.description
    state.form.image.props.imageUrl = this.props.updateOffer.image
state.form.image.props.value = this.props.updateOffer.image
    state.form.categorie.props.value = this.props.updateOffer.categorie
    this.setState({state:state})
}

render(){
window.scrollTo(0,200)
if(this.props.updateOffer){
  this.updateForm()
  this.setState({id:this.props.updateOffer.id})
  this.props.clean()
}
  let form =[ ]

  for (let field in this.state.form){
    form.push({type:this.state.form[field].type,inputConfig:this.state.form[field].inputConfig,props:this.state.form[field].props})
  }

  return(
    <div>
<div wlass='row'>
<center><h2 class='text-secondary text-aligne'>{this.props.crudTitle}</h2></center>
<br/><br/>
</div>
<div class='row'>


<div class='offset-1 col-lg-4'>
{form.map(field=>{
if(field.type == 'fileInput'){
  return(

<Input inputConfig={field.inputConfig}
type ={field.type}
value = {field.props.value}
classes={field.props.classes}
options={field.props.options}
label = {field.props.label}
msg = {field.props.msg}
imageUrl ={field.props.imageUrl}
changed = {(event)=>{this.change(event,field.props.field)}}
/>
)}})


}
</div>
<div class=' col-lg-6'>
<br/><br/><br/><br/>
{form.map(field=>{
  if(field.type != 'fileInput'){
  return(

<Input inputConfig={field.inputConfig}
type ={field.type}
value = {field.props.value}
classes={field.props.classes}
options={field.props.options}
label = {field.props.label}
msg = {field.props.msg}
imageUrl ={field.props.imageUrl}
changed = {(event)=>{this.change(event,field.props.field)}}
/>
)}})


}
<center><button class='btn btn-secondary' onClick={this.submit.bind(this)}>{this.props.crudBtn}</button></center>
</div>
</div>

</div>


)

}
}

export default Crud ;
