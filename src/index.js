import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { MapContainer, TileLayer, Marker, Popup, } from 'react-leaflet';
import L from 'leaflet';
import './index.css';
import './styles.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';



function HelloWorld() {
  return <h1 className="greeting">Hello, world!</h1>;
}

//var dropDownOptions = []

async function callApi() {
 
  
const selectedValue = document.getElementById('cameras').value;

/*const res = await fetch("https://api-inicosiadt.cyens.org.cy/api/smartnicosia-nokia/traffic/analytics/",
{ method: 'GET', headers:{
  Authorization : 'Basic ' + process.env.REACT_APP_API_TOKEN
} })
const data = await res.json()
const cameres = data.analytics
dropDownOptions = cameres.map(camera => {
  return {
    label: camera.name,
    value: camera.id,
  }
})
console.log(dropDownOptions);*/

// const cameres = res.json()

// const dropDownOptions = cameres.map(camera => { return {
//   label: camera.name,
//   value: camera.id,
// }})


  var time= Date.now()-3600000;
  var period=time-10800000;
  
  var obj1;

  var obj2 =await fetch(`https://api-inicosiadt.cyens.org.cy/api/smartnicosia-nokia/traffic/traffic-reports/?va_ids=%5B${selectedValue}%5D&group_by=hour&start_date=${period}&end_date=${time}    `, { method: 'GET', headers:{Authorization : 'Basic ' + process.env.REACT_APP_API_TOKEN} })
    //.then(data => data.json()) // Parsing the data into a JavaScript object
    //.then(json => {JSON.stringify(json)})// Displaying the stringified data in an alert popup
   obj1=await obj2.json();
   //alert(JSON.stringify(obj1));
   
   var people = obj1.data.group_by[0].data[0]==undefined ? "" : obj1.data.group_by[0].data[0].total;
  // var bikes="";
  document.getElementById("people").innerHTML="People 👥: "+people;
  var bikes=obj1.data.group_by[0].data[1]==undefined ? "" : obj1.data.group_by[0].data[1].total;
  document.getElementById("bikes").innerHTML="Bikes 🚲: "+bikes;
   var cars=obj1.data.group_by[0].data[2]==undefined ? "" : obj1.data.group_by[0].data[2].total;
   //var motorcycles="";
   document.getElementById("cars").innerHTML="Cars 🚗: "+cars;
   var motorcycles= obj1.data.group_by[0].data[3]==undefined ? "": obj1.data.group_by[0].data[3].total;
   document.getElementById("motorcycles").innerHTML="Motorcycles 🛵: "+motorcycles;
   var buses=obj1.data.group_by[0].data[4]==undefined ? "": obj1.data.group_by[0].data[4].total;
   document.getElementById("buses").innerHTML="Buses 🚌: "+buses;
   var trucks=obj1.data.group_by[0].data[5]==undefined ? "":obj1.data.group_by[0].data[5].total;
   document.getElementById("trucks").innerHTML="Trucks ⛟: "+trucks;
   var time=obj1.data.group_by[0].key;
   document.getElementById("time").innerHTML="Time ⏱️: "+time;
   var people1 =obj1.data.group_by[1].data[0]== undefined ? "":obj1.data.group_by[1].data[0].total;
   document.getElementById("people1").innerHTML="People 👥: "+people1;
   var bikes1=obj1.data.group_by[1].data[1]==undefined ? "":obj1.data.group_by[1].data[1].total;
  // var bikes1="";
  document.getElementById("bikes1").innerHTML="Bikes 🚲: "+bikes1;
   var cars1=obj1.data.group_by[1].data[2]==undefined? "":obj1.data.group_by[1].data[2].total;
   document.getElementById("cars1").innerHTML="Cars 🚗: "+cars1;
   var motorcycles1=obj1.data.group_by[1].data[3]==undefined? "": obj1.data.group_by[1].data[3].total;
  // var motorcycles1="";
  document.getElementById("motorcycles1").innerHTML="Motorcycles 🛵: "+motorcycles1;
   var buses1=obj1.data.group_by[1].data[4]==undefined ? "":obj1.data.group_by[1].data[4].total;
   document.getElementById("buses1").innerHTML="Buses 🚌: "+buses1;
   var trucks1=obj1.data.group_by[1].data[5]==undefined ? "":obj1.data.group_by[1].data[5].total;
   document.getElementById("trucks1").innerHTML="Trucks ⛟: "+trucks1;
   var time1=obj1.data.group_by[1].key;
   document.getElementById("time1").innerHTML="Time ⏱️: "+time1;
   //alert("Agora Agiou Ant. (Digeni Akrita pros Aglantzia)\n"+"People:"+people+"\nBikes:"+bikes+"\nCars:"+cars+"\nMotorcycles:"+motorcycles+"\nBuses:"+buses+"\nTrucks:"+trucks+"\nTime:"+time+"\n\nPeople:"+people1+"\nBikes:"+bikes1+"\nCars:"+cars1+"\nMotorcycles:"+motorcycles1+"\nBuses:"+buses1+"\nTrucks:"+trucks1+"\nTime:"+time1);
   //alert(JSON.stringify(obj1));

}
const cameraLocations = {
  '88': { lat: 35.1681,lng: 33.3711, name: "Agora Agiou Ant. (Digeni Akrita pros Aglantzia)" },
  '85': { lat: 35.1667, lng: 33.3667, name: "A. Leventi (Ethniki Froura) IN" },
  '84': { lat: 35.1670, lng: 33.3670, name: "A. Leventi (Entry) IN" },
  '83': { lat: 35.1626611, lng: 33.3631584, name: "Makariou Avenue Cam 12 - LPR" },
  '69': { lat: 35.1658328, lng: 33.3560548, name: "Stasikratous cam10" },
  '31': { lat: 35.1787719, lng: 33.3755368, name: "Kyriakou Matsi cam01" },
};

