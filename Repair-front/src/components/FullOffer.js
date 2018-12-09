import React from 'react' ;
import axios from 'axios' ;
import CommentModel from './CommentModel'
import {Route,Switch,Link} from 'react-router-dom' ;
class FullOffer extends React.Component {
state = {
  offer : {}

}

componentDidMount(){
    window.scrollTo(0, 0)
  let newUrl = 'http://127.0.0.1:8000/api/offer/'+this.props.match.params.id+'/'
  //let config =  {headers: {Authorization : 'Bearer '+localStorage.getItem('token')}}
axios.get(
newUrl,
//config
).then(res => this.setState({offer:res.data}))

}
toogleOfferLike = (idx)=>{
  let offer = this.state.offer
  let url = 'http://127.0.0.1:8000/api/offer/'+offer.id+'/toogle_like/'
  let config =  {headers: {Authorization : 'Bearer '+localStorage.getItem('token')}} ;
  axios.get(url,config).then(res=>{
    console.log(res.data);
    if(res.data.likes){
          offer.likes = res.data.likes
          this.setState({offer:offer})
    }

  }).catch(err=>console.log(err))
}
addComment = (content)=>{
  if (content != ''){
  let offer = this.state.offer
  // offer.comments.unshift({content : content})
  // this.setState({offer:offer})
  let form  = {content:content}
  let url = 'http://127.0.0.1:8000/api/comment/?offer_id='+offer.id
  let config =  {headers: {Authorization : 'Bearer '+localStorage.getItem('token')}} ;
  console.log(config);
  console.log(form);
  axios.post(url,form,config).then(res=>{
    offer.comments.unshift(res.data)
    this.setState({offer:offer})
  }).catch(err=>console.log(err))
}
}
toogleCommentLike = (idx)=>{
  let offer = this.state.offer
  let comment_id = offer.comments[idx].id
  let url = 'http://127.0.0.1:8000/api/comment/'+comment_id+'/toogle_like/'
  let config =  {headers: {Authorization : 'Bearer '+localStorage.getItem('token')}} ;
  axios.get(url,config).then(res=>{
    console.log(res.data);
    if(res.data.likes){
          offer.comments[idx].likes = res.data.likes
          this.setState({offer:offer})
    }

  }).catch(err=>console.log(err))
}
toogleCommentToUpdate = (idx)=>{
  let offer = this.state.offer
  offer.comments[idx]['update'] = true
  offer.comments[idx]['updatedValue'] = offer.comments[idx].content
  this.setState({offer:offer})
}

forgetCommentUpdate = (idx)=>{
  let offer = this.state.offer
  offer.comments[idx]['update'] = false
  this.setState({offer:offer})
}

changeUpdatedValue = (e,idx)=>{
  let offer = this.state.offer
  offer.comments[idx]['updatedValue']  = e.target.value
  this.setState({offer:offer})
}

UpdateComment = (idx)=>{
  let offer = this.state.offer
  let newContent = offer.comments[idx]['updatedValue']
  let oldContent = offer.comments[idx].content
  if (newContent && newContent != '' && newContent!=oldContent){
      let comment_id = offer.comments[idx].id
      let form = {content:newContent}
      let url = 'http://127.0.0.1:8000/api/comment/'+comment_id+'/update_comment/'
      let config =  {headers: {Authorization : 'Bearer '+localStorage.getItem('token')}}
      axios.post(url,form,config).then(res=>{
      offer.comments[idx].content = newContent
      offer.comments[idx]['update'] = false
       this.setState({offer:offer})
     }).catch(err=>console.log(err))
  }
  else if (newContent == oldContent){
    offer.comments[idx]['update'] = false
     this.setState({offer:offer})
  }
}

//  ======================================================================

addCommentResponse = (idx)=>{
  let content = this.state.offer.comments[idx].resValue
  if (content && content != ''){
  let offer = this.state.offer
  let comment_id = offer.comments[idx].id
  let form  = {content:content}
  let url = 'http://127.0.0.1:8000/api/comment-response/?comment_id='+comment_id
  let config =  {headers: {Authorization : 'Bearer '+localStorage.getItem('token')}} ;
  axios.post(url,form,config).then(res=>{
    offer.comments[idx].responses.push(res.data)
    this.state.offer.comments[idx].resValue = ''
    this.setState({offer:offer})
  }).catch(err=>console.log(err))
}
}
toogleResCommentLike = (idxC,idxR)=>{
  let offer = this.state.offer
  let comment_res_id = offer.comments[idxC].responses[idxR].id
  let url = 'http://127.0.0.1:8000/api/comment-response/'+comment_res_id+'/toogle_like/'
  let config =  {headers: {Authorization : 'Bearer '+localStorage.getItem('token')}} ;
  axios.get(url,config).then(res=>{
    console.log(res.data);
    if(res.data.likes){
          offer.comments[idxC].responses[idxR].likes = res.data.likes
          this.setState({offer:offer})
    }

  }).catch(err=>console.log(err))
}

UpdateCommentResponse = (idxC,idxR)=>{
  let offer = this.state.offer
  let newContent = offer.comments[idxC].responses[idxR]['resValue']
  let oldContent = offer.comments[idxC].responses[idxR].content
  if (newContent && newContent != '' && newContent!=oldContent){
      let comment_id = offer.comments[idxC].responses[idxR].id
      let form = {content:newContent}
      let url = 'http://127.0.0.1:8000/api/comment-response/'+comment_id+'/update_res_comment/'
      let config =  {headers: {Authorization : 'Bearer '+localStorage.getItem('token')}}
      axios.post(url,form,config).then(res=>{
      offer.comments[idxC].responses[idxR].content = newContent
      offer.comments[idxC].responses[idxR]['update'] = false
       this.setState({offer:offer})
     }).catch(err=>console.log(err))
  }
  else if(newContent == oldContent){
    offer.comments[idxC].responses[idxR]['update'] = false
    this.setState({offer:offer})
  }
}
toogleResComment = (idx)=>{
  let offer = this.state.offer
if(!offer.comments[idx]['showRes']){
  offer.comments[idx]['showRes'] = true
}
else {
  offer.comments[idx]['showRes'] = !offer.comments[idx]['showRes']
}
this.setState({offer:offer})
}

toogleResCommentToUpdate = (idxC,idxR)=>{
  let offer = this.state.offer
  offer.comments[idxC].responses[idxR]['update'] = true
  offer.comments[idxC].responses[idxR]['resValue'] = offer.comments[idxC].responses[idxR].content
  this.setState({offer:offer})
}

forgetResCommentUpdate = (idxC,idxR)=>{
  let offer = this.state.offer
  offer.comments[idxC].responses[idxR]['update'] = false
  this.setState({offer:offer})
}

changeUpdatedResValue = (e,idxC,idxR)=>{
  let offer = this.state.offer
  offer.comments[idxC].responses[idxR]['resValue']  = e.target.value
  this.setState({offer:offer})
}


changeResValue = (e,idx)=>{
  let offer = this.state.offer
  offer.comments[idx]['resValue']  = e.target.value
  this.setState({offer:offer})
}

checkLiked = (likes)=>{
 let user_id = localStorage.getItem('user_id')
 for( let user in likes ){
   if(likes[user].id == user_id){
     return true
     break ;
}
 }
}

render(){

  console.log(this.state.offer);
return(
  <div class='container' >
  <div ref={container=>this.container=container} >
  <br/><br/><br/><br/>

<div class='row' >
<div class='col-lg-8 ' style={{}}>
<img src={this.state.offer.image} width='100%' height='400'/>
<br/><br/>
<h5 style={{color:'orange'}}>{this.state.offer.title}</h5>
<hr style={{color:'orange'}} />
<p>{this.state.offer.description}</p>
<hr/>
{this.state.offer.likes ?  <button  class='btn btn-link' onClick={()=>{this.toogleOfferLike()}} >
<span style={{marginRight:'5px'}} >{this.state.offer.likes.length}</span>
<span style={{marginRight:'5px'}}><i class="fas fa-thumbs-up"></i></span>
<span style={{marginRight:'0px'}}>{this.checkLiked(this.state.offer.likes) ? 'liked' : null}</span>
</button> : null}

  <hr/>
  </div>
  <div class="col-lg-4"  >
<div style={{border:'1px solid grey',boxShadow:'10px 10px 5px grey',borderRadius:'15px 15px 15px 15px',marginTop:'80px',paddingBottom:'30px'}}>
  <center>
  { this.state.offer.profile ?<div>
  <img  src={this.state.offer.profile.image} class='rounded-circle' height='150' width="150" style={{marginTop:'-75px'}} />
  <br/>
  <Link to={'/profile/'+this.state.offer.profile.id}><h3 class='text-warning'>{this.state.offer.profile.name}</h3></Link>
  <br/>
  <h5 style={{color:'grey'}}><i class="fas fa-map-marked-alt"></i> location : {this.state.offer.profile.city} </h5>
  <br/>
  <h5 style={{color:'grey'}}><i class="fas fa-phone"></i> phone : {this.state.offer.profile.phone ? this.state.offer.profile.phone : 'none'} </h5>
  <br/>
  <h5 style={{color:'grey'}}><i class="fas fa-at"></i> email : {this.state.offer.profile.email} </h5>
  </div> : null }
  </center>
  </div>
  </div>
  <br/>
    </div>

      <br/><br/>


      <CommentModel comments={this.state.offer.comments}
                    addComment={this.addComment}
                    toogleCommentLike={this.toogleCommentLike}
                    toogleResCommentLike = {this.toogleResCommentLike}
                    addCommentResponse = {this.addCommentResponse}
                    toogleResComment = {this.toogleResComment}
                    changeResValue = {this.changeResValue}
                    changeUpdatedResValue = {this.changeUpdatedResValue}
                    toogleResCommentToUpdate = {this.toogleResCommentToUpdate}
                    forgetResCommentUpdate = {this.forgetResCommentUpdate}
                    UpdateCommentResponse = {this.UpdateCommentResponse}
                    changeUpdatedValue = {this.changeUpdatedValue}
                    toogleCommentToUpdate = {this.toogleCommentToUpdate}
                    forgetCommentUpdate = {this.forgetCommentUpdate}
                    UpdateComment = {this.UpdateComment}
                    checkLiked = {this.checkLiked}
                     />


<br/><br/><br/><br/>
  </div>
</div>


)


}


}
export default FullOffer ;


