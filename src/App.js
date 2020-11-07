import React, { useState, useEffect } from "react";
import "./App.css";
import Carousel from "./components/Carousel";

const api = "https://breakingbadapi.com/api/characters";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [people, setPeople] = useState();

  useEffect(() => {
    fetch(api)
      .then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          return res.json();
        } else {
          setIsLoading(false);
          setIsError(true);
          throw new Error(res.statusText);
        }
      })
      .then((response) => {
        const fewPeople = response.slice(0, 5);
        setPeople(fewPeople);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  if (isLoading) {
    return (
      <div>
        <h1 className="app__loader">Loading...</h1>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <h1>Error....</h1>
      </div>
    );
  }

  return (
    <div className="App">
      <Carousel people={people} />
    </div>
  );
}

export default App;
