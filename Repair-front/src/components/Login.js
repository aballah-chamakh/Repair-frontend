import React from 'react' ;
import Input from '../Ui/Input' ;
import { Motion, spring } from "react-motion";
import {ChangeHandler,CheckValidity} from '../Shared/FormFunc' ;
import {connect} from 'react-redux' ;
import axios from 'axios' ;
class Login extends React.Component{
state = {
  error : false ,
  errorText : '',
  form:{
    email : {
      type :'input',
      inputConfig:{type:'text',placeholder:'enter your email'},
      props : {
        field:'email',
        label:'Email',
        value : '',
        msg:'',
        validators :{required:true,email:true},
        isValid : false,
        classes : 'form-control',

      }
    },
    password : {
      type :'input',
      inputConfig:{type:'password',placeholder:'enter your password'},
      props : {
        field:'password',
        label:'Password',
        value:'',
        msg:'',
        validators :{required:true},
        isValid : false,
        classes : 'form-control',
      }
    }
  }
}
change(event,field){
  if (this.state.error){
  this.setState({error:false})
    this.setState({errorText:false})}
let state = ChangeHandler(event,this.state,field)
this.setState({state:state})
console.log(this.state.form[field].props.value);
}
valid(){
  console.log('check validity now ..');
  let fields = ['email','password']
  fields.map(field=>{
    let payload = CheckValidity(this.state,field)
    console.log(payload);
    if(!payload.isValid){ this.setState({state:payload.state}) }
  })
  console.log(this.state.form);
let emailValidity    = this.state.form.email.props.isValid ;
let passwordValidity = this.state.form.password.props.isValid ;
if (emailValidity && passwordValidity){
console.log("we gone log right now");
let credantial = {email : this.state.form.email.props.value,password:this.state.form.password.props.value}
let url = 'http://127.0.0.1:8000/api/token'
axios.post(
url,
credantial,
).then( response => {
  localStorage.setItem('token',response.data.access)

  console.log(response.data.access);
  let newUrl = 'http://127.0.0.1:8000/api/user/'
  let config =  {headers: {Authorization : 'Bearer '+response.data.access}}
axios.get(
newUrl, 
config,
).then(response => {

    localStorage.setItem('user_id',response.data[0].id)
    localStorage.setItem('profile_id',response.data[0].profileId)
    localStorage.setItem('username',response.data[0].username)
    localStorage.setItem('email',response.data[0].email)
    this.props.login()
    this.props.history.push('/profile/'+localStorage.getItem('profile_id'))



});
} ).catch(error =>{ console.log(error); this.setState({error:true}) });

}

}
render(){
  let form =[]
  for (let field in this.state.form){
    form.push({type:this.state.form[field].type,inputConfig:this.state.form[field].inputConfig,props:this.state.form[field].props})
  }
return(
<Motion
defaultStyle={{ y: -200, opacity: 0 }}
style={{
  y: spring(10),
  opacity: spring(1)
}}
>
{ style => (
<div
style={{
transform: `translateY(${style.y}px)`,
opacity: style.opacity
}}
>
<br/><br/><br/>

<br/><br/><br/>
<center><h1 class='text-warning'>Login Now !</h1></center>

<br/>
<div class='offset-3 col-lg-6'>
{ this.state.error ?
<div class="alert alert-danger" role="alert">
<center>your email or password are not correct</center>
</div> : null }
{form.map(field=>(
<Input inputConfig={field.inputConfig}
type ={field.type}
value = {field.props.value}
classes={field.props.classes}
option={field.props.options}
label = {field.props.label}
msg = {field.props.msg}
changed = {(event)=>{this.change(event,field.props.field)}}
/>
))}
<center><button onClick={this.valid.bind(this)} class='btn btn-warning'>login</button></center>
</div>
</div>)}
</Motion>
)
}

}
const mapDispatchToProps = (dispatch)=>{
return{
  login : () => dispatch({type:'login'}),
}
}
export default connect(null,mapDispatchToProps)(Login) ;
