import React from 'react' ;
import {Link} from 'react-router-dom' ;
import './styleOffers.css' ;
import TestCrud from './testCrud' ;

const Offers = (props)=>{


return(
<div class='row'>

{
props.offers.map((offer,idx)=>{
return(
<div class='col-lg-4'>
<div class="card" >
<div class="card-header ">
<div class='row'>

<p class=''>{offer.categorie}</p>

{localStorage.getItem('profile_id') && offer.profileId == localStorage.getItem('profile_id') && props.source == 'profile' ?
<div class='btnCrud'>
 <button onClick={()=>{props.update(idx)}}  class='btn buttonRounded btn-warning btn-sm'><i class="fas fa-user-edit"></i></button>
 <button onClick={()=>{props.delete(idx)}} class='btn buttonRounded btn-danger btn-sm'><i class="fas fa-trash-alt"></i></button>
 </div> : null
}
</div>


 </div>
  <img class="card-img-top" src={offer.image} height='200' width='200' alt="Card image cap" />
  <div class="card-body">
    <h5 class="card-title">{offer.title}</h5>

    <div class="card-text">
    <p>{offer.description.substring(0,100)+'...'}</p>
    <Link to={'/profile/'+offer.profileId}><small>{offer.profileName}</small></Link>
    </div>
    <Link to={'/offer/'+offer.id} class="btn btn-primary">see more</Link>
  </div>
  <div class="card-footer text-muted">
   <p>by <Link to={'/profile/'+offer.profileId}>{offer.profileName}</Link> on 2 days ago</p>
 </div>
</div>
<br/>
</div>
)
}
)
}
</div>
)

}
export default Offers ;
