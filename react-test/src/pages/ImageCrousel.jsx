import { useState, useEffect, useRef } from 'react';


const images = [
    "https://picsum.photos/id/1018/600/300",
    "https://picsum.photos/id/1015/600/300",
    "https://picsum.photos/id/1019/600/300",
    "https://picsum.photos/id/1020/600/300"
];


function ImageCrousel() {
    const [activeIndex, setActiveIndex] = useState(0);

    const prevSlide = () => {
        setActiveIndex(prev => prev === 0 ? images.length - 1 : prev - 1);
    }

    const nextSlide = () => {
        setActiveIndex(prev => (prev + 1) % images.length);
    }

    return (
        <div className='crousel-container'>
            <button className='crousel-btn  prev' onClick={prevSlide}>
                ❮
            </button>
            <div className='crousel-slider'
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
                {images.map((img, i) => (<img
                    key={i}
                    src={img}
                    alt={`Slide ${i + 1}`}
                    className={`crousel-slide ${i === activeIndex ? 'active' : ''}`}
                />))}
            </div>
            <button className='crousel-btn  next' onClick={nextSlide}>
                ❯
            </button>
        </div>
    )
}

export default ImageCrousel;