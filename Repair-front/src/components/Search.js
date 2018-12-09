import React from 'react' ;
import { Motion, spring } from "react-motion";
import axios from 'axios'
class Search extends React.Component{
state = {
search : '',
searchClasses : 'form-control',
searchMsg : '',
categorie : 'all categories',
categorieClasses : 'custom-select',
categorieMsg : '',

}
change(event,field){


switch (field) {
case 'search':
if (this.state.searchClasses.indexOf('is-invalid') != -1){
let classes = this.state.searchClasses.replace('is-invalid','')
this.setState({searchClasses:classes})}
this.setState({search:event.target.value})
break;
case 'categorie':
if (this.state.categorieClasses.indexOf('is-invalid') != -1) {
let classes = this.state.categorieClasses.replace('is-invalid','')
this.setState({categorieClasses:classes})}
this.setState({categorie:event.target.value})
break;
}
console.log(event.target.value);

}
submitSearch = ()=>{

let url = 'http://127.0.0.1:8000/api/offer/?search='+this.state.search+'&cat='+this.state.categorie
console.log('log the data');
axios.get(
url,
).then(res =>{ console.log(res.data); this.props.searchOffers(res.data.results)}  )


}
render(){
return(
<Motion
defaultStyle={{ x: -200, opacity: 0 }}
style={{
  x: spring(0),
  opacity: spring(1)
}}
>
{ style => (
<div
style={{
transform: `translateX(${style.x}px)`,
opacity: style.opacity
}}
>
<br/>
<br/>
<center>
<h1 class='text-warning'>Find your Hero</h1>
</center>
<br/>
<br/>

<div class="row">


<div class='offset-1 col-lg-5'>
<input  type='text' class={this.state.searchClasses} value={this.state.search} placeholder='search for an offers'  onChange={(event)=>{this.change(event,'search')}} />
<div class="invalid-feedback">
  <p>this field is required</p>
</div>
</div>

<div class='col-lg-4'>
<select class={this.state.categorieClasses} value={this.state.categorie} onChange={(event)=>{this.change(event,'categorie')}}>
  <option >all categories</option>
  <option >web development</option>
  <option >web designe</option>
</select>
<div class="invalid-feedback">
  <p>this field is required</p>
</div>
</div>

<div class='col-lg-2'>
<button class='btn btn-warning' onClick={this.submitSearch}>Search</button>
</div>


</div>
<br/>
<br/>
<br/>
<br/>
</div>)}
</Motion>
)
}
}
export default Search ;
