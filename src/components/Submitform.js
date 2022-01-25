import React, { useState } from 'react';
import FireBase from './Firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

function Rank(props) {
    const {
        isSubmitOpen,
        setIsSubmitOpen,
        score,
        setScoreName,
        time,
        setTime,
    } = props;
    let inputname = '';

    const getTime = async () => {
        var timestamp = firebase.firestore.Timestamp;
        return timestamp.now().seconds;
    };

    async function onSubmitClick(e) {
        e.preventDefault();
        if (inputname !== '') {
            setScoreName(inputname);
        }
    }

    function onCloseClick(e) {
        e.preventDefault();
        setIsSubmitOpen(!isSubmitOpen);
    }

    return (
        <div className="submitform">
            <div> Time: {score} (seconds)</div>
            Name:&nbsp;
            <input
                type="text"
                onChange={(event) => {
                    inputname = event.target.value;
                }}
            />
            <button
                type="button"
                onClick={(e) => onSubmitClick(e)}
                className="submitbtn"
            >
                Submit
            </button>
            <button
                type="button"
                onClick={(e) => onCloseClick(e)}
                className="closebtn"
            >
                Close
            </button>
        </div>
    );
}

export default Rank;
