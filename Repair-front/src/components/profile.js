import React from 'react' ;
import axios from 'axios' ;
import Offers from './Offers' ;
import Crud from './Crud' ;
import TestCrud from './testCrud' ;
import {Link} from 'react-router-dom' ;
import {connect} from 'react-redux' ;
import { Motion, spring } from "react-motion";
class Profile extends React.Component {
state = {
crudState : false , // false mean 'create' || true mean 'update'
crudTitle : 'Create new offer',
crudBtn: 'create',
profile :{},
toogleState : false ,
btnText : '+ new offer',
load : false ,
y : 0 ,
updateOffer :{},
source : 'profile'
}
//<Crud apiCall={this.apiCall.bind(this)} id={this.props.match.params.id} history={this.props.history} onToogle={this.onToogle.bind(this)}/> :

componentDidMount(){
window.scrollTo(0,0)
this.apiCall(this.props.match.params.id)
}
apiCall(id){
  let newUrl = 'http://127.0.0.1:8000/api/profile/'+id+'/'
  let config = null
  if(localStorage.getItem('token')){
   config =  {headers: {Authorization : 'Bearer '+localStorage.getItem('token')}}}
axios.get(
newUrl,
config
).then(res => {this.setState({profile:res.data}); this.setState({load:true}); console.log(this.state.profile);}).catch(error => {console.log(error);})
}
onToogle(){

if(!this.state.toogleState){
this.setState({toogleState:!this.state.toogleState})
this.setState({crudState:false})
  this.setState({btnText:'forget'})}
else if(this.state.toogleState){
this.setState({toogleState:!this.state.toogleState})
this.setState({crudTitle:'Create the offer'})
this.setState({crudBtn:'create'})
  this.setState({btnText:'+ new offer'})
}
}
update(idx){
console.log(this.state.profile.offers[idx]);
this.setState({updateOffer:this.state.profile.offers[idx]})

this.setState({crudTitle:'Update the offer'})
this.setState({crudBtn:'update'})
this.onToogle()
this.setState({crudState:true})
}
delete(idx){
console.log(this.state.profile.offers[idx]);
let id = this.state.profile.offers[idx].id
let state = this.state
state.profile.offers.splice(idx,1)
this.setState({state:state})
let url ='http://127.0.0.1:8000/api/offer/'+id+'/' ;
let config =  {headers: {Authorization : 'Bearer '+localStorage.getItem('token')}} ;
axios.delete(
url,
config,
).then(res=>console.log(res.data))
}
clean(){
  this.setState({updateOffer:''})
}
render(){

if(this.state.profile.id && this.state.profile.id != this.props.match.params.id){
  this.apiCall(this.props.match.params.id)
}



console.log('there abd');
console.log(this.state.profile.offers);
  return(
<div class='container'>
<br/><br/><br/><br/>
<div class='row'>
<div class="offset-3 col-lg-6">
<center>

<img  src={this.state.profile.image} class="rounded-circle" height='150' width='150'  />
<h3 class='text-warning'>{this.state.profile.name}</h3>
<br/>
{
this.state.profile.id ?
this.state.profile.id == localStorage.getItem('profile_id') ?
<button class='btn btn-warning' onClick={this.onToogle.bind(this)}>{this.state.btnText}</button>
: <button class='btn btn-warning' >discover more </button> : null
}
<hr/><br/>
</center>
</div>
</div>
<Motion
defaultStyle={{ x: -200, opacity: 0 }}
style={{
  x: spring(0),
  opacity: spring(1)
}}>
{style =>(
<div
style={{
transform: `translateX(${style.x}px)`,
opacity: style.opacity
}}
>


{
this.state.toogleState && this.state.profile.image ?
<div>
<Crud crudBtn={this.state.crudBtn} crudTitle={this.state.crudTitle} crudState={this.state.crudState} clean={this.clean.bind(this)} updateOffer={this.state.updateOffer} apiCall={this.apiCall.bind(this)} id={this.props.match.params.id} history={this.props.history} onToogle={this.onToogle.bind(this)}/> :

</div>:
this.state.profile.offers ?
<Offers source={this.state.source} offers={this.state.profile.offers} update={(idx)=>{this.update(idx)}} delete={(idx)=>{this.delete(idx)}} />
 : null
}

</div>)}

</Motion>
</div>
)

}




}

export default Profile
