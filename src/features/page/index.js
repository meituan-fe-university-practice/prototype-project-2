import React,  { useState } from 'react';
import { Stage, Layer, Rect, Circle, Line, Star, Transformer } from 'react-konva';

const shapeList = ['Rect', 'Circle', 'Triangle', 'Star'];

const ShapeItem = ({ shapeProps, isSelected, onSelect, onChange }) => {
    const shapeRef = React.useRef();
    const trRef = React.useRef();

    const components = {
        'Rect': Rect,
        'Circle': Circle,
        'Triangle': Line,
        'Star': Star
    };

    React.useEffect(() => {
        if (isSelected) {
            // we need to attach transformer manually
            trRef.current.nodes([shapeRef.current]);
            trRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);

    const ShapeItem = components[shapeList[shapeProps.typeIndex]];

    return (
        <React.Fragment>
            <ShapeItem
                onClick={onSelect}
                onTap={onSelect}
                ref={shapeRef}
                {...shapeProps}
                draggable
                onDragEnd={(e) => {
                    onChange({
                        ...shapeProps,
                        x: e.target.x(),
                        y: e.target.y(),
                    });
                }}
                onTransformEnd={(e) => {
                    // transformer is changing scale of the node
                    // and NOT its width or height
                    // but in the store we have only width and height
                    // to match the data better we will reset scale on transform end
                    const node = shapeRef.current;
                    const scaleX = node.scaleX();
                    const scaleY = node.scaleY();

                    // we will reset it back
                    node.scaleX(1);
                    node.scaleY(1);

                    switch (shapeProps.typeIndex) {
                        case 0:
                            onChange({
                                ...shapeProps,
                                x: node.x(),
                                y: node.y(),
                                // set minimal value
                                width: Math.max(5, node.width() * scaleX),
                                height: Math.max(5, node.height() * scaleY),
                            });
                            break;
                        case 1:
                            onChange({
                                ...shapeProps,
                                x: node.x(),
                                y: node.y(),
                                // set minimal value
                                width: Math.max(5, node.width() * scaleX),
                                height: Math.max(5, node.height() * scaleY),

                                radius: node.radius(),
                            });
                            break;
                        case 2:
                            onChange({
                                ...shapeProps,
                                x: node.x(),
                                y: node.y(),
                                // set minimal value
                                width: Math.max(5, node.width() * scaleX),
                                height: Math.max(5, node.height() * scaleY),

                                points: node.points(),
                            });
                    }
                    onChange({
                        ...shapeProps,
                        x: node.x(),
                        y: node.y(),
                        // set minimal value
                        width: Math.max(5, node.width() * scaleX),
                        height: Math.max(5, node.height() * scaleY),
                    });
                }}
            />
            {isSelected && (
                <Transformer
                    ref={trRef}
                    boundBoxFunc={(oldBox, newBox) => {
                        // limit resize
                        if (newBox.width < 5 || newBox.height < 5) {
                            return oldBox;
                        }
                        return newBox;
                    }}
                />
            )}
        </React.Fragment>
    );
};

const initialShapes = [
    {
        id: '0',
        typeIndex: 0,
        x: 600,
        y: 100,
        width: 100,
        height: 100,
        fill: 'red',
        stroke: 'black',
        strokeWidth: 0,
    },
    {
        id: '1',
        typeIndex: 1,
        x: 150,
        y: 150,
        width: 100,
        height: 100,
        fill: 'black',
        stroke: 'black',
        strokeWidth: 0,

        radius: 70,
    },
    {
        id: '2',
        typeIndex: 2,
        x: 300,
        y: 300,
        fill: '#00D2FF',
        stroke: 'black',
        strokeWidth: 0,

        points: [0, 0, 40, 40, -40, 40],
        closed: true,
    },
    {
        id: '3',
        typeIndex: 3,
        x: 510,
        y: 150,
        width: 100,
        height: 100,
        fill: 'yellow',
        stroke: 'black',
        strokeWidth: 0,

        numPoints: 5,
        innerRadius: 36,
        outerRadius: 108,
    },
];

const Page = () => {
    const [shapes, setShapes] = useState(initialShapes);
    const [selectedId, selectShape] = useState(null);

    const checkDeselect = (e) => {
        // deselect when clicked on empty area
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
            selectShape(null);
        }
    };

    return (
        <div className="page-wrap">
            <Stage
                width={window.innerWidth}
                height={window.innerHeight}
                onMouseDown={checkDeselect}
                onTouchStart={checkDeselect}
            >
                <Layer>
                    {shapes.map((item, index) => {
                        return (
                            <ShapeItem
                                key={index}
                                shapeProps={item}
                                isSelected={item.id === selectedId}
                                onSelect={() => {
                                    selectShape(item.id);
                                }}
                                onChange={(newAttrs) => {
                                    const shapeItem = shapes.slice();
                                    shapeItem[index] = newAttrs;
                                    setShapes(shapeItem);
                                }}
                            />
                        );
                    })}
                </Layer>
            </Stage>
        </div>
    )
}

export default Page