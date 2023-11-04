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
import Grid from "./Grid";
import SortableItem from "./SortableItem";
import Item from "./Item";
import { imagesDataSet } from "./utils";

function newArrayMove(prevArry, from, to) {
  const newArray = prevArry.slice();
  if (to >= newArray.length) {
    let k = to - newArray.length + 1;
    while (k--) {
      newArray.push(undefined);
    }
  }
  newArray.splice(to, 0, newArray.splice(from, 1)[0]);
  // const updatedImages = [...prevArry];
  // const [draggedImage] = updatedImages.splice(from, 1);
  // updatedImages.splice(to, 0, draggedImage);
  return newArray;
}

const App = () => {
  const newArray = [...imagesDataSet];

  const [items, setItems] = useState(newArray);

  const [activeId, setActiveId] = useState(null);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const handleDragStart = useCallback((event) => {
    console.log({ event });
    const findImage = items.find((item) => {
      console.log({ item });
      return item.id === event.active.id;
    });
    console.log({ findImage });
    setActiveId(findImage);
  }, []);

  const handleDragEnd = useCallback((event) => {
    const { active, over } = event;
    console.log(active.id, over.id);
    if (active.id !== over?.id) {
      setItems((prevArry) => {
        const oldIndex = prevArry.findIndex((item) => item.id == active.id);
        const newIndex = prevArry.findIndex((item) => item.id == over.id);
        return newArrayMove(prevArry, oldIndex, newIndex);
      });
    }
    setActiveId(null);
  }, []);

  const handleDragCancel = useCallback(() => {
    setActiveId(null);
  }, []);
  console.log({ activeId });
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext items={items} strategy={rectSortingStrategy}>
        <Grid columns={5}>
          {items.map((item, index) => (
            <SortableItem
              key={item.id}
              id={item.id}
              index={index}
              images={item}
            />
          ))}
        </Grid>
      </SortableContext>
      <DragOverlay adjustScale style={{ transformOrigin: "0 0 " }}>
        {activeId ? (
          <Item
            images={activeId}
            index={items.findIndex((img) => img.id === activeId.id)}
            id={activeId.id}
            isDragging
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default App;
