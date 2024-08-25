import React, { useState, useMemo } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
const regions = {
  Coimbatore: {
    districts: {
      'Namakal': [
        { motherVillage: 'Namakal', hamletVillage: ['Namakal', 'Erumapatty', 'Mohanur', 'Sendamangalam', 'V.V.Nadu', 'Sengarai', 'Puduchatram', 'Nallipalayam'] },
        { motherVillage: 'Rasipuram', hamletVillage: ['Rasipuram', 'Vennandur', 'Nanagiripet', 'Belukurichi', 'Ayilpatty', 'Mangalapuram'] },
        { motherVillage: 'Tiruchengode', hamletVillage: ['T.gode Town', 'T.gode Rural', 'Mallasamudram', 'Elachipalayam', 'Pallipalayam', 'Molasi', 'Veppadai', 'Komarupalayam'] },
        { motherVillage: 'Velur', hamletVillage: ['Velur', 'Paramathi', 'Jedarpalayam', 'V.G.Patty', 'Nallur'] },
      ],
      'Erode': [
        { motherVillage: 'Pallipalyam', hamletVillage: ['Kaveri', 'Koko'] },
        { motherVillage: 'Karungalpalayam', hamletVillage: ['K.S.Nagar', 'Periyar'] },
      ],
    },
  },
  Salem: {
    districts: {
      'Salem': [
        { motherVillage: 'Salem', hamletVillage: ['Salem', 'Kandhampatty', 'Kannankurichi', 'Mettur', 'Omalur'] },
        { motherVillage: 'Omalur', hamletVillage: ['Kollapatty', 'Omalur', 'Salem City', 'Kalipatti', 'Elampillai'] },
        { motherVillage: 'Attur', hamletVillage: ['Elampillai', 'Kalipatti', 'Salem City', 'Muthampatti', 'Thoppur'] },
        { motherVillage: 'Mettur', hamletVillage: ['Muthampatti', 'Thoppur', 'Mettur', 'Kandhampatty', 'Omalur'] },
      ],
    },
  },
};

const initialItems = [
  { id: 1, idolId: 12, hamletVillage: 'Namakal', place: 'Lake', type: 'Public', date: '2024-08-20', status: 'INCOMPLETE', district: 'Namakal', region: 'Coimbatore' },
  { id: 2, idolId: 123, hamletVillage: 'Nallur', place: 'River', type: 'Private', date: '2024-08-21', status: 'COMPLETE', district: 'Namakal', region: 'Coimbatore' },
  { id: 4, idolId: 13, hamletVillage: 'Periyar', place: 'River', type: 'Private', date: '2024-08-23', status: 'COMPLETE', district: 'Erode', region: 'Coimbatore' },
  { id: 3, idolId: 1234, hamletVillage: 'Thoppur', place: 'Ashram', type: 'Organisation', date: '2024-08-22', status: 'INCOMPLETE', district: 'Salem', region: 'Salem' },
];

const filterData = (data, { selectedRegion, selectedDistrict, selectedPlace, selectedSubPlace, typeFilter, statusFilter, selectedDate }) => {
  const regionData = regions[selectedRegion];
  const districtData = regionData?.districts[selectedDistrict] || [];
  const placeData = districtData.find(place => place.motherVillage === selectedPlace);
  const validLocations = placeData ? [selectedPlace, ...placeData.hamletVillage] : [];

  return data.filter((item) =>
    (selectedRegion === '' || item.region === selectedRegion) &&
    (selectedDistrict === '' || item.district === selectedDistrict) &&
    (validLocations.length === 0 || validLocations.includes(item.hamletVillage)) &&
    (selectedSubPlace === '' || item.hamletVillage === selectedSubPlace) &&
    (typeFilter === 'all' || item.type === typeFilter) &&
    (statusFilter === 'all' || item.status === statusFilter) &&
    (selectedDate === '' || item.date === selectedDate)
  );
};

const sortData = (data, sortField, sortOrder) => {
  if (!sortField) return data;
  return [...data].sort((a, b) => {
    if (a[sortField] < b[sortField]) {
      return sortOrder === 'asc' ? -1 : 1;
    }
    if (a[sortField] > b[sortField]) {
      return sortOrder === 'asc' ? 1 : -1;
    }
    return 0;
  });
};

