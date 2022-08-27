import React from "react";
import styles from "./Weathers.module.css";

class Weathers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            latitute: "",
            longitude: "",
            location: "",
            Description: "",
            temp: "",
            pressure: "",
            humidity: "",
        };
    }
    // API to get the latitude and longitude and also to get the weather data
    getAllWeatherData = () => {
        fetch(
            "https://api.openweathermap.org/geo/1.0/direct?q=" +
                this.state.location +
                "&limit=1&appid=67d65c5ff769684d1241ea04f02c7dd5",
            {
                method: "GET",
            }
        )
            .then((res) => res.json())
            // success
            .then(
                //executes after the first .then
                (response) => {
                    // catch the data returned by first .then
                    //check for not empty data object
                    // console.log("response lenghth",response.length)

                    if (response.length === 0) {
                        document.getElementById("status").innerHTML =
                            "City not found";
                        this.clearBox();
                    } else if (parseInt(response.cod) === 400) {
                        document.getElementById("status").innerHTML =
                            response.message;
                    } else {
                        this.setState(
                            {
                                longitude: response[0].lon,
                                latitude: response[0].lat,
                            },
                            function () {
                                // console.log(this.state.longitude);
                                // console.log(this.state.latitude);
                                this.getWeather(
                                    this.state.latitude,
                                    this.state.longitude
                                );
                            }
                        );
                    }
                },
                (error) => {
                    // only NO RESPONSE URL errors will trigger this code
                    document.getElementById("status").innerHTML = error.message;
                }
            );
    };
    // Function to get the weather with taking the argument as latitude and longitude
    getWeather = (latitude, longitude) => {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?lat=" +
                latitude +
                "&lon=" +
                longitude +
                "&appid=67d65c5ff769684d1241ea04f02c7dd5",
            {
                method: "GET",
            }
        )
            .then((res) => res.json())

            // success
            .then(
                //executes after the first .then
                (response) => {
                    // catch the data returned by first .then
                    //check for not empty data object
                    // console.log(
                    //     "response body",response.cod
                    // )
                    if (response.cod !== 200) {
                        document.getElementById("status").innerHTML =
                            response.message;
                    } else {
                        let description = response["weather"].map(function (p) {
                            //    console.log("weather",p['description'])

                            return p.description;
                        });
                        let temperatureInCelcius =
                            parseFloat(response.main.temp - 273.15).toFixed(1) +
                            " C";
                        let pressure = response.main.pressure + " hPa";
                        let humidity = response.main.humidity + " %";
                        this.setState(
                            {
                                Description: description,
                                temp: temperatureInCelcius,
                                //    "pressure":response.main.pressure,
                                pressure: pressure,
                                humidity: humidity,
                            },
                            function () {
                                //    console.log("Description",this.state.Description );
                                //    console.log("humidity",this.state.humidity + " %");
                            }
                        );
                    }
                },
                (error) => {
                    // only NO RESPONSE URL errors will trigger this code
                    document.getElementById("status").innerHTML = error.message;
                }
            );
    };
    // handles the event for city not found or get next city
    handleChange = (event) => {
        if (event.target.value === "") {
            this.setState({ [event.target.name]: event.target.value });
            document.getElementById("status").innerHTML =
                "Please Enter a city Name";
        } else {
            this.setState({ [event.target.name]: event.target.value });
            document.getElementById("status").innerHTML =
                "Enter your next City name above";
        }
    };
    // gets the weather on load
    componentDidMount() {
        this.getWeather(45.5031824, -73.5698065);
        document.getElementById("status").innerHTML = "Enter a City name above";
    }
    // function to clear the weather
    clearBox = () => {
        this.setState({
            Description: " ",
            temp: " ",
            pressure: " ",
            humidity: " ",
        });
    };
    render() {
        return (
            <div className={styles.mainDiv}>
                <p>
                    Type in the City Name, If the city is in multiple countries
                    then type in the two letter country code{" "}
                </p>
                <p>
                    For example London,ca if you want to find the temperature in
                    London city in Canada
                </p>
                <p>
                    You can try regional language like Marathi ex. मुंबई <br />
                    <b>Does not support all languages yet</b>
                </p>

                <input
                    type="text"
                    placeholder="ex.Montreal,ca"
                    name="location"
                    id="location"
                    value={this.state.location}
                    onChange={(event) => this.handleChange(event)}
                ></input>
                <button onClick={(event) => this.getAllWeatherData(event)}>
                    {" "}
                    Submit
                </button>
                <table className={styles.table}>
                    <thead></thead>
                    <tbody>
                        <tr>
                            Current Temperature:
                            <td value={this.state.temp}>{this.state.temp} </td>
                        </tr>

                        <tr>
                            Description :
                            <td value={this.state.Description}>
                                {this.state.Description}{" "}
                            </td>
                        </tr>

                        <tr>
                            Pressure :
                            <td value={this.state.pressure}>
                                {this.state.pressure}{" "}
                            </td>
                        </tr>

                        <tr>
                            Humidity :
                            <td value={this.state.humidity}>
                                {this.state.humidity}{" "}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div id="status" className={styles.statusDiv}></div>
            </div>
        );
    }
}

export default Weathers;
