import React from 'react' ;
import axios from 'axios' ;
import Highlight from 'react-highlight'
import './blog.css' ;
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

class Blog extends React.Component {

state = {
  blog:{description2:''},
}

componentDidMount(){
  let url = 'http://127.0.0.1:8000/api/lamp/1/'
  axios.get(url).then(res=>{
    this.setState({blog:res.data})
  }
  )
}


render(){
  return(
    <div class='container'>
    <div class='row'>
    <div class='col-lg-8 ' style={{marginTop:'100px'}}>
    {this.state.blog.description2}
    <Highlight innerHTML={true}>
      {this.state.blog.description2}
    </Highlight>
    </div>
    </div>
    </div>
  )
}

}

export default Blog ;
