import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Home from "./Components/Home";
import "./App.css";

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <Home />
      </ChakraProvider>
    </div>
  );
}

export default App;
