import React from 'react'  ;
import HomeLayout from './HomeLayout' ;
import Header from '../components/header' ;
import Login from '../components/Login' ;
import Register from '../components/Register' ;
import Profile from '../components/profile' ;
import FullOffer from '../components/FullOffer' ;
import {Route,Switch,Redirect,withRouter} from 'react-router-dom' ;
import AccountSettings from '../components/AccountSettings' ;
import PageNotFound from '../components/PageNotFound' ;
import Blog from '../components/Blog' ;
import {connect} from 'react-redux'
class MajorLayout extends React.Component {


componentDidMount = ()=>{
  if (localStorage.getItem('user_id') && localStorage.getItem('user_id') != this.props.authentication){
    this.props.login()
  }
}

render(){

return(
<div>
<Header />
<Switch>
<Route path='/home' exact   component={HomeLayout}/>
<Route path='/login' exact  component={Login}/>
<Route path='/register' exact  component={Register}/>
<Route path='/profile/:id' exact  component={Profile}/>
<Route path='/offer/:id' exact  component={FullOffer}/>
<Route path='/reset'   component={AccountSettings}/>
<Route path='/reset-username' exact  component={Login}/>
<Route path='/blog' exact  component={Blog}/>
<Route  component={PageNotFound} />
</Switch>
</div>
)
}

}

const mapStateToProps = (state)=>{
  return {
    authentication : state.authentication,
  }
}
const mapDispatchToProps = (dispatch)=>{
return{
  login : () => dispatch({type:'login'}),
}
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(MajorLayout))
