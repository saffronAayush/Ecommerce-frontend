// import React, { useState, useEffect } from "react";

// const NetworkStatus = (props) => {
//     // state variable holds the state of the internet connection
//     const [isOnline, setOnline] = useState(true);

//     // On initization set the isOnline state.
//     useEffect(() => {
//         setOnline(navigator.onLine);
//     }, []);

//     // event listeners to update the state
//     window.addEventListener("online", () => {
//         setOnline(true);
//     });

//     window.addEventListener("offline", () => {
//         setOnline(false);
//     });

//     // if user is online, return the child component else return a custom component
//     if (isOnline) {
//         return props.children;
//     } else {
//         return <h1>No Interner Connection. Please try again later.</h1>;
//     }
// };

// export default NetworkStatus;

import React, { useState, useEffect } from "react";

const NetworkStatus = (props) => {
    // State variable to hold the online/offline status
    const [isOnline, setOnline] = useState(navigator.onLine);

    useEffect(() => {
        // Handler for updating online status
        const handleOnline = () => setOnline(true);
        const handleOffline = () => setOnline(false);

        // Add event listeners for online and offline events
        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        // Cleanup event listeners on component unmount
        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    // If the user is online, render the child components
    if (isOnline) {
        return props.children;
    }

    // If offline, render the offline message with a retry button
    return (
        <div style={styles.offlineContainer}>
            <h1 style={styles.title}>No Internet Connection</h1>
            <p style={styles.message}>
                You are currently offline. Please check your network connection.
            </p>
            <button
                style={styles.button}
                onClick={() => window.location.reload()}
            >
                Retry
            </button>
        </div>
    );
};

// Inline styles for offline message
const styles = {
    offlineContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f2f5",
        textAlign: "center",
        padding: "20px",
    },
    title: {
        fontSize: "2.5rem",
        color: "#333",
        marginBottom: "20px",
    },
    message: {
        fontSize: "1.2rem",
        color: "#555",
        marginBottom: "20px",
    },
    button: {
        padding: "10px 20px",
        fontSize: "1rem",
        backgroundColor: "#4CAF50",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
    },
};

// CSS to make the button more interactive and responsive
styles.button["hover"] = {
    backgroundColor: "#45a049",
};

export default NetworkStatus;
