/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useCallback } from "react";
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  useSensor,
  useSensors,
  // DragStartEvent,
  // DragEndEvent
} from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import GridBox from "./GridBox";
import SortableItem from "./SortableItem";
import SingleImage from "./SingleImage";
import { useStateContext } from "../context/context";
import AddImage from "./AddImage";

const DraggableGalleryContainer = () => {
  const {
    state: { imagesList },
    dispatch,
  } = useStateContext();

  const [activeImage, setActiveImage] = useState(null);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = useCallback(
    (event) => {
      setIsDragging(true);
      const findImage = imagesList.find((item) => item.id === event.active.id);
      setActiveImage(findImage);
    },
    [imagesList]
  );

  const handleDragEnd = useCallback((event) => {
    setIsDragging(false);
    const { active, over } = event;
    if (active == undefined || over == undefined) {
      return;
    }
    if (active.id !== over?.id) {
      dispatch({
        type: "IMG_MOVING",
        payload: {
          activeId: active.id,
          overId: over.id,
        },
      });
    }
    setActiveImage(null);
  }, []);

  const handleDragCancel = useCallback(() => {
    setIsDragging(false);
    setActiveImage(null);
  }, []);
  

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext items={imagesList} strategy={rectSortingStrategy}>
        <GridBox columns={5}>
          {imagesList.map((item, index) => (
            <SortableItem
              key={item.id}
              id={item.id}
              index={index}
              images={item}
              someoneIsDragging={isDragging}
            />
          ))}
          <AddImage imgListLength={imagesList.length} />
        </GridBox>
      </SortableContext>
      <DragOverlay adjustScale style={{ transformOrigin: "0 0 " }}>
        {activeImage ? (
          <SingleImage
            images={activeImage}
            index={imagesList.findIndex((img) => img.id === activeImage.id)}
            id={activeImage.id}
            someoneIsDragging={isDragging}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default DraggableGalleryContainer;
