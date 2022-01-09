import React, {useRef, useState} from 'react'
import { getDatabase, ref, set, child, update, get } from "firebase/database";
import {Alert, Form, Button, Card} from 'react-bootstrap';
import { Navigate } from "react-router-dom";

export default function Login(authenticated) {
    const trackRef = useRef()
    const passwordRef = useRef()
    const [authenticate, setAuthenticated] = useState(false)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState("")

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError("")
            setLoading(true)
            verifyTrackAndPassword(trackRef.current.value, passwordRef.current.value)
            setLoading(false)
        }
        catch {
            setError("Something went wrong!")
            setLoading(false)
        }
    }

    function verifyTrackAndPassword(trackName, trackPassword) {
        const dbRef = ref(getDatabase());
        get(child(dbRef, 'test/track' + trackName)).then((snapshot) => {
          if (snapshot.exists()) {
            const realTrackPassword = snapshot.val().trackPassword;
            if (trackPassword === realTrackPassword) {
                setAuthenticated(true)
                authenticated = true
                console.log("Authenticated!")
                console.log(authenticated)
            }
            else {
                setError("Horse track name and password do not match")
            }
          } 
          
          else {
            console.log("No data available");
            setError("Horse track name does not exist")
            console.log(authenticated)
          }
        }).catch((error) => {
          console.error(error);
        });
      };

    function updateTracks() {
        const db = getDatabase();
        update(ref(db, "test/trackBogman"), {
        trackName: "Bogman",
        trackPassword: "admin"
        });
    };

    return (
        <React.Fragment>
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'> Log In </h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id='trackId'>
                            <Form.Label>Horse Track Name</Form.Label>
                            <Form.Control type="username" ref={trackRef} required />
                        </Form.Group>
                        <Form.Group id='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit"> Go to track </Button>
                    </Form>
                </Card.Body>
            </Card>
        </React.Fragment>
    );
};