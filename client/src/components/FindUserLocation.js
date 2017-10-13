/* eslint-disable no-undef */
import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../actions';
class UserLocation extends React.Component{
  constructor(props){
    super(props);
  };
    static contextTypes = {
      router: PropTypes.object
    };

    
    componentDidMount() {

        var infoWindow;
          let map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: -34.397, lng: 150.644},
            zoom: 15
          });
          infoWindow = new google.maps.InfoWindow();
        
          // Try HTML5 geolocation.
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
              var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };
              console.log("lat: " + pos.lat + ". Lng: " + pos.lng);
              console.log(position);
              localStorage.setItem('trip_lat', pos.lat);
              localStorage.setItem('trip_lng', pos.lng);
              
              infoWindow.setPosition(pos);
              infoWindow.setContent('Location found.');
              infoWindow.open(map);
              map.setCenter(pos);
            }, function() {
              handleLocationError(true, infoWindow, map.getCenter());
            });
          } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
          }
        
        
        function handleLocationError(browserHasGeolocation, infoWindow, pos) {
          infoWindow.setPosition(pos);
          infoWindow.setContent(browserHasGeolocation ?
                                'Error: The Geolocation service failed.' :
                                'Error: Your browser doesn\'t support geolocation.');
          infoWindow.open(map);
        }
        this.context.router.history.push('/manualBuild');
        
    }
    
render(){
  console.log(this.props);
  this.props.addLocation(localStorage.getItem('trip_lat'), localStorage.getItem('trip_lng'), "");
    return(
        <div>
            <h2 style={{textAlign:"center"}}>Find Your Current Location</h2>
            <br/>
        <div style={{"height": "100%"}} id="map"></div>
        </div>
    )
}    
}
const mapStateToProps = (state) =>{
  return {state: state};
};
function mapDispatchToProps(dispatch){
  return bindActionCreators(actionCreators, dispatch);
}
UserLocation = connect(mapStateToProps, mapDispatchToProps)(UserLocation);

export default UserLocation;