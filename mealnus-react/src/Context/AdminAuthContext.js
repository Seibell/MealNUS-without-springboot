import React, { createContext, useEffect, useState } from 'react';

export const AdminAuthContext = createContext();


export const AdminAuthProvider = ({ children }) => {
    const [currentStaff, setCurrentStaff] = useState(null);
  
    useEffect(() => {
      const storedStaff = localStorage.getItem('currentStaff');
      if (storedStaff) {
        setCurrentStaff(JSON.parse(storedStaff));
      }
    }, []);
  
    useEffect(() => {
      if (currentStaff) {
        localStorage.setItem('currentStaff', JSON.stringify(currentStaff));
      } else {
        localStorage.removeItem('currentStaff');
      }
    }, [currentStaff]);
  
    return (
      <AdminAuthContext.Provider value={{ currentStaff, setCurrentStaff }}>
        {children}
      </AdminAuthContext.Provider>
    );
  };