function App() {
  const [tableData] = useState(initialItems);
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedPlace, setSelectedPlace] = useState('');
  const [selectedSubPlace, setSelectedSubPlace] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedDate, setSelectedDate] = useState('');

  const handleSort = (field) => {
    setSortField(field);
    setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleTypeFilter = (event) => {
    setTypeFilter(event.target.value);
  };

  const handleStatusFilter = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleRegionChange = (event) => {
    setSelectedRegion(event.target.value);
    setSelectedDistrict('');
    setSelectedPlace('');
    setSelectedSubPlace('');
  };

  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
    setSelectedPlace('');
    setSelectedSubPlace('');
  };

  const handlePlaceChange = (event) => {
    setSelectedPlace(event.target.value);
    setSelectedSubPlace('');
  };

  const handleSubPlaceChange = (event) => {
    setSelectedSubPlace(event.target.value);
  };

  const filteredData = useMemo(() => 
    filterData(tableData, { selectedRegion, selectedDistrict, selectedPlace, selectedSubPlace, typeFilter, statusFilter, selectedDate }), 
    [tableData, selectedRegion, selectedDistrict, selectedPlace, selectedSubPlace, typeFilter, statusFilter, selectedDate]
  );

  const sortedData = useMemo(() => 
    sortData(filteredData, sortField, sortOrder), 
    [filteredData, sortField, sortOrder]
  );

  const selectedDistrictData = regions[selectedRegion]?.districts[selectedDistrict] || [];
  const selectedPlaceData = selectedDistrictData.find(place => place.motherVillage === selectedPlace);

  const headerText = selectedDistrict ? `${selectedDistrict}` : '';

  return (
    <div className='mx-5 my-2 ig-viewDiv'>
      <p className="h1 text-center  mt-2 mb-3">{headerText} District</p>
      <div className="row mb-5" id="ig-filters">
      <div className="col-lg-3 my-2">
        <label className="me-sm-2  mb-2">
          Region: </label>
          <select className="form-select" value={selectedRegion} onChange={handleRegionChange}>
            <option value="">Select Region</option>
            {Object.keys(regions).map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select></div>
          <div className="col-lg-3 my-2">
        <label className="me-sm-2  mb-2">
          District:</label>
          <select className="form-select" value={selectedDistrict} onChange={handleDistrictChange} disabled={!selectedRegion}>
            <option value="">Select District</option>
            {Object.keys(regions[selectedRegion]?.districts || {}).map(district => (
              <option key={district} value={district}>{district}</option>
            ))}
          </select>
        </div>
        <div className="col-lg-3 my-2">
        <label className="me-sm-2  mb-2">
          Sub-Division: </label>
          <select  className="form-select" value={selectedPlace} onChange={handlePlaceChange} disabled={!selectedDistrict}>
            <option value="">Select Division</option>
            {selectedDistrictData.map(place => (
              <option key={place.motherVillage} value={place.motherVillage}>{place.motherVillage}</option>
            ))}
          </select>
       </div>
        <div className="col-lg-3 my-2">
        <label className="me-sm-2  mb-2">
          Police Station: </label>
          <select className="form-select" value={selectedSubPlace} onChange={handleSubPlaceChange} disabled={!selectedPlace}>
            <option value="">Select Police Station</option>
            {selectedPlaceData?.hamletVillage.map(subPlace => (
              <option key={subPlace} value={subPlace}>{subPlace}</option>
            ))}
          </select>
       </div>
        <div className="col-lg-2 my-2">
        <label className="me-sm-2  mb-2">
          Type:</label>
          <select  className="form-select" value={typeFilter} onChange={handleTypeFilter}>
            <option value="all">All</option>
            <option value="Private">Private</option>
            <option value="Public">Public</option>
            <option value="Organisation">Organisation</option>
          </select>
        </div>
        <div className="col-lg-3 my-2">
        <label className="me-sm-2  mb-2">
          Status:</label>
          <select className="form-select" value={statusFilter} onChange={handleStatusFilter}>
            <option value="all">All</option>
            <option value="COMPLETE">Complete</option>
            <option value="INCOMPLETE">Incomplete</option>
          </select>
        </div>
        <div className="col-lg-2 my-2">
        <label>
          Date:</label>
          <input className="form-control" type="date" value={selectedDate} onChange={handleDateChange} />
        
     </div></div>
     <div className="table-responsive-lg ">
      <table className="table table-light table-striped table-hover">
        <thead>
          <tr>
            <th className="ig-view-table-head" onClick={() => handleSort('id')}>ID</th>
            <th className="ig-view-table-head" onClick={() => handleSort('idolId')}>Idol ID</th>
            <th className="ig-view-table-head" onClick={() => handleSort('hamletVillage')}>Location of Installation</th>
            <th className="ig-view-table-head" onClick={() => handleSort('place')}>Place of Immersion</th>
            <th className="ig-view-table-head" onClick={() => handleSort('type')}>Type</th>
            <th className="ig-view-table-head" onClick={() => handleSort('date')}>Date of Immersion</th>
            <th className="ig-view-table-head" onClick={() => handleSort('status')}>Status</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map(item => (
            <tr key={item.id}>
              <td className="ig-view-table-col">{item.id}</td>
              <td className="ig-view-table-col">{item.idolId}</td>
              <td className="ig-view-table-col">{item.hamletVillage}</td>
              <td className="ig-view-table-col">{item.place}</td>
              <td className="ig-view-table-col">{item.type}</td>
              <td className="ig-view-table-col">{item.date}</td>
              <td className="ig-view-table-col">{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table></div>
    </div>
  );
}

export default App;
