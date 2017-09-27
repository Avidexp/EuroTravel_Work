/* eslint-disable no-undef */
  // DO NOT TOUCH LINE ONE. NO IDEA WHAT IT DOES OR HOW IT WORKS BUT IT MAKES EVERYTHING WORK DONT TOUCH IT
  import  '../index.css';
  import React, {Component} from 'react';
  import PropTypes from 'prop-types';

  export default class PlacesSearch extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        Places: [],
        placeid: this.props.placeid
      }
    } 

    static contextTypes = {
      router: PropTypes.object
    };
    
    onClick () {
      this.context.router.history.push('/dashboard');
    };

    componentDidMount() {
      let state = this.state;
      let location = {lat:Number(this.props.selectedLocation.lat), lng: Number(this.props.selectedLocation.lng)};
      let map = new google.maps.Map(document.getElementById('map'), {
          center: location,
          zoom:15
      });

      let service = new google.maps.places.PlacesService(map);
      
      service.nearbySearch({
        location:location,
        radius: 500,                // DEBUG (RAB)
        type: ['store']             // DEBUG (RAB)
        //type: ['lodging']         // DEBUG (RAB)
        //type: ['cafe']            // DEBUG (RAB)
        //type: ['museum']          // DEBUG (RAB)
        //type: ['pharmacy']        // DEBUG (RAB)
        //type: ['subway_station']  // DEBUG (RAB)
        //type: ['airport']         // DEBUG (RAB)
        //type: ['hospital']        // DEBUG (RAB)
        //type: ['bus_station']     // DEBUG (RAB)
        //type: ['park']            // CRITICAL: (RAB) Define place type passed into Google Places API //
      }, function(results, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (let i =0; i < results.length; i++) {
              createMarker(results[i]);
              state.Places.push(results[i]);
            }
          }
      });

      service.getDetails({
        placeId: this.state.place_id
      }, function(place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
         
          // Intended behavior is to set this.setState({places.place.reviews})
        }
      });
      
      function createMarker(place) {
        let placeLoc = place.geometry.location;   // DEBUG (RAB) Capture Places data
        let placeName = place.name;               // DEBUG (RAB) Capture Places data
        let placeType = place.types[0];           // DEBUG (RAB) Capture Places data
        let placeAddr = place.vicinity;           // DEBUG (RAB) Capture Places data
        let placeRating = place.rating;           // DEBUG (RAB) Capture Places data
        console.log(place);                       // DEBUG (RAB) Capture Places data
        console.log('Name: ' + placeName);        // DEBUG (RAB) Capture Places data
        console.log('Type: ' + placeType);        // DEBUG (RAB) Capture Places data
        console.log('Address: ' + placeAddr);     // DEBUG (RAB) Capture Places data
        console.log('Rating: ' + placeRating);    // DEBUG (RAB) Capture Places data

        let marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });
      }
    }

    render() {
      return(
        <div>
          <h1>IM WORKING</h1>
          <button onClick={this.onClick.bind(this)} className='btn btn-default'>Back</button>  
        </div>
      )
    }
}
