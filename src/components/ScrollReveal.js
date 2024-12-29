import './ScrollReveal.css';
import {useEffect, useRef, useState} from 'react';

const ColorBar = ({color, height, direction}) => {
    const [visible, setVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        if (!ref.current) return;
        const callback = (entries) => entries.forEach(entry => setVisible(entry.isIntersecting));
        const options = {
            root: document.querySelector('.scroll-container'),
            rootMargin: '-50px 0px -50px 0px',
            threshold: 0,
        };

        const observer = new IntersectionObserver(callback, options)
        observer.observe(ref.current);

        return () => observer.disconnect();
    }, [ref]);

    return (
        <div className={`color-bar-${direction} ${visible ? '' : 'hidden'}`}
            style={{
                backgroundColor: color, 
                height: `calc(${height} - 20px)`
            }}
            ref={ref}
        ></div>
    )
}

const palette = [
    '#39a2cb', '#5390d6', '#717bc9', '#8a64b3', '#9c4b95', 
    '#ff96ad', '#574145', '#bea5a9', '#c58667', '#8db135',
    '#7bdec7', '#5cbfb9', '#49a0a6', '#3e8190', '#376475',
    '#ffd523', '#95c845', '#31af6d', '#008eb2', '#006b7a',
    '#f54748', '#f4aaa2', '#ffe5de', '#88aee1', '#dcf2ff',
    '#d62ad0', '#ff2bad', '#ff6074', '#ff9954', '#ffcc4f',
];

const randomValue = (a, b) => {
    return Math.floor(Math.random() * (b - a) + a);
}

const generateRandomHeights = (targetSum, minLength, maxLength, dipersion) => {
    const length = randomValue(minLength, maxLength + 1)
    const result = [...Array(length)].fill(targetSum / length);
    let dipSum = 0;

    const dipersions = result.map(()=> {
        const ret = randomValue(-dipersion, dipersion);
        dipSum += ret;
        return ret;
    });

    return result.map((x, i) => Math.round(x + dipersions[i] - dipSum / length));
}

const heights = [...Array(8)].map(() => generateRandomHeights(4000, 20, 28, 60))

const barProperties = heights.map(heights_i => (
    heights_i.map(height => ({
        height: `${height}px`, 
        color: palette[Math.floor(Math.random() * palette.length)],
        direction: ['left', 'right'][Math.floor(Math.random() * 2)],
    }))
))

const ScrollReveal = () => {
    return (
        <div className='scroll-container'>
            {barProperties.map((barProperties_i, i) => (
                    <div className='color-bar-container' key={i}>
                        {barProperties_i.map((property, ii) => (
                            <ColorBar 
                                color= {property.color} 
                                height= {property.height}
                                direction= {property.direction}
                                key= {ii}
                            />
                        ))}
                    </div>
                ))
            }
        </div>
    );
};

export default ScrollReveal;