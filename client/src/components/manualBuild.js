import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import Dashboard from './dashboard';
import PlacesSearch from './search';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../actions';
import Autocomplete from 'react-google-autocomplete';
import {Table, Nav, Navbar, NavItem} from 'react-bootstrap';

const ROOT_URL = 'http://localhost:8080/api/v1';
//const ROOT_URL = 'https://eurotravel-sever.herokuapp.com/';

let cities = [];
let places_type = [];

class manualBuild extends Component {
  constructor(props) {
    super(props);
  }    
  state = {
      lng: 0,
      lat: 0,
      city: '',
      country: ''
  };

  static contextTypes = {
    router: PropTypes.object
  };

componentWillMount = () => {
    // let longitude = 0;
    // let latitude = 0;
    
    // const city = localStorage.getItem('sel_city');
    // const country = localStorage.getItem('sel_country');
    // //console.log('tripbuild city: ' + this.props.city);
    // //console.log('tripbuild country: ' + this.props.country); 

    // axios.post(`${ROOT_URL}/cities_lng_lat`, { city: city, country: country })
    // .then(response => {
    //   cities = response.data.payload;
    //   longitude = response.data.payload[0].lng;
    //   latitude = response.data.payload[0].lat;
    //   this.setState({
    //       lng: longitude,
    //       lat: latitude,
    //   });
    // })
    // .catch(err => {
    //   this.setState({
    //   });        
    // })
  }

  handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();

    if (document.getElementById('checkbox_place_store').checked) {
        places_type.push('store');
    }
    if (document.getElementById('checkbox_place_lodging').checked) {
        places_type.push('lodging');
    }
    if (document.getElementById('checkbox_place_cafe').checked) {
        places_type.push('cafe');
    }
    if (document.getElementById('checkbox_place_museum').checked) {
        places_type.push('museum');
    }
    if (document.getElementById('checkbox_place_pharmacy').checked) {
        places_type.push('pharmacy');
    }
    if (document.getElementById('checkbox_place_subway').checked) {
        places_type.push('subway_station');
    }
    if (document.getElementById('checkbox_place_airport').checked) {
        places_type.push('airport');
    }
    if (document.getElementById('checkbox_place_hospital').checked) {
        places_type.push('hospital');
    }
    if (document.getElementById('checkbox_place_bus').checked) {
        places_type.push('bus_station');
    }
    if (document.getElementById('checkbox_place_park').checked) {
        places_type.push('park');
    }
    if (document.getElementById('checkbox_place_atm').checked) {
        places_type.push('atm');
    }
    if (document.getElementById('checkbox_place_bank').checked) {
        places_type.push('bank');
    }
    if (document.getElementById('checkbox_place_doctor').checked) {
        places_type.push('doctor');
    }
    if (document.getElementById('checkbox_place_zoo').checked) {
        places_type.push('zoo');
    }
    if (document.getElementById('checkbox_place_police').checked) {
        places_type.push('police');
    }
    if (document.getElementById('checkbox_place_train').checked) {
        places_type.push('train_station');
    }
    if (document.getElementById('checkbox_place_school').checked) {
        places_type.push('school');
    }
    if (document.getElementById('checkbox_place_bar').checked) {
        places_type.push('bar');
    }
    if (document.getElementById('checkbox_place_church').checked) {
        places_type.push('church');
    }
    if (document.getElementById('checkbox_place_university').checked) {
        places_type.push('university');
    }
    if (document.getElementById('checkbox_place_synagogue').checked) {
        places_type.push('synagogue');
    }
    if (document.getElementById('checkbox_place_embassy').checked) {
        places_type.push('embassy');
    }
    if (document.getElementById('checkbox_place_restaurant').checked) {
        places_type.push('restaurant');
    }
    if (document.getElementById('checkbox_place_dentist').checked) {
        places_type.push('dentist');
    }
    if (document.getElementById('checkbox_place_mosque').checked) {
        places_type.push('mosque');
    }
    if (document.getElementById('checkbox_place_library').checked) {
        places_type.push('library');
    }
    if (document.getElementById('checkbox_place_art_gallery').checked) {
        places_type.push('art_gallery');
    }
    if (document.getElementById('checkbox_place_spa').checked) {
        places_type.push('spa');
    }


    console.log(places_type);

    this.props.wipePlaces(); // to reset the places per search
    for (var i = 0; i < places_type.length; i ++){
        this.props.addType(places_type[i]);
        console.log("Type added: " + places_type[i]);
    }

