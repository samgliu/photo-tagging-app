import Header from './components/Header';
import Canvas from './components/Canvas';
import Rank from './components/Rank';
import Submitform from './components/Submitform';
import FireBase from './components/Firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { useState, useEffect } from 'react';

function App() {
    const [marks, setMarks] = useState([0, 0, 0]);
    const [isRankOpen, setIsRankOpen] = useState(false);
    const [isSubmitOpen, setIsSubmitOpen] = useState(false);
    const [time, setTime] = useState([]);
    const [score, setScore] = useState(-1);
    const [arrRank, setArrRank] = useState([]);

    useEffect(() => {
        setTime((time) => [...time, getTime()]);
    }, []);

    const getTime = () => {
        var timestamp = firebase.firestore.Timestamp;
        return timestamp.now().seconds;
    };

    function onClickRank() {
        setIsRankOpen(!isRankOpen);
    }
    function onClickSubmit() {
        setIsSubmitOpen(!isSubmitOpen);
    }

    function onChangeTime(t) {
        setTime((time) => [...time, t]);
    }
    function setScoreName(name) {
        if (score > 0) saveRank(name, score);
    }

    const saveRank = (name, score) => {
        const saveToFirebase = FireBase.firestore();
        saveToFirebase.collection('rank').add({
            score: score,
            name: name,
        });
    };

    const getRank = async () => {
        let arr = [];
        const getFromFirebase = FireBase.firestore().collection('rank');
        let allrank = await getFromFirebase.get();
        for (const doc of allrank.docs) {
            arr.push(doc.data());
        }
        arr.sort(function compareFn(a, b) {
            return a.score - b.score;
        });
        setArrRank(arr);
    };

    return (
        <div className="App">
            <Header
                marks={marks}
                isRankOpen={isRankOpen}
                setIsRankOpen={setIsRankOpen}
                isSubmitOpen={isSubmitOpen}
                setIsSubmitOpen={onClickSubmit}
                getRank={getRank}
            />

            {isRankOpen ? (
                <Rank
                    isRankOpen={isRankOpen}
                    setIsRankOpen={onClickRank}
                    arr={arrRank}
                />
            ) : (
                <div></div>
            )}

            {isSubmitOpen ? (
                <Submitform
                    isSubmitOpen={isSubmitOpen}
                    setIsSubmitOpen={onClickSubmit}
                    time={time}
                    setTime={(t) => onChangeTime(t)}
                    score={score}
                    setScoreName={(n) => setScoreName(n)}
                />
            ) : (
                <div></div>
            )}
            <Canvas
                marks={marks}
                setMarks={setMarks}
                isRankOpen={isRankOpen}
                isSubmitOpen={isSubmitOpen}
                score={score}
                setScore={setScore}
                time={time}
            />
        </div>
    );
}

export default App;
