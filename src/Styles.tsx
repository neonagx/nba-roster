export const PositionColor = (position: string) => {
    let backgroundColor = '';
    switch (position) {
        case 'F':
            backgroundColor = '#00FFFF';
            break;
        case 'C':
            backgroundColor = '#0000FF';
            break;
        case 'C-F':
            backgroundColor = '#DC143C';
            break;
        case 'F-C':
            backgroundColor = '#483D8B';
            break;
        case 'G':
            backgroundColor = '#FFD700';
            break;
        case 'F-G':
            backgroundColor = '#FF4500';
            break;
        case 'G-F':
            backgroundColor = '#A0522D';
            break;
        default:
            backgroundColor = '#7FFF00';
    }
    return backgroundColor;
};

export const AccordionStyle = {
    width: '450px',
    maxWidth: '100%',
    position: 'fixed',
    zIndex: '100',
    left: '50%',
    transform: "translate(-50%, 0)"
};

export const AccordionDetailsStyle = { maxWidth: '100%' };

export const CardStyle = {
    width: '100%',
    maxWidth: 345,
    display: 'inline-block',
    marginTop: '7vh'
};

export const AvatarStyle = {
    display: 'inline-flex',
    marginLeft: '10px'
};

export const DataGridStyle = {
    height: '27em',
    width: '100%',
    maxWidth: '100%',
    overflowY: 'hidden'
};