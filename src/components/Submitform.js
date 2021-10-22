import React from 'react';
import 'firebase/compat/firestore';

function Rank(props) {
    const { isSubmitOpen, setIsSubmitOpen, score, setScoreName } = props;
    let inputname = '';

    async function onSubmitClick(e) {
        e.preventDefault();
        e.currentTarget.disabled = true;
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
