import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
class ResetName extends React.Component {
state = {
  profile :{  username: {val:'',msg:''},
              about :   {val:'',msg:''},
              number :     {val:'',msg:''}
            }
  ,
  filledProfile : false ,

}
componentDidMount(){
  //this.setState({profile: this.props.profile})
  // console.log('log the profile');
  // console.log(this.props.profile);
  // let profile = {username:{val:this.props.profile.name,msg:''},
  //                about : {val:this.props.profile.about,msg:''},
  //                num : {val:this.props.profile.num,msg:''}}
  // this.setState({profile:profile})
}
change  =(e,field)=>{
  switch (field) {
    case 'username':
    this.setState({profile:{...this.state.profile,username:{val:e.target.value,msg:''}}})
    break;
    case 'about':

    this.setState({profile:{...this.state.profile,about:{val:e.target.value,msg:''}}})
    break;
    case 'number' :
    console.log(e.target.value);
   if(e.target.value[e.target.value.length - 1] in ['0','1','2','3','4','5','6','7','8','9'] || e.target.value == ''){
     if(e.target.value.length <= 8){
    this.setState({profile:{...this.state.profile,number:{val:e.target.value,msg:''}}})
  }
  }
}
}
validity = (field)=>{
  let value = this.state.profile[field].val
  let profile = this.state.profile
  if (field == 'username' && field == ''){
    profile[field].msg = 'this field is required '
  }
  if ( field == 'username' &&  value.length < 3 ){
    if(value.length == 0 ){
      profile[field].msg = 'this field is required '
    }else{
    profile[field].msg = 'at least you need to enter 3 characters for your name'
  }
  }
  if(field == 'number' && value.length != 8 ){
      profile[field].msg = 'you should pass 8 numbers'
  }
  return profile
}
submit = ()=>{
  let fields = ['username','number']
  fields.map(field=>{
    let profile = this.validity(field)
    console.log('log the message of field '+field);
    console.log(profile[field].msg);
    if(profile[field].msg){
    this.setState({profile:profile})
  }
  })
  if (this.state.profile['username'].msg == '' || this.state.profile['number'].msg == ''){
    console.log('there are no error so we gona submit now');
    let url = 'http://127.0.0.1:8000/api/profile/'+localStorage.getItem('profile_id')+'/reset_info/'
    let form = {username:this.state.profile.username.val,
                about:this.state.profile.about.val,
                phone:this.state.profile.number.val}
    let config =  {headers: {Authorization : 'Bearer '+localStorage.getItem('token')}} ;
    axios.put(url,form,config).then(res=>{
      let oldUsername = localStorage.getItem('username')
      let newUsername = this.state.profile.username.val
       if(newUsername != oldUsername){
         this.props.setUsername(newUsername)
         this.props.reloadProfile()
         localStorage.setItem('username',newUsername)
       }
    })
  }
}
resetInfo = ()=>{

    let url = 'http://127.0.0.1:8000/api/profile/'+localStorage.getItem('profile_id')+'/reset_info/'
    let config =  {headers: {Authorization : 'Bearer '+localStorage.getItem('token')}}
    let form = {
    "username" : this.state.profile.username.val ,
    "about": this.state.profile.about.val,
    "phone": this.state.profile.number.val,
    }
    axios.put(url,config).then(res=>{this.props.reloadProfile() ;
      let oldUsername = localStorage.getItem('username')
      let newUsername = this.state.profile.username.val
       if(newUsername != oldUsername){
         this.props.setUsername(newUsername)
         localStorage.setItem('username',newUsername)
       }
       })

}


  render(){
    console.log('log profile');
    console.log(this.state.profile.number);
    if (this.props.profile != null  && this.state.filledProfile == false){
      let profile = { username:{val:this.props.profile.name,msg:''},
                      about : {val:this.props.profile.about,msg:''},
                      number : {val:this.props.profile.phone,msg:''},

                    }
      let state = this.state
      state.profile = profile
      state.filledProfile = true
      this.setState({state:state})
    }
    return(
      <div class='row'>
      <div class='col-sm-6 offset-3'>
      <div class='form-group row'>
      <label for="username" class="col-sm-3 col-form-label">Username</label>
      <div class='col-sm-9'>
      <input type='text' ref={usernameField=>this.usernameField=usernameField} onChange={(e)=>{this.change(e,'username')}} value={this.state.profile.username.val}  id='username' class={this.state.profile.username.msg ? 'form-control is-invalid' : 'form-control'} placeholder='reset your username' />
      <div class="invalid-feedback">
            {this.state.profile.username.msg}
      </div>
      </div>
      </div>
      <div class='form-group row'>
      <label for="about" class="col-sm-3 col-form-label">About</label>
      <div class='col-sm-9'>
      <textarea type='text' ref={aboutField=>this.aboutField=aboutField}  id='about' onChange={(e)=>{this.change(e,'about')}} value={this.state.profile.about.val} class={this.state.profile.about.msg ? 'form-control is-invalid' : 'form-control'} placeholder='reset your username' />
      <div class="invalid-feedback">
            {this.state.profile.about.msg}
      </div>
      </div>
      </div>
      <div class='form-group row'>
      <label for="num" class="col-sm-3 col-form-label">Phone Number</label>
      <div class='col-sm-9'>
      <input type='text' ref={numField=>this.numField=numField} value={this.state.profile.number.val} onChange={(e)=>{this.change(e,'number')}}  id='num' class={this.state.profile.number.msg ? 'form-control is-invalid' : 'form-control'} placeholder='reset your username' />
      <div class="invalid-feedback">
            {this.state.profile.number.msg}
      </div>
      </div>
      </div>
      <center><button class='btn btn-warning' onClick={this.submit}>reset username</button></center>
      </div></div>
    )
  }
}
const mapDispatchToProps = (dispatch)=>{
  return {
  setUsername : (username)=>dispatch({type:'setUsername',username:username})
}}
export default connect(null,mapDispatchToProps)(ResetName) ;