function App() {
  const [selectedCamera, setSelectedCamera] = useState('88');
  const [trafficData, setTrafficData] = useState({});
  const [location, setLocation] = useState(cameraLocations[selectedCamera]);

  function handleCameraSelect(event) {
    const cameraId = event.target.value;
    setSelectedCamera(cameraId);
    setLocation(cameraLocations[cameraId]);
    fetchTrafficData(cameraId);
  }

  useEffect(() => {
    setLocation(cameraLocations[selectedCamera]);
    document.title = `Traffic Report`;
  }, [selectedCamera]);
  
  async function fetchTrafficData(cameraId) {
    const time = Date.now() - 3600000;
    const period = time - 10800000;
    const url = `https://api-inicosiadt.cyens.org.cy/api/smartnicosia-nokia/traffic/traffic-reports/?va_ids=[${cameraId}]&group_by=hour&start_date=${period}&end_date=${time}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: { Authorization: 'Basic ' + process.env.REACT_APP_API_TOKEN }
    });
    const data = await response.json();
    setTrafficData(data);
  }

  useEffect(() => {
    fetchTrafficData(selectedCamera);
  }, []);
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to The Traffic App</h1>
        <p>Check out the latest traffic reports</p>
      </header>
      <main>
        <section className="traffic-reports-1">
          <h2>Traffic Reports</h2>
          <h2>Select Camera</h2>
            <select id="cameras" onChange={handleCameraSelect} class="camera-selector-2">
                <option value="88">Agora Agiou Ant. (Digeni Akrita pros Aglantzia)</option>
                <option value="85">A. Leventi (Ethniki Froura) IN</option>
                <option value="84">A. Leventi (Entry) IN</option>
                <option value="83">Makariou Avenue Cam 12 - LPR</option>
                <option value="69">Stasikratous cam10</option>
                <option value="31">Kyriakou Matsi cam01</option>
            </select>
            <button onClick={callApi}>SEARCH</button>
        </section>
        <section className="camera-selector">

        </section>
        <section className="traffic-reports">
          <MapContainer center={[location.lat, location.lng]} zoom={13} scrollWheelZoom={true} key={selectedCamera} style={{ height: '400px', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker key={location.lat + location.lng} position={[location.lat, location.lng]}>
              <Popup>{location.name}</Popup>
            </Marker>
          </MapContainer>
        </section>
      </main>
      <footer>
        <p id="people"></p>
        <p id="bikes"></p>
        <p id="cars"></p>
        <p id="motorcycles"></p>
        <p id="buses"></p>
        <p id="trucks"></p>
        <p id="time"></p>
        <br />
        <p id="people1"></p>
        <p id="bikes1"></p>
        <p id="cars1"></p>
        <p id="motorcycles1"></p>
        <p id="buses1"></p>
        <p id="trucks1"></p>
        <p id="time1"></p>
      </footer>
    </div>
  );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

