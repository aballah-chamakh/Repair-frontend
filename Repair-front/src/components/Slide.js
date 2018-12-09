import React from 'react' ;
import { Motion, spring } from "react-motion";
const Slide = (props)=>{

return(
  <div>
  <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
    <ol class="carousel-indicators">
      <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="4"></li>

    </ol>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img class="d-block w-100" src={require('../assets/categories/main2.jpg')}  alt="First slide"/>
<Motion
defaultStyle={{ y: -200, opacity: 0 }}
style={{
  y: spring(0),
  opacity: spring(1)
}}
>
  { style =>(<div
    style={{
    transform: `translateY(${style.y}px)`,
    opacity: style.opacity
  }}
     class="carousel-caption">
  <h5>any thing to say</h5>
  <p>any thing to say</p>
 </div>)}
</Motion>
      </div>
      <div class="carousel-item">
        <img class="d-block w-100" src={require('../assets/categories/programing.jpg')} alt="Second slide"/>
      </div>
      <div class="carousel-item">
        <img class="d-block w-100" src={require('../assets/categories/hadad.jpg')} alt="Third slide"/>
      </div>
      <div class="carousel-item">
        <img class="d-block w-100" src={require('../assets/categories/najar.jpg')} alt="forth slide"/>
      </div>
      <div class="carousel-item">
        <img class="d-block w-100" src={require('../assets/categories/electrical.jpg')} alt="forth slide"/>
      </div>
    </div>
    <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
  </div>
)

}
export default Slide ;
