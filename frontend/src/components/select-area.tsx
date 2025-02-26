import { useEffect } from "react";
import { Rectangle, RectangleProps } from "react-leaflet";
import { useSelectArea } from "../hooks/useSelectArea";

interface SelectAreaProps {
  onBoundsChange?: (
    bounds: [[number, number], [number, number]] | null
  ) => void;
  options?: Omit<RectangleProps, "bounds">;
  keepRectangle?: boolean;
}

export default function SelectArea({
  onBoundsChange = () => {},
  options,
  keepRectangle = false,
}: SelectAreaProps) {
  const { startPoint, endPoint, rectangleBounds, isDrawing } = useSelectArea({
    keepRectangle,
  });

  useEffect(() => {
    if (rectangleBounds !== null) {
      onBoundsChange(rectangleBounds);
    }
  }, [rectangleBounds]);

  return (
    <>
      {isDrawing && startPoint && endPoint && (
        <Rectangle
          bounds={[
            [startPoint.lat, startPoint.lng],
            [endPoint.lat, endPoint.lng],
          ]}
          pathOptions={options}
          color={options?.color ?? "red"}
        />
      )}
      {!isDrawing && rectangleBounds && keepRectangle && (
        <Rectangle
          bounds={rectangleBounds}
          pathOptions={options}
          color={options?.color ?? "red"}
        />
      )}
    </>
  );
}
