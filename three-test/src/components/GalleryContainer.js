import React, { Component } from 'react';
import ThreeGallery from './ThreeGallery.js'

class GalleryContainer extends Component{
  render(){
    return(
      <div>
        <div id="CanvasContainer">
          <ThreeGallery />
        </div>
      </div>

    )
  }

}

export default GalleryContainer
