import { useState, useEffect, useRef } from 'react';
import '../styles/image-crousel.css';

const images = [
    "https://picsum.photos/id/1018/600/300",
    "https://picsum.photos/id/1015/600/300",
    "https://picsum.photos/id/1019/600/300",
    "https://picsum.photos/id/1020/600/300"
];


function ImageCrousel() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const intervalRef = useRef(null)



    const handlePrev = () => {
        setActiveIndex(prev => prev === 0 ? images.length - 1 : prev - 1)
    }

    const handleNext = () => {
        setActiveIndex(prev => (prev + 1) % images.length)
    }

    useEffect(() => {
        if (!isPaused) {
            intervalRef.current = setInterval(() => {
                handleNext();
            }, 3000)
        }
        return () => clearInterval(intervalRef.current)
    }, [isPaused])
    return (<div
        className='crousel'
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
    >
        <button className='btn prev' onClick={handlePrev}>
            ❮
        </button>
        <div className="slider" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
            {images.map((img, i) => (<img
                key={i}
                src={img}
                alt={`Slide ${i + 1}`}
                className={`slide ${i === activeIndex ? 'active' : ''}`}
            />))}
        </div>
        <button className='btn next' onClick={handleNext}>
            ❯
        </button>
    </div>)
}

export default ImageCrousel;
