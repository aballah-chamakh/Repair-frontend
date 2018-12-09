const InitialState = {
  authentication : false ,
  username : ''
}
const Reducer = (state=InitialState,action)=>{
let newState = Object.assign({},state) ;
switch (action.type) {
case 'setUsername' :
newState.username  = action.username
case 'login':
console.log(' login now !!!! ');
newState.authentication = true ;
return newState ;
break;
case 'logout':
console.log(' logout now !!!! ');
newState.authentication = false ;
localStorage.clear() ;
return newState ;
break;
case 'created':
console.log(' created now !!!! ');
newState.toogle = true ;
return newState ;
break;
case 'forget':
console.log(' forget now !!!! ');
newState.toogle = false ;
return newState ;
break;
default :
return state ;
}}
export default Reducer ;
