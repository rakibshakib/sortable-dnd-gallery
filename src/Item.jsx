import { forwardRef } from 'react';

const Item = forwardRef(({ id, withOpacity, isDragging, style, index, ...props }, ref) => {
    const inlineStyles = {
        gridRowStart: index === 0 ? "span 2" : null,
        gridColumnStart: index === 0 ? "span 2" : null,
        opacity: withOpacity ? '0.5' : '1',
        transformOrigin: '50% 50%',
        height: index === 0 ? "290px" : '140px',
        width: index === 0 ? "290px" :  '140px',
        borderRadius: '10px',
        cursor: isDragging ? 'grabbing' : 'grab',
        backgroundColor: '#ffffff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'black',
        boxShadow: isDragging  ? 'rgb(63 63 68 / 5%) 0px 2px 0px 2px, rgb(34 33 81 / 15%) 0px 2px 3px 2px' : 'rgb(63 63 68 / 5%) 0px 0px 0px 1px, rgb(34 33 81 / 15%) 0px 1px 3px 0px',
        transform: isDragging ? 'scale(1.05)' : 'scale(1)',
        ...style,
    };

    console.log({index})
    return <div ref={ref} style={inlineStyles} {...props}>{id}</div>;
});

export default Item;
