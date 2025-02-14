import PropTypes from 'prop-types';

const FlightList = ({ flights }) => {
    return (
        <div className="mt-4">
            {flights.length === 0 ? (
                <p className="text-gray-500">No flights found.</p>
            ) : (
                <ul className="divide-y divide-gray-200">
                    {flights.map((flight, index) => (
                        <li key={index} className="p-4 bg-gray-100 rounded-md mb-2 shadow">
                            <p><strong>Airline:</strong> {flight.airline}</p>
                            <p><strong>Departure:</strong> {flight.departureTime} - {flight.from}</p>
                            <p><strong>Arrival:</strong> {flight.arrivalTime} - {flight.to}</p>
                            <p><strong>Price:</strong> {flight.price} USD</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

FlightList.propTypes = {
    flights: PropTypes.arrayOf(
        PropTypes.shape({
            airline: PropTypes.string.isRequired,
            departureTime: PropTypes.string.isRequired,
            from: PropTypes.string.isRequired,
            arrivalTime: PropTypes.string.isRequired,
            to: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
        })
    ).isRequired,
};

export default FlightList;
