import { useState, useEffect } from "react";
import axios from "axios";
import { FaPlaneDeparture, FaPlaneArrival, FaCalendarAlt, FaUser, FaDollarSign } from "react-icons/fa";
import PropTypes from 'prop-types';

const FlightSearchForm = ({ setFlights }) => {
    const [airportCodes, setAirportCodes] = useState({});
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [date, setDate] = useState("");
    const [cabinClass, setCabinClass] = useState("economy");
    const [adults, setAdults] = useState(1);
    const [sortBy, setSortBy] = useState("best");
    const [currency, setCurrency] = useState("USD");

    useEffect(() => {
        const fetchAirports = async () => {
            try {
                const API_KEY = "9fd6bb7dd2msh66ec487a7374915p1db3c3jsnc703b92ce2be";
                const BASE_URL = "https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport";

                const response = await axios.get(BASE_URL, {
                    headers: {
                        "X-RapidAPI-Host": "sky-scrapper.p.rapidapi.com",
                        "X-RapidAPI-Key": API_KEY,
                    },
                    params: {
                        query: "new",
                        locale: "en-US"
                    }
                });

                console.log("API Response:", response.data);

                const airports = response.data?.data;
                if (airports && Array.isArray(airports)) {
                    const newAirportCodes = {};
                    airports.forEach((airport) => {
                        const city = airport.city;
                        newAirportCodes[city] = {
                            skyId: airport.skyId,
                            entityId: airport.entityId,
                        };
                    });
                    setAirportCodes(newAirportCodes);
                }
            } catch (error) {
                console.error("Airport fetch error: ", error);
            }
        };

        fetchAirports();
    }, []);

    const searchFlights = async (fromAirport, toAirport, date) => {
        if (!fromAirport || !toAirport || !date) {
            console.error("Invalid parameters for flight search");
            return null;
        }

        const url = `https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchFlights?originSkyId=${fromAirport.skyId}&destinationSkyId=${toAirport.skyId}&originEntityId=${fromAirport.entityId}&destinationEntityId=${toAirport.entityId}&date=${date}&cabinClass=${cabinClass}&adults=${adults}&sortBy=${sortBy}&currency=${currency}&market=en-US&countryCode=US`;

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '9fd6bb7dd2msh66ec487a7374915p1db3c3jsnc703b92ce2be',
                'X-RapidAPI-Host': 'sky-scrapper.p.rapidapi.com'
            }
        };

        console.log("Flight Search Parameters:", {
            fromAirport,
            toAirport,
            date
        });

        try {
            const response = await fetch(url, options);
            const data = await response.json();

            if (!data || data.status === false) {
                console.error("API Error:", data?.message || "Unknown Error");
                return null;
            }

            return data;
        } catch (error) {
            console.error("API Fetch Error:", error);
            return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!from || !to || !date) {
            console.error("Invalid input values.");
            return;
        }

        const fromAirport = airportCodes[from] || { skyId: "NYCA", entityId: "27537542" };
        const toAirport = airportCodes[to] || { skyId: "LON", entityId: "12345678" };

        const formattedDate = new Date(date).toISOString().split("T")[0];

        console.log("From Airport Object:", fromAirport);
        console.log("To Airport Object:", toAirport);

        try {
            const results = await searchFlights(fromAirport, toAirport, formattedDate);
            console.log("Search Results:", results);

            if (!results) {
                setFlights([]);
                return;
            }

            setFlights(results.flights || []);
        } catch (error) {
            console.error("Search Flights Error:", error);
            setFlights([]);
        }
    };


    return (
        <form className="p-6 bg-white shadow-lg rounded-xl max-w-lg mx-auto space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                    <label className="block text-gray-600 text-sm font-medium mb-1">From</label>
                    <div className="relative flex items-center">
                        <FaPlaneDeparture className="absolute left-3 text-gray-400" />
                        <input
                            type="text"
                            value={from}
                            onChange={(e) => setFrom(e.target.value)}
                            className="w-full p-2 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-400"
                            placeholder="New York"
                        />
                    </div>
                </div>
                <div className="relative">
                    <label className="block text-gray-600 text-sm font-medium mb-1">To</label>
                    <div className="relative flex items-center">
                        <FaPlaneArrival className="absolute left-3 text-gray-400" />
                        <input
                            type="text"
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                            className="w-full p-2 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-400"
                            placeholder="London"
                        />
                    </div>
                </div>
            </div>

            <div className="relative">
                <label className="block text-gray-600 text-sm font-medium mb-1">Date</label>
                <div className="relative flex items-center">
                    <FaCalendarAlt className="absolute left-3 text-gray-400" />
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full p-2 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-400"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-gray-600 text-sm font-medium mb-1">Cabin Class</label>
                    <select
                        value={cabinClass}
                        onChange={(e) => setCabinClass(e.target.value)}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="economy">Economy</option>
                        <option value="business">Business</option>
                        <option value="first">First</option>
                    </select>
                </div>
                <div className="relative">
                    <label className="block text-gray-600 text-sm font-medium mb-1">Adults</label>
                    <div className="relative flex items-center">
                        <FaUser className="absolute left-3 text-gray-400" />
                        <input
                            type="number"
                            value={adults}
                            onChange={(e) => setAdults(e.target.value)}
                            className="w-full p-2 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-400"
                            min="1"
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-gray-600 text-sm font-medium mb-1">Sort By</label>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="best">Best</option>
                        <option value="price">Price</option>
                        <option value="duration">Duration</option>
                    </select>
                </div>
                <div className="relative">
                    <label className="block text-gray-600 text-sm font-medium mb-1">Currency</label>
                    <div className="relative flex items-center">
                        <FaDollarSign className="absolute left-3 text-gray-400" />
                        <select
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                            className="w-full p-2 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="GBP">GBP</option>
                        </select>
                    </div>
                </div>
            </div>

            <button type="submit" className="bg-blue-500 text-white p-3 rounded-lg w-full font-medium hover:bg-blue-600 transition">
                Search Flights
            </button>
        </form>
    );
};

FlightSearchForm.propTypes = {
    setFlights: PropTypes.func.isRequired,
};

export default FlightSearchForm;
