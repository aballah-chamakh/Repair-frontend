import React from 'react' ;
import AnyNav from './AnyNav' ;
import AuthNav from './AuthNav' ;
import {connect} from 'react-redux'

const Header = (props)=>{

return(
<div>
{
props.authentication || localStorage.getItem('user_id') ?
<AuthNav/> : <AnyNav/>
}
</div>
)

}
const mapStateToProps = (state)=>{
  return {
    authentication : state.authentication,
  }
}
export default connect(mapStateToProps)(Header)
