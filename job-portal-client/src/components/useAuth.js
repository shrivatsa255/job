import { useState, useEffect } from 'react';

const useAuth = () => {
 const [user, setUser] = useState(null);
 const [loading, setLoading] = useState(true); // Add a loading state

 function fetchEmailFromLocalStorage() {
 return new Promise((resolve, reject) => {
    try {
      const email = localStorage.getItem('userEmail');
      if (email) {
        resolve(email);
      } else {
        reject(new Error('Email not found in local storage'));
      }
    } catch (error) {
      reject(error);
    }
 });
}

 useEffect(() => {
    const fetchUser = async () => {
      try {
        const email = await fetchEmailFromLocalStorage();
        console.log(email)
        if (!email) {
          console.log('User email not found in local storage');
          setLoading(false); // Set loading to false if email is not found
          return;
        }

        const response = await fetch(`http://localhost:3000/api/users/${email}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUser(data);
        setLoading(false); // Set loading to false after fetching user data
      } catch (error) {
        console.error('There was a problem with your fetch operation:', error);
        setLoading(false); // Also set loading to false in case of an error
      }
    };

    fetchUser();
 }, []);
console.log(`user:${user}`)
 return { user, loading }; // Return loading state as well
};

export default useAuth;
