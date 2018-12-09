export  const ChangeHandler = (event,state,field)=>{
console.log('changed ...');
state.form[field].props.isValid = true ;
state.form[field].props.msg = '' ;
if(state.form[field].props.classes.indexOf('is-invalid') !== -1 || state.form[field].props.classes.indexOf('previewImageDanger') !== -1 ){
  let classes = state.form[field].props.classes.replace('is-invalid','')
  if(field == 'fileInput'){
    classes = state.form[field].props.classes.replace('previewImageDanger','previewImageSuccess')
  }
  state.form[field].props.classes = classes ;
}
let value = event.target.value ;
if(field == 'image'){
  value = event.target.files[0] ;
state.form[field].props.imageUrl = URL.createObjectURL(value)
}
state.form[field].props.value = value ;
console.log(value);
return state ;
}
export const CheckValidity = (state,field)=>{

let isValid = true ;
let value = state.form[field].props.value ;
let img = state.form[field].props.imageUrl ;
let validators = state.form[field].props.validators
console.log('log me the value');
console.log(field);
console.log(value);
if (validators.required && isValid ){
  console.log(' we pass the first condition ');
if(value == '' || value == 'categorie' || value==undefined){

    console.log(' we pass the second condition');
  isValid = false ;
  state.form[field].props.isValid = false ;
  state.form[field].props.msg = 'this field is required' ;
  if(state.form[field].props.classes.indexOf('is-invalid') === -1){
    console.log(' we apply the danger style the others input');
  state.form[field].props.classes += ' is-invalid' ;}
  if(field == 'image' && state.form[field].props.classes !="previewImageDanger"){
    console.log('we apply the danger style for the image');
    state.form[field].props.classes = 'previewImageDanger' ;
  }
}
}

if(validators.email && isValid){
    let validEmail = true
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    validEmail =  re.test(value.toLowerCase())
    if(!validEmail){
      isValid = false ;
      state.form[field].props.isValid = false ;
      state.form[field].props.msg = 'invalid email' ;
      if(state.form[field].props.classes.indexOf('is-invalid') === -1){
      state.form[field].props.classes += ' is-invalid' ;}
    }

}

if(validators.passwordMatch && isValid && state.form['password'].props.value !='' ){
  console.log('passwords should match');
  if (value != state.form['password'].props.value){
      console.log('passwords should matchaaaaaaaaaaa');
      isValid = false ;
  state.form[field].props.isValid = false ;
  state.form[field].props.msg = 'password should match' ;
  if(state.form[field].props.classes.indexOf('is-invalid') === -1){
     console.log(' we apply the danger style the others input');
     state.form[field].props.classes += ' is-invalid' ;}
}
console.log(state.form[field].props.msg);
}
console.log('=============================');
return {state:state,isValid:isValid}

}
