import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CloudIcon from "@mui/icons-material/Cloud";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import "moment/min/locales";
moment.locale("ar");
const theme = createTheme({
  typography: {
    fontFamily: ["IBM"],
  },
});
let cancelAxios = null;
function App() {
  console.log(moment());

  const [dateAndTime, setDateAndTime] = useState("");
  const [temp, setTemp] = useState({
    number: null,
    description: "",
    min: null,
    max: null,
    icon: null,
  });
  useEffect(() => {
    setDateAndTime(moment().format("MMM Do YYYY, h:mm:ss a"));
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=7619956ca0fcb77caba73ae235c5a000",
        {
          cancelToken: new axios.CancelToken((c) => {
            cancelAxios = c;
          }),
        }
      )
      .then(function (response) {
        // handle success
        const responseTemp = Math.round(response.data.main.temp - 272.15);

        const min = Math.round(response.data.main.temp_min - 272.15);
        const max = Math.round(response.data.main.temp_max - 272.15);
        const description = response.data.weather[0].description;
        const responseIcon = response.data.weather[0].icon;
        setTemp({
          number: responseTemp,
          min: min,
          max: max,
          description: description,
          icon: `https://openweathermap.org/img/wn/${responseIcon}@2x.png`,
        });
        console.log(min, max, description);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
    return () => {
      cancelAxios();
    };
  }, []);
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm">
          {/* CONTENT CONTAINER  */}
          <div
            style={{
              height: "100vh",

              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {/* CARD */}
            <div
              dir="rtl"
              style={{
                width: "100%",
                background: "rgb(28 52 91 /36%)",
                color: "white",
                padding: "10px",
                borderRadius: "15px",
                boxShadow: "0px 11px 1px rgba(0,0,0,0.05)",
              }}
            >
              {/* CONTENT */}
              <div>
                {/* CITY & TIME */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "end",
                    justifyContent: "start",
                  }}
                  dir="rtl"
                >
                  <Typography variant="h2" style={{ marginRight: "20px" }}>
                    الرياض
                  </Typography>
                  <Typography variant="h5" style={{ marginRight: "20px" }}>
                    {dateAndTime}
                  </Typography>
                </div>
                {/*END CITY & TIME */}
                <hr />
                {/* CONTAINER OF DEGREE + CLOUD ICON */}
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  {/* DEGREE & DESCRIPTION */}
                  <div>
                    {/* TEMP */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h1" style={{ textAlign: "right" }}>
                        {temp.number}
                      </Typography>
                      {/* TEMP IMAGE */}
                      <img src={temp.icon} />
                    </div>
                    {/*END TEMP */}
                    <Typography variant="h6">{temp.description}</Typography>
                    {/*  MIN & MAX */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <h5>الصغرى :{temp.min}</h5>
                      <h5 style={{ margin: "0px 5px" }}>|</h5>
                      <h5>الكبرى :{temp.max}</h5>
                    </div>
                  </div>

                  {/*END DEGREE & DESCRIPTION */}
                  <CloudIcon style={{ fontSize: "200px", color: "white" }} />
                </div>
                {/* END CONTAINER OF DEGREE + CLOUD ICON */}
              </div>
              {/* END CONTENT */}
            </div>
            {/* End CARD */}
            {/* TRANSLATION CONTAINER */}
            <div
              dir="rtl"
              style={{
                display: "flex",
                justifyContent: "end",
                width: "100%",
                marginTop: "20px",
              }}
            >
              <Button variant="text" style={{ color: "white" }}>
                انجليزي
              </Button>
            </div>
            {/* END TRANSLATION CONTAINER */}
          </div>
          {/*END CONTENT CONTAINER  */}
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
