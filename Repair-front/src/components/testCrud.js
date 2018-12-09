import React from 'react' ;
class TestCrud extends React.Component {
state = {
fileUrl : '',

}
change(e){
this.setState({fileUrl : URL.createObjectURL(e.target.files[0])})
}
render(){

return(
<div class='row'>
<div class='offset-3 col-lg-6'>
<center>
<input type='file' ref={inpFile=>this.inpFile=inpFile} onChange={this.change.bind(this)} style={{display:'none'}} />
<button onClick={()=>{this.inpFile.click()}}  class='btn btn-warning'>upload</button>
<h1>{this.inpFile.files[0]}</h1>
<br/>
<br/>
{ this.state.fileUrl ?
<img class="img-thumbnail" height='250' width='250' src={this.state.fileUrl} /> : null

}
</center>
</div>
</div>
)

}



}
export default TestCrud ;
;