    console.log("Places_type map completed");
    console.log(this.props);
    this.context.router.history.push('/manualSearch');

  }

 onClick () {
    this.context.router.history.push('/dashboard');
  }
  onButtonClick () {
    this.context.router.history.push('/hotelSearch');
  };
  render() {
    const footerStyle = {
        backgroundColor: "black",
        fontSize: "15px",
        color: "white",
        borderTop: "1px solid #E7E7E7",
        textAlign: "center",
        padding: "0px",
        position: "fixed",
        left: "0",
        bottom: "0",
        height: "40px",
        width: "100%"
      };
      
      const phantomStyle = {
        display: "block",
        padding: "20px",
        height: "60px",
        width: "100%"
      };
      
      function Footer({ children }) {
        return (
          <div>
            <div style={phantomStyle} />
            <div style={footerStyle}>{children}</div>
          </div>
        );
      }
    return ( 
      <div className='tripbuild'>
                    <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="/">GuideTrip</a>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav>
      <NavItem eventKey={2} href="/">Home</NavItem>
      <NavItem eventKey={1} href="/dashboard">Dashboard</NavItem>
      <NavItem eventKey={1} href="/hotelBuild">Hotels</NavItem>
    </Nav>
  </Navbar>
    <h3 style={{textAlign: "center"}}><strong>Create Your Custom Itinerary</strong></h3>
        <form action='/tripresults' onSubmit={this.handleFormSubmit}>
          <div className='form-group'>
            <label className='col-md-2 control-label'>Check your Itinerary Items</label>  
            <div className='col-md-12 columns'>
            <div className='col-md-2 columns'>
                </div>
            <div className='row1'>
              <div className='col-md-1 columns'>
                <label className='checkbox-inline'>
                    <input type='checkbox' name='Checkboxes' id='checkbox_place_store' value='item-1' /><strong>Store
                </strong></label>
              </div>
              <div className='col-md-1 columns'>
                <label className='checkbox-inline'>
                    <input type='checkbox' name='Checkboxes' id='checkbox_place_lodging' value='item-2' /><strong>Lodging</strong>
                </label>
              </div>
              <div className='col-md-1 columns'>
                <label className='checkbox-inline'>
                    <input type='checkbox' name='Checkboxes' id='checkbox_place_cafe' value='item-3' /><strong>Cafe</strong>
                </label>
              </div>
              <div className='col-md-1 columns'>
                <label className='checkbox-inline'>
                    <input type='checkbox' name='Checkboxes' id='checkbox_place_museum' value='item-1' /><strong>Museum</strong>
                </label>
              </div>
              <div className='col-md-1 columns'>
                <label className='checkbox-inline'>
                    <input type='checkbox' name='Checkboxes' id='checkbox_place_pharmacy' value='item-2' /><strong>Pharmacy</strong>
                </label>
              </div>
              <div className='col-md-1 columns'>
                <label className='checkbox-inline'>
                    <input type='checkbox' name='Checkboxes' id='checkbox_place_subway' value='item-3' /><strong>Subway</strong>
                </label>
              </div>
              <div className='col-md-1 columns'>
                <label className='checkbox-inline'>
                    <input type='checkbox' name='Checkboxes' id='checkbox_place_airport' value='item-1' /><strong>Airport</strong>
                </label>
              </div>
              <div className='col-md-1 columns'>
                <label className='checkbox-inline'>
                    <input type='checkbox' name='Checkboxes' id='checkbox_place_hospital' value='item-2' /><strong>Hospital</strong>
                </label>
              </div>
              <div className='col-md-1 columns'>
                <label className='checkbox-inline'>
                    <input type='checkbox' name='Checkboxes' id='checkbox_place_bus' value='item-3' /><strong>Bus</strong>
                </label>
              </div>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <div className='row2'>

            <div className='col-md-2 columns'>
                </div>
              <div className='col-md-1 columns'>
                <label className='checkbox-inline'>
                    <input type='checkbox' name='Checkboxes' id='checkbox_place_park' value='item-1' /><strong>Park</strong>
                </label>
              </div>
              <div className='col-md-1 columns'>
                <label className='checkbox-inline'>
                    <input type='checkbox' name='Checkboxes' id='checkbox_place_atm' value='item-2' /><strong>ATM</strong>
                </label>
              </div>
              <div className='col-md-1 columns'>
                <label className='checkbox-inline'>
                    <input type='checkbox' name='Checkboxes' id='checkbox_place_bank' value='item-3' /><strong>Bank</strong>
                </label>
              </div>
              <div className='col-md-1 columns'>
                <label className='checkbox-inline'>
                    <input type='checkbox' name='Checkboxes' id='checkbox_place_doctor' value='item-1' /><strong>Doctor</strong>
                </label>
              </div>
              <div className='col-md-1 columns'>
                <label className='checkbox-inline'>
                    <input type='checkbox' name='Checkboxes' id='checkbox_place_zoo' value='item-2' /><strong>Zoo</strong>
                </label>
              </div>
              <div className='col-md-1 columns'>
                <label className='checkbox-inline'>
                    <input type='checkbox' name='Checkboxes' id='checkbox_place_police' value='item-3' /><strong>Police</strong>
                </label>
              </div>
              <div className='col-md-1 columns'>
                <label className='checkbox-inline'>
                    <input type='checkbox' name='Checkboxes' id='checkbox_place_train' value='item-1' /><strong>Train</strong>
                </label>
              </div>
              <div className='col-md-1 columns'>
                <label className='checkbox-inline'>
                    <input type='checkbox' name='Checkboxes' id='checkbox_place_school' value='item-2' /><strong>School</strong>
                </label>
              </div>
              <div className='col-md-1 columns'>
                <label className='checkbox-inline'>
                    <input type='checkbox' name='Checkboxes' id='checkbox_place_bar' value='item-3' /><strong>Bar</strong>
                </label>
              </div>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <div className='row3'>
            <div className='col-md-2 columns'>
                </div>
              <div className='col-md-1 columns'>
                <label className='checkbox-inline'>
                    <input type='checkbox' name='Checkboxes' id='checkbox_place_church' value='item-1' /><strong>Church</strong>
                </label>
              </div>
              <div className='col-md-1 columns'>
                <label className='checkbox-inline'>
                    <input type='checkbox' name='Checkboxes' id='checkbox_place_university' value='item-2' /><strong>University</strong>
                </label>
              </div>
              <div className='col-md-1 columns'>
                <label className='checkbox-inline'>
                    <input type='checkbox' name='Checkboxes' id='checkbox_place_synagogue' value='item-3' /><strong>Synagogue</strong>
                </label>
              </div>
              <div className='col-md-1 columns'>
                <label className='checkbox-inline'>
                    <input type='checkbox' name='Checkboxes' id='checkbox_place_embassy' value='item-1' /><strong>Embassy</strong>
                </label>
              </div>
              <div className='col-md-1 columns'>
                <label className='checkbox-inline'>
                    <input type='checkbox' name='Checkboxes' id='checkbox_place_restaurant' value='item-2' /><strong>Restaurant</strong>
                </label>
              </div>
              <div className='col-md-1 columns'>
                <label className='checkbox-inline'>
                    <input type='checkbox' name='Checkboxes' id='checkbox_place_dentist' value='item-3' /><strong>Dentist</strong>
                </label>
              </div>
              <div className='col-md-1 columns'>
                <label className='checkbox-inline'>
                    <input type='checkbox' name='Checkboxes' id='checkbox_place_mosque' value='item-1' /><strong>Mosque</strong>
                </label>
              </div>
              <div className='col-md-1 columns'>
                <label className='checkbox-inline'>
                    <input type='checkbox' name='Checkboxes' id='checkbox_place_library' value='item-2' /><strong>Library</strong>
                </label>
              </div>
              <div className='col-md-1 columns'>
                <label className='checkbox-inline'>
                    <input type='checkbox' name='Checkboxes' id='checkbox_place_art_gallery' value='item-3' /><strong>Gallery</strong>
                </label>
              </div>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <div className='row4'>
            <div className='col-md-2 columns'>
                </div>
              <div className='col-md-1 columns'>
                <label className='checkbox-inline'>
                    <input type='checkbox' name='Checkboxes' id='checkbox_place_spa' value='item-1' /><strong>Spa</strong>
                </label>
              </div>
            </div>
            </div>
          </div>
          <button className='btn btn-default' type='submit'>Click to Generate Itinerary</button>
        </form>
        <button onClick={this.onButtonClick.bind(this)} className='btn btn-default'>Search Hotels In Area</button>
        
          <Footer>
          <a href="/"> Home</a>
                <a href="/dashboard"> Dashboard</a>
                <a href="/hotelBuild"> Find Hotels</a>
              
              <div class="footer-copyright">
          <div class="container-fluid">
              © 2017 Copyright: <a href="/"> GuideTrip </a>
      
          </div>
          </div>
          </Footer>
      </div>
    );
  }
}

const mapStateToProps = (state) =>{
    return {state: state};
  };
function mapDispatchToProps(dispatch){
    return bindActionCreators(actionCreators, dispatch);
  }
  manualBuild = connect(mapStateToProps, mapDispatchToProps)(manualBuild);
  export default manualBuild;