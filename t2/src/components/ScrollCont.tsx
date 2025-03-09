import { useEffect, useRef, useState } from "react";
import LazyImage from "./LazyImage";

const totalItems = 10000;
const itemsPerRow = 4; // Display 5 items per row
const itemSize = 200; // Width & height of each item
const viewportHeight = 700; //height of the visible window
const buffer = 5; //buffer items to pre-load outside of field of view for smooth scrolling

const VirtualizedGrid = () => {

  //tracking the visible rows of the grid
  const listRef = useRef<HTMLDivElement>(null);
  const [startRow, setStartRow] = useState(0);

  const totalRows = Math.ceil(totalItems / itemsPerRow);
  const visibleRows = Math.ceil(viewportHeight / itemSize) + buffer * 2;

  //handle scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (!listRef.current) return;
      const scrollTop = listRef.current.scrollTop;
      const newStartRow = Math.max(0, Math.floor(scrollTop / itemSize) - buffer);
      if (newStartRow !== startRow) setStartRow(newStartRow);
    };

    listRef.current?.addEventListener("scroll", handleScroll);
    return () => listRef.current?.removeEventListener("scroll", handleScroll);
  }, [startRow]);

  return (
    <div
      ref={listRef}
      style={{
        height: viewportHeight,
        overflowY: "auto",
        overflowX: "hidden",
        border: "1px solid #ccc",
        position: "relative",
      }}
    >
      {/* Spacer to maintain correct scrolling */}
      <div style={{ height: totalRows * itemSize, position: "relative" }}>
        {Array.from({ length: visibleRows }, (_, i) => {
          const rowIndex = startRow + i;
          if (rowIndex >= totalRows) return null;

          return (
            <div
              key={rowIndex}
              style={{
                position: "absolute",
                top: rowIndex * itemSize,
                display: "grid",
                gridTemplateColumns: `repeat(${itemsPerRow}, minmax(0, 1fr))`,
                width: "100%", 
                gap: "50px",
                justifyContent: "center",
                padding: "5px",
                boxSizing: "border-box",
              }}
            >

              {Array.from({ length: itemsPerRow }, (_, j) => {
                const index = rowIndex * itemsPerRow + j;
                if (index >= totalItems) return null;

                return (
                  <div
                    key={index}
                    style={{
                      width: "100%",
                      textAlign: "center",
                      padding: "5px",
                      background: "#f9f9f9",
                      borderRadius: "10px",
                      boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
                    }}
                  >
                    <LazyImage src={`https://picsum.photos/100?random=${index}`} alt={`Item ${index}`} />
                    <p style={{ fontSize: "14px", marginTop: "5px" }}>Item {index}</p>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default VirtualizedGrid;