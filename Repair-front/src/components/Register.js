import React from 'react' ;
import Input from '../Ui/Input' ;
import axios from 'axios' ;
import { Motion, spring } from "react-motion";
import {ChangeHandler,CheckValidity} from '../Shared/FormFunc' ;
class Register extends React.Component{
state = {
  error : false ,
  form:{
    email : {
      type :'input',
      inputConfig:{type:'text',placeholder:'enter your email'},
      props : {
        field:'email',
        label:'Email',
        msg:'',
        value : '',
        validators :{required:true,email:true},
        isValid : true,
        classes : 'form-control',

      }
    },
    username : {
      type :'input',
      inputConfig:{type:'text',placeholder:'enter your username'},
      props : {
        field:'username',
        label:'Username',
        value : '',
        msg:'',
        validators :{required:true},
        isValid : true,
        classes : 'form-control',

      }
    },
    password : {
      type :'input',
      inputConfig:{type:'password',placeholder:'enter your password'},
      props : {
        field:'password',
        label:'Password',
        value : '',
        msg:'',
        validators :{required:true},
        isValid : false,
        classes : 'form-control',

      }
    },
    password2 : {
      type :'input',
      inputConfig:{type:'password',placeholder:'confirm password'},
      props : {
        field:'password2',
        label:'Password2',
        value : '',
        msg:'',
        validators :{required:true,passwordMatch:true},
        isValid : false,
        classes : 'form-control',

      }
    },
  }
}
change(event,field){
let state = ChangeHandler(event,this.state,field)
this.setState({state:state})
console.log(this.state.form[field].props.value);
}
valid(){
  let fields = ['email','username','password','password2']
  let payload = null
  fields.map(field=>{
     payload = CheckValidity(this.state,field)
    console.log(payload);
    if(!payload.isValid){  console.log(payload.state); this.setState({state:payload.state}) }
  })
  if(payload.state.form.email.props.isValid && payload.state.form.username.props.isValid && payload.state.form.password.props.isValid && payload.state.form.password2.props.isValid){
    let form = { email:payload.state.form.email.props.value,
                 username:payload.state.form.username.props.value,
                 password:payload.state.form.password.props.value,
                 password2:payload.state.form.password2.props.value }
    let url = 'http://127.0.0.1:8000/api/user/'

    axios.post(url,form).then(response=>{

      this.props.history.push('/login/')

    })
  //  console.log(this.state.form);
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
 {style => (
<div
style={{
transform: `translateY(${style.y}px)`,
opacity: style.opacity
}}
>
<br/><br/><br/><br/><br/><br/>
<center><h1 class='text-warning'>Register Now !</h1></center>
<br/>
<div class='offset-3 col-lg-6'>
{form.map(field=>(
  <div>
<Input inputConfig={field.inputConfig}
type ={field.type}
value = {field.props.value}
classes={field.props.classes}
option={field.props.options}
label = {field.props.label}
msg = {field.props.msg}
changed = {(event)=>{this.change(event,field.props.field)}}
/>
<h1>{field.value}</h1>
</div>
)
)}
<center><button onClick={this.valid.bind(this)} class='btn btn-warning'>login</button></center>
</div>
</div>)}
</Motion>
)
}

}
export default Register ;
