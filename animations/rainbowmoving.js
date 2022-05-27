class RainbowMoving {

    constructor(){
    }

    populate(){
    }

    iterate(){
    }

    render(){
        let seconds = new Date().getTime() / 1000;
        let timeoffset = (seconds % 10) / 10;
        let colorMap = new Array(side_length * side_length * 6);
        for(let i = 0; i < colorMap.length; i++){
            let positionoffset = window.ledPositions[i]["Y"];
            positionoffset += 1;
            let offset = (timeoffset + positionoffset) % 1;
            colorMap[i] = hslToRgb(offset, 1, 0.5);
        }
        return colorMap;
    }

}
