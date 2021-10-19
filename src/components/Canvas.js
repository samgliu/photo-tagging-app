import img1 from '../images/pic1.jpg';
import { useState, useEffect } from 'react';
import Popup from '../components/Popup';
import FireBase from './Firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

function Canvas(props) {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [clicked, setClicked] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [checkpos, setCheckpos] = useState({ x: 0, y: 0 });
    const [scale, setScale] = useState(1.0);
    const [alert, setAlert] = useState(false);
    const [popupmsg, setPopupmsg] = useState(' ');
    const { marks, setMarks, isSubmitOpen, isRankOpen, time, setScore, score } =
        props;

    async function checkWin(themarks) {
        if (themarks[0] === 1 && themarks[1] === 1 && themarks[2] === 1) {
            let sc = (await getTime()) - time[0];
            setScore(sc);
            return true;
        }
    }

    useEffect(() => {
        addEventListeners();
        return () => removeEventListeners();
    }, []);

    function handleClosepop() {
        setTimeout(() => {
            setAlert(false);
        }, 1000);
    }

    const addEventListeners = () => {
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseenter', onMouseEnter);
        document.addEventListener('mouseleave', onMouseLeave);
        document.addEventListener('mousedown', onMouseDown);
        document.addEventListener('mouseup', onMouseUp);
    };

    const removeEventListeners = () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseenter', onMouseEnter);
        document.removeEventListener('mouseleave', onMouseLeave);
        document.removeEventListener('mousedown', onMouseDown);
        document.removeEventListener('mouseup', onMouseUp);
    };

    const onMouseMove = (e) => {
        setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseDown = (e) => {
        setScale(e.target.clientWidth / 440);
        setCheckpos({ x: e.layerX, y: e.layerY - 100 });
        setClicked(true);
        document.removeEventListener('mousemove', onMouseMove);
    };

    const onMouseUp = (e) => {
        setClicked(false);
        document.addEventListener('mousemove', onMouseMove);
    };

    const onMouseLeave = () => {
        setHidden(true);
    };

    const onMouseEnter = () => {
        setHidden(false);
    };

    const cursorClasses = () => {
        if (!clicked && !hidden) {
            return 'cursor';
        }
        if (hidden) {
            return 'cursor cursor--hidden';
        } else if (clicked) {
            return 'cursor cursor--clicked';
        } else {
            return 'cursor';
        }
    };

    function checkPopupOpen() {
        return !isSubmitOpen && !isRankOpen;
    }

    async function onMouseUpmenu(e) {
        // checkWin
        let index = parseInt(e.target.id) - 1;
        let newmarks = [marks[0], marks[1], marks[2]];
        let found = verifyFound(index);
        let verify = await verifyPos(checkpos.x, checkpos.y, index);
        if (verify) {
            setPopupmsg(popupGen(found, index));
            newmarks[index] = 1;
            setMarks(newmarks);
            if (await checkWin(newmarks)) {
                setPopupmsg('You found them all!');
            }
        } else {
            setPopupmsg('Not Found!');
        }
        setAlert(true);
        handleClosepop();
        getTime(); //FIXME DEL
    }

    function popupGen(found, index) {
        let arr = ['Pikachu', 'Kero', 'Umbrella'];

        if (found) {
            return 'Duplicate ' + arr[index] + ' found!';
        } else {
            return 'Found ' + arr[index];
        }
    }

    const verifyFound = (index) => {
        return marks[index] === 1;
    };

    const getPos = async () => {
        let arr = [];
        const getFromFirebase = FireBase.firestore().collection('position');
        let allpos = await getFromFirebase.get();
        for (const doc of allpos.docs) {
            arr.push(doc.data());
        }
        return arr;
    };

    const getTime = () => {
        var timestamp = firebase.firestore.Timestamp;
        return timestamp.now().seconds;
    };

    const verifyPos = async (x, y, index) => {
        let rightpos = await getPos();
        /*
        let rightpos = [
            // original : 440, 1308
            { x: 312, y: 918 }, //  Pikachu
            { x: 176, y: 254 }, // kero
            { x: 221, y: 574 }, // umbrella
        ];*/
        let pos = rightpos[convertInd(index)];
        let offset = 20;
        return (
            between(x, (pos.x - offset) * scale, (pos.x + offset) * scale) &&
            between(y, (pos.y - offset) * scale, (pos.y + offset) * scale)
        );
    };

    function convertInd(i) {
        if (i === 0) {
            return 1;
        } else if (i === 1) {
            return 2;
        } else {
            return 0;
        }
    }

    function between(value, first, last) {
        let lower = Math.min(first, last),
            upper = Math.max(first, last);
        return value >= lower && value <= upper;
    }

    const Dropmenu = (props) => {
        return (
            <div
                className={clicked ? 'dropmenu' : 'dropmenu dropmenuhidden'}
                style={{ left: `${props.x + 1}px`, top: `${props.y + 1}px` }}
            >
                <div>
                    <button
                        className="dropbtn"
                        onMouseUp={(e) => onMouseUpmenu(e)}
                        id="1"
                    >
                        Mark Pikachu
                    </button>
                </div>
                <div>
                    <button
                        className="dropbtn"
                        onMouseUp={(e) => onMouseUpmenu(e)}
                        id="2"
                    >
                        Mark Keroro
                    </button>
                </div>
                <div>
                    <button
                        className="dropbtn"
                        onMouseUp={(e) => onMouseUpmenu(e)}
                        id="3"
                    >
                        Mark Umbrella
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="canvas">
            <div
                className={cursorClasses()}
                style={{ left: `${position.x}px`, top: `${position.y}px` }}
            />
            <img src={img1} alt="" />
            {checkPopupOpen() ? (
                <Dropmenu x={position.x} y={position.y} />
            ) : (
                <div></div>
            )}
            {alert ? <Popup content={popupmsg} /> : <div></div>}
        </div>
    );
}

export default Canvas;
