import React from 'react' ;
import {Route} from 'react-router-dom' ;
import ResetPassword from './ResetPassword' ;
import ResetName from './ResetName' ;
import ResetImage from './ResetImage' ;
import axios from 'axios' ;

class AccountSettings extends React.Component {
  state ={
      profile : null ,
     // profile : {name:'',image:'',about:'',phone:''}
    // fields = ('id','url','name','image','about','phone')
  }
  componentDidMount(){
    let url = 'http://127.0.0.1:8000/api/simple-profile/'+localStorage.getItem('profile_id')
    axios.get(url,).then(res=>this.setState({profile:res.data}))
  }
  reloadProfile =()=>{
    let url = 'http://127.0.0.1:8000/api/simple-profile/'+localStorage.getItem('profile_id')
    axios.get(url,).then(res=>this.setState({profile:res.data}))
  }
  render(){
    return(
      <div class='container'>
      <br/><br/><br/><br/>
      <div class='row'>
         <div class="offset-3 col-lg-6">
           <center>
            { this.state.profile ?
              <span>
              <img  src={this.state.profile.image} class="rounded-circle" height='150' width='150'  />
             <h3 class='text-warning'>{this.state.profile.name}</h3>
             <br/>
             <hr/>
             <br/>
             </span>
             : null}
            </center>
          </div>
      </div>
      <div>

         <Route path='/reset/password/' component={ResetPassword} />
         <Route path='/reset/username' render={()=>(<ResetName reloadProfile={this.reloadProfile} profile={this.state.profile}/>)} />
         <Route path='/reset/image' render={()=>(<ResetImage image={this.state.profile ? this.state.profile.image : ''} reloadProfile={this.reloadProfile} />)} />
      </div>
      </div>
    )
  }
}
export default AccountSettings
