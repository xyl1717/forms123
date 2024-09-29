// Authenticate.jsx
import { useState } from "react";

export default function Authenticate({ token }) {
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState(null); // Step 1: Add state for username

  async function handleClick() {
    try {
      const response = await fetch("https://fsa-jwt-practice.herokuapp.com/authenticate", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      setSuccessMessage(result.message); // Store success message
      setUsername(result.data.username); // Step 2: Set the username from the response
    } catch (error) {
      setError(error.message); // Handle errors
    }
  }

  return (
    <div>
      <h2>Authenticate</h2>
      {successMessage && <p>{successMessage}</p>}
      {error && <p>{error}</p>}
      <button onClick={handleClick}>Authenticate Token</button>
      {/* Step 3: Display the username if available */}
      {username && <p>Welcome, {username}!</p>}
    </div>
  );
}
