import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AuthProvider from "./AuthContext";

// Components
import Home from "./components/Home";
import Units from "./components/Units";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";
import Learning_Alpha from "./components/Learning_Alphabet";
import Translator from "./components/Translator";
import Quiz from "./components/Alphabet_Quiz";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import Finger_Spelling from "./components/Finger_Spelling";
import Greetings from "./components/Greetings";
import Hello from "./components/Hello";
import Grammer from "./components/Grammer";
import Sentence_Practice from "./components/Sentence";
import Noun_Adj from "./components/Noun_Adj";
import NounsAssignment1 from "./components/Noun_Assignment_1";
import NounsAssignment2 from "./components/Noun_Assignment_2";
import Adjective_Assignment from "./components/Adjective_Assignment";
import Verb from "./components/Verb";
import Numbers from "./components/Numbers";
import Number_Quiz from "./components/Number_Quiz";
import Final from "./components/Final";
import CreateCharacter from "./components/CreateCharacter";
import Avatar from "./components/AnimationScene";
import CreateCharacter2 from "./components/Character_Creation";
import AvatarPage from "./components/Avatar_Page";
import AvatarWithAnimation from "./components/Avatar_Animations";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Use environment variable for API URL or fallback to localhost
    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5001";

    axios
      .get(`${API_URL}/api`)
      .then((response) => setMessage(response.data.message))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/units" element={<Units />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/createcharacters" element={<CreateCharacter />} />
          <Route path="/createcharacters2" element={<CreateCharacter2 />} />
          <Route path="/avatar" element={<AvatarPage />} />
          <Route path="/avatar_animated" element={<AvatarWithAnimation />} />
          <Route path="/translator" element={<Translator />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/units/lesson1" element={<Learning_Alpha />} />
          <Route path="/units/lesson2" element={<Finger_Spelling />} />
          <Route path="/units/lesson3" element={<Greetings />} />
          <Route path="/units/lesson4" element={<Grammer />} />
          <Route path="/hello" element={<Hello />} />
          <Route path="/units/lesson4/sentence" element={<Sentence_Practice />} />
          <Route path="/units/lesson5/N_A" element={<Noun_Adj />} />
          <Route path="/units/lesson5/N_A/Noun_Assigment1" element={<NounsAssignment1 />} />
          <Route path="/units/lesson5/N_A/Noun_Assigment2" element={<NounsAssignment2 />} />
          <Route path="/units/lesson5/N_A/Adj_Assigment" element={<Adjective_Assignment />} />
          <Route path="/units/lesson6" element={<Verb />} />
          <Route path="/units/lesson7" element={<Numbers />} />
          <Route path="/units/lesson7/quiz" element={<Number_Quiz />} />
          <Route path="/units/Final" element={<Final />} />
          {/* Example of additional routes */}
          <Route path="/translation" element={<Translator />} />
        </Routes>
        {/* Footer */}
        {/* <Footer /> */}
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
