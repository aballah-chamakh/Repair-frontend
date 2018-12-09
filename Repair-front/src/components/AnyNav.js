import React from 'react' ;
import {Link} from 'react-router-dom' ;

const AnyNav = (props)=>{


return(
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
       <div class="container">
         <Link class="navbar-brand" to='/home'>Repair</Link>
         <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
           <span class="navbar-toggler-icon"></span>
         </button>
         <div class="collapse navbar-collapse" id="navbarResponsive">
           <ul class="navbar-nav ml-auto">
             <li class="nav-item active">
               <Link class="nav-link" to='/home'>Home
                 <span class="sr-only">(current)</span>
               </Link>
             </li>
             <li class="nav-item">
               <Link class="nav-link" to='/login'>login</Link>
             </li>
             <li class="nav-item">
               <Link class="nav-link" to='/register'>register</Link>
             </li>
           </ul>
         </div>
       </div>
     </nav>
)



}


export default AnyNav ;
