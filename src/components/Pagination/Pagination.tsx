// import { useState } from "react";

interface IProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (el: number) => void;
}
export default function Pagination(props: IProps) {
  // let [currentPage, setCurrentPage] = useState(props.currentPage);
  let arr = [];
  for (let i = 0; i < props.totalPages; i++) {
    arr.push(i + 1);
  }

  return (
    <div style={{ display: "flex", gap: "4px" }}>
      {arr.map((el) => {
        return (
          <button
            key={el}
            onClick={() => {
              // setCurrentPage(el);
              props.setCurrentPage(el);
            }}
            style={
              props.currentPage == el
                ? {
                    background: "#2156BD",
                    color: "#fff",
                    width: "30px",

                    height: "30px",
                    border: "none",
                  }
                : {
                    background: "white",
                    width: "30px",
                    height: "30px",

                    border: "1px solid #000",
                  }
            }
          >
            {el}
          </button>
        );
      })}
    </div>
  );
}
