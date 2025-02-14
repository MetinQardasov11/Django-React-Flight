import { useState } from "react";
import FlightSearchForm from "./components/FlightSearchForm";
// import FlightList from "./components/FlightList";

function App() {
    const [flights, setFlights] = useState([]);

    console.log(flights)

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <h1 className="text-2xl font-bold mb-4">Google Flights Clone</h1>
            <FlightSearchForm setFlights={setFlights} />
            {/* <FlightList flights={flights} /> */}
        </div>
    );
}

export default App;
