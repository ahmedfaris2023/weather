import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CloudIcon from "@mui/icons-material/Cloud";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import axios from "axios";

const theme = createTheme({
  typography: {
    fontFamily: ["IBM"],
  },
});
function App() {
  const [temp, setTemp] = useState(null);
  useEffect(() => {
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=7619956ca0fcb77caba73ae235c5a000"
      )
      .then(function (response) {
        // handle success
        const responseTemp = Math.round(response.data.main.temp - 272.15);
        setTemp(responseTemp);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
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
                    الاثنين ٢-٢-٢٠٢١
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
                    <div>
                      <Typography variant="h1" style={{ textAlign: "right" }}>
                        {temp}
                      </Typography>
                      {/* TODO: TEMP IMAGE */}
                    </div>
                    {/*END TEMP */}
                    <Typography variant="h6">broken clouds</Typography>
                    {/*  MIN & MAX */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <h5>الصغرى :34</h5>
                      <h5 style={{ margin: "0px 5px" }}>|</h5>
                      <h5>الكبرى :34</h5>
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
