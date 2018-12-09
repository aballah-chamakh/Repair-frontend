import React from 'react'  ;
import AnyNav from '../components/AnyNav' ;
import Slide from '../components/Slide' ;
import Search from '../components/Search' ;
import Offers from '../components/Offers' ;
import axios from 'axios' ;
class HomeLayout extends React.Component {
state = {
  source : 'home' ,
  searched : false,
  offers : [

  ]
}

componentDidMount(){
  window.scrollTo(0, 0)
axios.get(
  'http://127.0.0.1:8000/api/offer/',
).then(response =>{ this.setState({offers:response.data.results}); console.log(response.data.results);   });
}
searchOffers(offers){
  this.setState({offers:offers})
}

render(){

  console.log(this.state.offers);
return(
<div>

<Slide />
<div class='container'>
<Search searched={this.state.searched} searchOffers={this.searchOffers.bind(this)} />
{this.state.offers ?
<Offers source={this.state.source} offers={this.state.offers}  /> : null
}

</div>
</div>
)
}



}
export default HomeLayout ;