// <div class="card ">
//   <div class="card-header">
//     <ul class="nav nav-tabs card-header-tabs">
//       <li class="nav-item">
//         <Link class="nav-link active" to={'/offer/'+this.props.match.params.id+'/'}>description</Link>
//       </li>
//       <li class="nav-item">
//         <Link class="nav-link " to={'/offer/'+this.props.match.params.id+'/contact'}>contact</Link>
//       </li>
//       <li class="nav-item">
//         <Link class="nav-link " to={'/offer/'+this.props.match.params.id+'/pricing'}>pricing</Link>
//       </li>
//     </ul>
//   </div>
//   <div class="card-body">
//     <h5 class="card-title">Special title treatment</h5>
//     <p class="card-text">
//     <Route path='/offer/:id' exact render={()=>{return(
//       <div class="form-group row">
// <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
// <div class="col-sm-10">
//   <input type="text" readonly class="form-control-plaintext" id="staticEmail" value={this.state.offer.description}/>
// </div>  </div>
//     )}}/>
//     <Route path='/offer/:id/contact' render={()=>{return(
//       <div class="form-group row">
// <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
// <div class="col-sm-10">
//   <input type="text" readonly class="form-control-plaintext" id="staticEmail" value={this.state.offer.email}/>
// </div>  </div>
//       )}}/>
//     <Route path='/offer/:id/pricing' render={()=>{return(
//       <div class="form-group row">
// <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
// <div class="col-sm-10">
//   <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="email@example.com"/>
// </div>  </div>
//     )}}/>
//     </p>
//   </div>
//</div>
