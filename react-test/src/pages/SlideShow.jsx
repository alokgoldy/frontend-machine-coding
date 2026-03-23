import { useState, useCallback } from 'react';

const Slides = ({ slides }) => {
    const [index, setIndex] = useState(0);

    const isFirst = index === 0;
    const isLast = index === slides.length - 1;

    const handleNext = useCallback(() => {
        if (!isLast) setIndex(prev => prev + 1);
    }, [isLast])

    const handlePrev = useCallback(() => {
        if (!isFirst) setIndex(prev => prev - 1);
    }, [isFirst])

    const handleRestart = useCallback(() => {
        setIndex(0);
    }, []);

    const currentSlide = slides[index];

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ marginBottom: '20px' }}>
                <button onClick={handleRestart} disabled={isFirst}>
                    Restart
                </button>
                <button onClick={handlePrev} disabled={isFirst}>
                    Prev
                </button>
                <button onClick={handleNext} disabled={isLast}>
                    Next
                </button>
            </div>

            <div style={{ border: '1px solid #ddd', padding: '40px', borderRadius: "8px", maxWidth: "500px", margin: "0 auto", }}>
                <h2>{currentSlide.title}</h2>
                <p>{currentSlide.text}</p>
            </div>
        </div>
    )

}

export default function SlideShow() {
    const slides = [
        {
            title: "Today's workout plan",
            text: "We're gonna do 3 fundamental exercises.",
        },
        {
            title: "Exercise 1",
            text: "Push-ups for 10 reps.",
        },
        {
            title: "Exercise 2",
            text: "Squats for 15 reps.",
        },
        {
            title: "Exercise 3",
            text: "Plank for 60 seconds.",
        },
    ];

    return <Slides slides={slides} />
}