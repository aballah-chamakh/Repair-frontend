import React from 'react' ;
import {Link} from 'react-router-dom' ;
import ResetPassword from './ResetPassword' ;
import {connect} from 'react-redux' ;
import {Modal} from 'react-bootstrap-modal' ;
// <button class = 'btn btn-warning'
// onClick={()=>{props.logout(); props.Myprops.history.push('/home'); }}>logout</button>
import {withRouter} from 'react-router-dom'
class AuthNav extends React.Component{

state = {
  modal : ''
}
render(){
  console.log('here');
console.log(this.props);
return(
  <div>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
       <div class="container">
         <Link class="navbar-brand" to='/home'>Repair</Link>
         <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
           <span class="navbar-toggler-icon"></span>
         </button>
         <div class="collapse navbar-collapse" id="navbarResponsive">
           <ul class="navbar-nav ml-auto">
             <li class="nav-item active">
               <Link class="nav-link" to='/home'>Home
                 <span class="sr-only">(current)</span>
               </Link>
             </li>
             <li class="nav-item">
               <Link class="nav-link" onClick={()=>{console.log('go somewere');}} to={'/profile/'+localStorage.getItem('profile_id')}>{this.props.username ? this.props.username : localStorage.getItem('username')}</Link>
             </li>
             <li class="nav-item">
             <div class="dropdown">
  <button class="btn btn-warning dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Settings
  </button>
  <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu2">
    <button onClick={()=>{this.props.history.push('/reset/password')}} class="dropdown-item" type="button" >change password</button>
    <button onClick={()=>{this.props.history.push('/reset/username')}} class="dropdown-item" type="button" >change name</button>
    <button onClick={()=>{this.props.history.push('/reset/image')}} class="dropdown-item" type="button" >change profile image</button>
    <div class="dropdown-divider"></div>
    <button class="dropdown-item" type="button" onClick={()=>{this.props.logout();this.props.history.push('/home');}}>logout</button>
  </div>
</div>
           </li>
           </ul>
         </div>
       </div>
     </nav></div>
)
}
}
const mapStateToProps = (state)=>{
  return{
    username : state.username
  }

}
const mapDispatchToProps = (dispatch)=>{
return{
  logout : () => dispatch({type:'logout'}),
}
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(AuthNav)) ;
