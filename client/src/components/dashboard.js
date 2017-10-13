import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import Tripbuild from './tripbuild';
import TableRow from './tablerow';
import {Table, Nav, Navbar, NavItem} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../actions';
import Autocomplete from 'react-google-autocomplete';
import PlacesSearch from './search';

const ROOT_URL = 'http://localhost:8080/api/v1';
//const ROOT_URL = 'https://eurotravel-sever.herokuapp.com/';

let saved_itineraries = [];

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itins_retrieved: false,
      city: '',
      country: '',
      trip_country: '',
      trip_city1: '',
      trip_city2: '',
      trip_city3: '',
      trip_city4: '',
      trip_city5: '',
      trip_city6: ''
    };
  }    

  static contextTypes = {
    router: PropTypes.object
  };

  onBackClick () {
    this.context.router.history.push('/');
  }
  onHotelClick(){
    this.context.router.history.push('/hotelBuild');
  }
  findLocation(){
    this.context.router.history.push('/userLocation');
  }
  handleSave = place => {
    console.log(place);
    const user_email = localStorage.getItem('userEmail');
    const cb_name = place.name;
    const cb_place_id = place.place_id;
    const cb_price_level = place.price_level;
    const cb_rating = place.rating;
    const cb_type = place.types[0];
    if(place.photos){
      const cb_photo = place.photos[0].html_attributions[0];
      
    }
    const cb_vicinity = place.vicinity;

    const cb_city = localStorage.getItem('sel_city');
    const cb_country = localStorage.getItem('sel_country');

    /* (CRUD) Send the user checkboxed itinerary data to the server to store the user-specific     itinerary data in the DB */

    axios.post(`${ROOT_URL}/save_itin`, { user_email, cb_name, cb_place_id, cb_price_level, cb_rating, cb_type, cb_vicinity, cb_city, cb_country, if(cb_photo){return cb_photo} })
    .then(response => {
      this.setState({
        itins_saved: true
      });
    })
    .catch(err => {
      this.setState({
        itins_saved: false
      });        
    })
  

  console.log("HANDLE SAVE FUNCTION COMPLETED");
} //End handleSave()
  handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();
    let trip_city = '';

    if (document.getElementById('citydashradio1').checked) {
      trip_city = this.state.trip_city1;
    } else if (document.getElementById('citydashradio2').checked) {
      trip_city = this.state.trip_city2;
    } else if (document.getElementById('citydashradio3').checked) {
      trip_city = this.state.trip_city3;
    } else if (document.getElementById('citydashradio4').checked) {
      trip_city = this.state.trip_city4;
    } else if (document.getElementById('citydashradio5').checked) {
      trip_city = this.state.trip_city5;
    } else if (document.getElementById('citydashradio6').checked) {
      trip_city = this.state.trip_city6;
    }

    console.log('this.state.city: ' + trip_city);
    console.log('this.state.country: ' + this.state.trip_country);    

    localStorage.setItem('sel_city', trip_city);
    localStorage.setItem('sel_country', this.state.trip_country);
    this.setState({city : trip_city});
    this.setState({country : this.state.trip_country});

    this.context.router.history.push('/tripbuild');
  }

  listCities() {
    if (document.getElementById('countrydashradio1').checked) {
      this.setState({
        trip_country : 'Albania',
        trip_city1 : 'Lushnje',
        trip_city2 : 'Kruje',
        trip_city3 : 'Vlore',
        trip_city4 : 'Elbasan',
        trip_city5 : 'Shkoder',
        trip_city6 : 'Fier'  
      })   
    } else if (document.getElementById('countrydashradio2').checked) {
      this.setState({
        trip_country : 'Andorra',
        trip_city1 : 'Cnillo',
        trip_city2 : "L'Aldosa",
        trip_city3 : "L'Armiana",
        trip_city4 : "Bordes d'Envalira",
        trip_city5 : 'El Fom',
        trip_city6 : 'Incles'  
      })   
    } else if (document.getElementById('countrydashradio3').checked) {
      this.setState({
        trip_country : 'Armenia',
        trip_city1 : 'Ashtarak',
        trip_city2 : 'Artashat',
        trip_city3 : 'Ijevan',
        trip_city4 : 'Yeghegnadzor',
        trip_city5 : 'Gavarr',
        trip_city6 : 'Gyumri'  
      })   
    } else if (document.getElementById('countrydashradio4').checked) {
      this.setState({
        trip_country : 'Austria',
        trip_city1 : 'Vienna',
        trip_city2 : 'Graz',
        trip_city3 : 'Linz',
        trip_city4 : 'Salzburg',
        trip_city5 : 'Innsbruck',
        trip_city6 : 'Klagenfurt'  
      })   
    } else if (document.getElementById('countrydashradio5').checked) {
      this.setState({
        trip_country : 'Azerbaijan',
        trip_city1 : 'Baku',
        trip_city2 : 'Sumqayt',
        trip_city3 : 'Ganca',
        trip_city4 : 'Gadabay',
        trip_city5 : 'Lankaran',
        trip_city6 : 'Goranboy'  
      })   
    } else if (document.getElementById('countrydashradio6').checked) {
      this.setState({
        trip_country : 'Belarus',
        trip_city1 : 'Minsk',
        trip_city2 : 'Barysaw',
        trip_city3 : 'Baranavichy',
        trip_city4 : 'Maladzyechna',
        trip_city5 : 'Polatsk',
        trip_city6 : 'Pinsk'  
      })   
    } else if (document.getElementById('countrydashradio7').checked) {
      this.setState({
        trip_country : 'Belgium',
        trip_city1 : 'Antwerpen',
        trip_city2 : 'Gent',
        trip_city3 : 'Charleroi',
        trip_city4 : 'Liege',
        trip_city5 : 'Brussels',
        trip_city6 : 'Bruges'  
      })   
    } else if (document.getElementById('countrydashradio8').checked) {
      this.setState({
        trip_country : 'Bosnia and Herzegovina',
        trip_city1 : 'Sarajevo',
        trip_city2 : 'Banja Luka',
        trip_city3 : 'Tulza',
        trip_city4 : 'Zenica',
        trip_city5 : 'Prijedor',
        trip_city6 : 'Mostar'  
      })   
    } else if (document.getElementById('countrydashradio9').checked) {
      this.setState({
        trip_country : 'Bulgaria',
        trip_city1 : 'Sofia',
        trip_city2 : 'Plovdiv',
        trip_city3 : 'Varna',
        trip_city4 : 'Burgas',
        trip_city5 : 'Ruse',
        trip_city6 : 'Stara Zagora'  
      })   
    } else if (document.getElementById('countrydashradio10').checked) {
      this.setState({
        trip_country : 'Croatia',
        trip_city1 : 'Zagreb',
        trip_city2 : 'Split',
        trip_city3 : 'Pula',
        trip_city4 : 'Osijek',
        trip_city5 : 'Zadar',
        trip_city6 : 'Dubrovnik'  
      })   
    } else if (document.getElementById('countrydashradio11').checked) {
      this.setState({
        trip_country : 'Cyprus',
        trip_city1 : 'Lemosos',
        trip_city2 : 'Kyrenia',
        trip_city3 : 'Limassol',
        trip_city4 : 'Larnaca',
        trip_city5 : 'Nicosia',
        trip_city6 : 'Paphos'  
      })   
    } else if (document.getElementById('countrydashradio12').checked) {
      this.setState({
        trip_country : 'Czech Republic',
        trip_city1 : 'Prague',
        trip_city2 : 'Brno',
        trip_city3 : 'Ostrava',
        trip_city4 : 'Pizen',
        trip_city5 : 'Liberec',
        trip_city6 : 'Olomouc'  
      })   
    } else if (document.getElementById('countrydashradio13').checked) {
      this.setState({
        trip_country : 'Denmark',
        trip_city1 : 'Vejle',
        trip_city2 : 'Aarhus',
        trip_city3 : 'Odense',
        trip_city4 : 'Svendborg',
        trip_city5 : 'Esbjerg',
        trip_city6 : 'Hillerod'  
      })   
    } else if (document.getElementById('countrydashradio14').checked) {
      this.setState({
        trip_country : 'Estonia',
        trip_city1 : 'Tallinn',
        trip_city2 : 'Tartu',
        trip_city3 : 'Narva',
        trip_city4 : 'Parnu',
        trip_city5 : 'Kohtla-Jarve',
        trip_city6 : 'Viljandi'  
      })   
    } else if (document.getElementById('countrydashradio15').checked) {
      this.setState({
        trip_country : 'Finland',
        trip_city1 : 'Helsinki',
        trip_city2 : 'Lappeenranta',
        trip_city3 : 'Tampere',
        trip_city4 : 'Rovaniemi',
        trip_city5 : 'Oulu',
        trip_city6 : 'Turku'  
      })   
    } else if (document.getElementById('countrydashradio16').checked) {
      this.setState({
        trip_country : 'France',
        trip_city1 : 'Paris',
        trip_city2 : 'Marseille',
        trip_city3 : 'Lyon',
        trip_city4 : 'Toulouse',
        trip_city5 : 'Nice',
        trip_city6 : 'Nantes'  
      })   
    } else if (document.getElementById('countrydashradio17').checked) {
      this.setState({
        trip_country : 'Georgia',
        trip_city1 : 'Tbilisi',
        trip_city2 : 'Batumi',
        trip_city3 : 'Kutaisi',
        trip_city4 : 'Rustavi',
        trip_city5 : 'Tskhinvali',
        trip_city6 : 'Poti'  
      })   
    } else if (document.getElementById('countrydashradio18').checked) {
      this.setState({
        trip_country : 'Germany',
        trip_city1 : 'Berlin',
        trip_city2 : 'Hamburg',
        trip_city3 : 'Munich',
        trip_city4 : 'Cologne',
        trip_city5 : 'Nurnberg',
        trip_city6 : 'Stuttgart'  
      })   
    } else if (document.getElementById('countrydashradio19').checked) {
      this.setState({
        trip_country : 'Greece',
        trip_city1 : 'Athens',
        trip_city2 : 'Thessaloniki',
        trip_city3 : 'Ioanina',
        trip_city4 : 'Larissa',
        trip_city5 : 'Volos',
        trip_city6 : 'Tripoli'  
      })   
    } else if (document.getElementById('countrydashradio20').checked) {
      this.setState({
        trip_country : 'Hungary',
        trip_city1 : 'Budapest',
        trip_city2 : 'Debrecen',
        trip_city3 : 'Szeged',
        trip_city4 : 'Miskolc',
        trip_city5 : 'Pecs',
        trip_city6 : 'Gyor'  
      })   
    } else if (document.getElementById('countrydashradio21').checked) {
      this.setState({
        trip_country : 'Iceland',
        trip_city1 : 'Reykjavik',
        trip_city2 : 'Kopavogur',
        trip_city3 : 'Hafnarfjorour',
        trip_city4 : 'Akureyri',
        trip_city5 : 'Keflavik',
        trip_city6 : 'Gardabaer'  
      })   
    } else if (document.getElementById('countrydashradio22').checked) {
      this.setState({
        trip_country : 'Ireland',
        trip_city1 : 'Dublin',
        trip_city2 : 'Cork',
        trip_city3 : 'Limerick',
        trip_city4 : 'Galway',
        trip_city5 : 'Waterford',
        trip_city6 : 'Drogheda'  
      })   
    } else if (document.getElementById('countrydashradio23').checked) {
      this.setState({
        trip_country : 'Italy',
        trip_city1 : 'Rome',
        trip_city2 : 'Milan',
        trip_city3 : 'Naples',
        trip_city4 : 'Turin',
        trip_city5 : 'Palermo',
        trip_city6 : 'Genoa'  
      })   
    } else if (document.getElementById('countrydashradio24').checked) {
      this.setState({
        trip_country : 'Kazakhstan',
        trip_city1 : 'Aktau',
        trip_city2 : 'Aktobe',
        trip_city3 : 'Almaty',
        trip_city4 : 'Arkalyk',
        trip_city5 : 'Astana',
        trip_city6 : 'Atyrau'  
      })   
    } else if (document.getElementById('countrydashradio25').checked) {
      this.setState({
        trip_country : 'Kosovo',
        trip_city1 : 'Pristina',
        trip_city2 : 'Prizren',
        trip_city3 : 'Gjjilane',
        trip_city4 : 'Pec',
        trip_city5 : 'Kosovka Mitrovica',
        trip_city6 : 'Urosevac'  
      })   
    } else if (document.getElementById('countrydashradio26').checked) {
      this.setState({
        trip_country : 'Latvia',
        trip_city1 : 'Riga',
        trip_city2 : 'Jekabpils',
        trip_city3 : 'Jelgava',
        trip_city4 : 'Jurmala',
        trip_city5 : 'Liepaja',
        trip_city6 : 'Rezekne'  
      })   
    } else if (document.getElementById('countrydashradio27').checked) {
      this.setState({
        trip_country : 'Liechtenstein',
        trip_city1 : 'Ruggell',
        trip_city2 : 'Schellenburg',
        trip_city3 : 'Gamprin',
        trip_city4 : 'Eschen',
        trip_city5 : 'Mauren',
        trip_city6 : 'Schaan'  
      })   
    } else if (document.getElementById('countrydashradio28').checked) {
      this.setState({
        trip_country : 'Lithuania',
        trip_city1 : 'Vilnius',
        trip_city2 : 'Kaunas',
        trip_city3 : 'Klaipeda',
        trip_city4 : 'Siauliai',
        trip_city5 : 'Panevezys',
        trip_city6 : 'Alytus'  
      })   
    } else if (document.getElementById('countrydashradio29').checked) {
      this.setState({
        trip_country : 'Luxembourg',
        trip_city1 : 'Diekirch',
        trip_city2 : 'Differdange',
        trip_city3 : 'Dudelange',
        trip_city4 : 'Echternach',
        trip_city5 : 'Esch-sur-Alzette',
        trip_city6 : 'Ettelbruck'  
      })   
    } else if (document.getElementById('countrydashradio30').checked) {
      this.setState({
        trip_country : 'Macedonia',
        trip_city1 : 'Skopje',
        trip_city2 : 'Bitola',
        trip_city3 : 'Kumanovo',
        trip_city4 : 'Prilep',
        trip_city5 : 'Tetovo',
        trip_city6 : 'Veles'  
      })   
    } else if (document.getElementById('countrydashradio31').checked) {
      this.setState({
        trip_country : 'Malta',
        trip_city1 : 'Birgu',
        trip_city2 : 'Bormla',
        trip_city3 : 'Mdina',
        trip_city4 : 'Qormi',
        trip_city5 : 'Rabat',
        trip_city6 : 'Senglea'  
      })   
    } else if (document.getElementById('countrydashradio32').checked) {
      this.setState({
        trip_country : 'Moldova',
        trip_city1 : 'Chisinau',
        trip_city2 : 'Tiraspol',
        trip_city3 : 'Balti',
        trip_city4 : 'Bender',
        trip_city5 : 'Ribnita',
        trip_city6 : 'Cahul'  
      })   
    } else if (document.getElementById('countrydashradio33').checked) {
      this.setState({
        trip_country : 'Monaco',
        trip_city1 : 'test1',
        trip_city2 : 'test2',
        trip_city3 : 'test3',
        trip_city4 : 'test4',
        trip_city5 : 'test5',
        trip_city6 : 'test6'  
      })   
    } else if (document.getElementById('countrydashradio34').checked) {
      this.setState({
        trip_country : 'Montenegro',
        trip_city1 : 'Podgorica',
        trip_city2 : 'Niksic',
        trip_city3 : 'Pljevlja',
        trip_city4 : 'Bijelo Polje',
        trip_city5 : 'Cetinje',
        trip_city6 : 'Bar'  
      })   
    } else if (document.getElementById('countrydashradio35').checked) {
      this.setState({
        trip_country : 'Netherlands',
        trip_city1 : 'Amsterdam',
        trip_city2 : 'Rotterdam',
        trip_city3 : 'The Hague',
        trip_city4 : 'Utrecht',
        trip_city5 : 'Eindhoven',
        trip_city6 : 'Tilburg'  
      })   
    } else if (document.getElementById('countrydashradio36').checked) {
      this.setState({
        trip_country : 'Norway',
        trip_city1 : 'Oslo',
        trip_city2 : 'Bergen',
        trip_city3 : 'Trondheim',
        trip_city4 : 'Stavanger',
        trip_city5 : 'Kristiansand',
        trip_city6 : 'Sandnes'  
      })   
    } else if (document.getElementById('countrydashradio37').checked) {
      this.setState({
        trip_country : 'Poland',
        trip_city1 : 'Warsaw',
        trip_city2 : 'Krakow',
        trip_city3 : 'Lodz',
        trip_city4 : 'Wroclaw',
        trip_city5 : 'Poznan',
        trip_city6 : 'Gdansk'  
      })   
    } else if (document.getElementById('countrydashradio38').checked) {
      this.setState({
        trip_country : 'Portugal',
        trip_city1 : 'Libson',
        trip_city2 : 'Porto',
        trip_city3 : 'Vila Nova de Gaia',
        trip_city4 : 'Amadora',
        trip_city5 : 'Braga',
        trip_city6 : 'Coimbra'  
      })   
    } else if (document.getElementById('countrydashradio39').checked) {
      this.setState({
        trip_country : 'Romania',
        trip_city1 : 'Bucharest',
        trip_city2 : 'Cluj-Napoca',
        trip_city3 : 'Timisoara',
        trip_city4 : 'Iasi',
        trip_city5 : 'Constanta',
        trip_city6 : 'Craiova'  
      })   
    } else if (document.getElementById('countrydashradio40').checked) {
      this.setState({
        trip_country : 'Russia',
        trip_city1 : 'Moscow',
        trip_city2 : 'Saint Petersburg',
        trip_city3 : 'Novosibirsk',
        trip_city4 : 'Yekaterinburg',
        trip_city5 : 'Nizhny Novgorod',
        trip_city6 : 'Kazan'  
      })   
    } else if (document.getElementById('countrydashradio41').checked) {
      this.setState({
        trip_country : 'San Marino',
        trip_city1 : 'test1',
        trip_city2 : 'test2',
        trip_city3 : 'test3',
        trip_city4 : 'test4',
        trip_city5 : 'test5',
        trip_city6 : 'test6'  
      })   
    } else if (document.getElementById('countrydashradio42').checked) {
      this.setState({
        trip_country : 'Serbia',
        trip_city1 : 'Belgrade',
        trip_city2 : 'Novi Sad',
        trip_city3 : 'Nis',
        trip_city4 : 'Kragujevac',
        trip_city5 : 'Subotica',
        trip_city6 : 'Zrenjanin'  
      })   
    } else if (document.getElementById('countrydashradio43').checked) {
      this.setState({
        trip_country : 'Slovakia',
        trip_city1 : 'Bratislava',
        trip_city2 : 'Kosice',
        trip_city3 : 'Presov',
        trip_city4 : 'Zilina',
        trip_city5 : 'Nitra',
        trip_city6 : 'Banska Bystrica'  
      })   
    } else if (document.getElementById('countrydashradio44').checked) {
      this.setState({
        trip_country : 'Slovenia',
        trip_city1 : 'Ljubljana',
        trip_city2 : 'Maribor',
        trip_city3 : 'Celje',
        trip_city4 : 'Kranj',
        trip_city5 : 'Velenje',
        trip_city6 : 'Koper'  
      })   
    } else if (document.getElementById('countrydashradio45').checked) {
      this.setState({
        trip_country : 'Spain',
        trip_city1 : 'Madrid',
        trip_city2 : 'Barcelona',
        trip_city3 : 'Valencia',
        trip_city4 : 'Seville',
        trip_city5 : 'Zaragoza',
        trip_city6 : 'Malaga'  
      })   
    } else if (document.getElementById('countrydashradio46').checked) {
      this.setState({
        trip_country : 'Sweden',
        trip_city1 : 'Stockholm',
        trip_city2 : 'Gothenburg',
        trip_city3 : 'Malmo',
        trip_city4 : 'Uppsala',
        trip_city5 : 'Vasteras',
        trip_city6 : 'Orebro'  
      })   
    } else if (document.getElementById('countrydashradio47').checked) {
      this.setState({
        trip_country : 'Switzerland',
        trip_city1 : 'Zurich',
        trip_city2 : 'Geneva',
        trip_city3 : 'Basel',
        trip_city4 : 'Lausanne',
        trip_city5 : 'Bern',
        trip_city6 : 'Winterthur'  
      })   
    } else if (document.getElementById('countrydashradio48').checked) {
      this.setState({
        trip_country : 'Turkey',
        trip_city1 : 'Istanbul',
        trip_city2 : 'Ankara',
        trip_city3 : 'Izmir',
        trip_city4 : 'Bursa',
        trip_city5 : 'Adana',
        trip_city6 : 'Gaziantep'  
      })   
    } else if (document.getElementById('countrydashradio49').checked) {
      this.setState({
        trip_country : 'Ukraine',
        trip_city1 : 'Kyiv',
        trip_city2 : 'Kharkiv',
        trip_city3 : 'Dnipro',
        trip_city4 : 'Odesa',
        trip_city5 : 'Donetsk',
        trip_city6 : 'Zaporizhia'  
      })   
    } else if (document.getElementById('countrydashradio50').checked) {
      this.setState({
        trip_country : 'United Kingdom',
        trip_city1 : 'London',
        trip_city2 : 'Birmingham',
        trip_city3 : 'Leeds',
        trip_city4 : 'Glasgow',
        trip_city5 : 'Sheffield',
        trip_city6 : 'Manchester'  
      })   
    }
  }

  deleteData(id){
    axios.get(`${ROOT_URL}/remove_itin`+id)
    .then().catch(err => console.log(err))
  }

  tabRow(){
    if(saved_itineraries instanceof Array){
      return saved_itineraries.map(function(object, i){
          return <TableRow obj={object} key={i} />;
      })
    }
  }

  componentWillMount() {
    const user_email = localStorage.getItem('userEmail');
    axios.post(`${ROOT_URL}/get_itin`, { user_email })
      .then(response => {
        saved_itineraries = response.data.payload;
        this.setState({itins_retrieved : true});
      })
      .catch(err => {
        this.setState({itins_retrieved : false});        
      })
  }

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
    
    const itins_retrieved = this.state.itins_retrieved;
    if (!itins_retrieved) {
      return <div>Loading.......</div>;
    }
    return (      
      <div>
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
  <div className='dashboard'>
        <h3 style={{textAlign: "center"}}><strong>Dashboard</strong></h3>
        <div className='col-md-6'>
          <h4><strong>Your Previously saved Itineraries</strong></h4>
          <Table  className="table table-striped">
              <thead>
                <tr>
                  <td><strong>Country</strong></td>
                  <td><strong>Itinerary Type</strong></td>
                  <td><strong>Place</strong></td>
                </tr>
              </thead>
              <tbody>
                {this.tabRow()}
              </tbody>
            </Table>
        </div>
        <br/><br/>
        <h3>Search for your New Vacation!</h3>
        <Autocomplete style={{width:'30%'}} 
          onPlaceSelected={(place) => {

          let selectedlatlong = place.geometry.location.toString();
          let selLat = '';
          let selLng = '';
          let onlng = false;  

          //console.log('selectedlatlong: ' + selectedlatlong);
          //console.log('selectedlatlong.length: ' + selectedlatlong.length);
          for (let i =0; i < selectedlatlong.length; i++) {
            if(onlng === false) {
              if ( i !== 0 && selectedlatlong[i] !== ',' ) {
                selLat = selLat.concat(selectedlatlong[i]);
              } else if (selectedlatlong[i] === ',') {
                onlng = true;
              }
            } else if(onlng === true && selectedlatlong[i] !== ')' && selectedlatlong[i] !== ' ') {
              selLng = selLng.concat(selectedlatlong[i]);
            }
          } // end for loop
          //console.log('selectedlatlong: ' + selectedlatlong);
          //console.log('Lat = '  + selLat + ' || Lng = ' + selLng);
          this.props.addLocation(selLat, selLng, place.place_id);
          console.log(this.props);
          console.log(place);
          localStorage.setItem('trip_lat', selLat);
          localStorage.setItem('trip_lng', selLng);
          localStorage.setItem('sel_city', place.address_components[0].long_name);
          localStorage.setItem('sel_country', place.address_components[2].long_name)  // length = 3
          if(place.address_components.length > 3){
            localStorage.setItem('sel_country', place.address_components[3].long_name);
          }else if (place.address_components.length < 3){
            localStorage.setItem('sel_country', place.address_components[2].short_name);

          }

          //localStorage.setItem('trip_lat', place.address_components[0].long_name);
          //localStorage.setItem('trip_lng', place.address_components[3].short_name);
          this.context.router.history.push('/manualBuild');
         
        
          

          }}  // end onPlaceSelected
          types={['(regions)']}
        />
        <form action='/dashboard' onChange={this.listCities.bind(this)}>
        <div className='col-md-2'>
          <h2>Select Country:</h2>
            <div className='dashradio'>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='countrydashradio1' />
                <label>Albania</label>
              </div>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='countrydashradio2' />
                <label>Andorra</label>
              </div>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='countrydashradio3' />
                <label>Armenia</label>
              </div>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='countrydashradio4' />
                <label>Austria</label>
              </div>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='countrydashradio5' />
                <label>Azerbaijan</label>
              </div>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='countrydashradio6' />
                <label>Belarus</label>
              </div>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='countrydashradio7' />
                <label>Belgium</label>
              </div>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='countrydashradio8' />
                <label>Bosnia and Herzegovina</label>
              </div>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='countrydashradio9' />
                <label>Bulgaria</label>
              </div>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='countrydashradio10' />
                <label>Croatia</label>
              </div>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='countrydashradio11' />
                <label>Cyprus</label>
              </div>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='countrydashradio12' />
                <label>Czech Republic</label>
              </div>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='countrydashradio13' />
                <label>Denmark</label>
              </div>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='countrydashradio14' />
                <label>Estonia</label>
              </div>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='countrydashradio15' />
                <label>Finland</label>
              </div>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='countrydashradio16' />
                <label>France</label>
              </div>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='countrydashradio17' />
                <label>Georgia</label>
              </div>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='countrydashradio18' />
                <label>Germany</label>
              </div>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='countrydashradio19' />
                <label>Greece</label>
              </div>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='countrydashradio20' />
                <label>Hungary</label>
              </div>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='countrydashradio21' />
                <label>Iceland</label>
              </div>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='countrydashradio22' />
                <label>Ireland</label>
              </div>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='countrydashradio23' />
                <label>Italy</label>
              </div>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='countrydashradio24' />
                <label>Kazakhstan</label>
              </div>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='countrydashradio25' />
                <label>Kosovo</label>
              </div>
            </div>
          </div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <div className='col-md-2'>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='countrydashradio26' />
                <label>Latvia</label>
              </div>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='countrydashradio27' />
                <label>Liechtenstein</label>
              </div>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='countrydashradio28' />
                <label>Lithuania</label>
              </div>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='countrydashradio29' />
                <label>Luxembourg</label>
              </div>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='countrydashradio30' />
                <label>Macedonia</label>
              </div>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='countrydashradio31' />
                <label>Malta</label>
              </div>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='countrydashradio32' />
                <label>Moldova</label>
              </div>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='countrydashradio33' />
                <label>Monaco</label>
              </div>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='countrydashradio34' />
                <label>Montenegro</label>
              </div>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='countrydashradio35' />
                <label>Netherlands</label>
              </div>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='countrydashradio36' />
                <label>Norway</label>
              </div>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='countrydashradio37' />
                <label>Poland</label>
              </div>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='countrydashradio38' />
                <label>Portugal</label>
              </div>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='countrydashradio39' />
                <label>Romania</label>
              </div>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='countrydashradio40' />
                <label>Russia</label>
              </div>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='countrydashradio41' />
                <label>San Marino</label>
              </div>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='countrydashradio42' />
                <label>Serbia</label>
              </div>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='countrydashradio43' />
                <label>Slovakia</label>
              </div>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='countrydashradio44' />
                <label>Slovenia</label>
              </div>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='countrydashradio45' />
                <label>Spain</label>
              </div>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='countrydashradio46' />
                <label>Sweden</label>
              </div>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='countrydashradio47' />
                <label>Switzerland</label>
              </div>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='countrydashradio48' />
                <label>Turkey</label>
              </div>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='countrydashradio49' />
                <label>Ukraine</label>
              </div>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='countrydashradio50' />
                <label>United Kingdom</label>
              </div>
          </div>
          </form>


          <div className='col-md-2'>
          <h2>Select City:</h2>
          <form action='/tripbuild' onSubmit={this.handleFormSubmit.bind(this)}>
            <div className='dashradio'>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='citydashradio1' />
                <label>{this.state.trip_city1}</label>
              </div>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='citydashradio2' />
                <label>{this.state.trip_city2}</label>
              </div>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='citydashradio3' />
                <label>{this.state.trip_city3}</label>
              </div>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='citydashradio4' />
                <label>{this.state.trip_city4}</label>
              </div>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='citydashradio5' />
                <label>{this.state.trip_city5}</label>
              </div>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='citydashradio6' />
                <label>{this.state.trip_city6}</label>
              </div>
            </div>
            <button className='btn btn-default' type='submit'>
              Create Custom Itinerary
            </button>
            <div>
              <strong>or</strong>
            </div>
          </form>
          
        <button onClick={this.onHotelClick.bind(this)} className='btn btn-default'>Search Hotels</button>
        <button onClick={this.findLocation.bind(this)} className='btn btn-default'>Find Places Near You</button>

        </div>
        </div>
        
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

const mapStatetoProps = (state) => ({
  itins_retrieved: state.itins_retrieved,
  state:state
});
function mapDispatchToProps(dispatch){
  return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStatetoProps,mapDispatchToProps)(Dashboard);
