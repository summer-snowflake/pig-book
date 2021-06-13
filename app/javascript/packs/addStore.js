import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux'
import { store } from 'modules/store'

document.addEventListener("DOMContentLoaded", () => {

  //var wrapper = document.createElement('div');
  //document.body.replaceChild(wrapper, document.body);

 // const element = (

 //   <div>
 //     {document.body.innerHTML}
 //   </div>
 // )

//  const provider = (
//    <Provider store={store}>
//      {document.getElementById('root')}
//    </Provider>
//  )

  ReactDOM.render(
    <Provider store={store}>
      {React.Component}
    </Provider>,
    document.getElementById('root')
  )
})