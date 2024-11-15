import { createSlice } from "@reduxjs/toolkit";
import axios, { all } from "axios";
import { useSelector } from "react-redux";
const initialState = {
  brandData: [],
  modelsData: [],
  generationsData: [],
  brandId: "all",
  modelId: "all",
  generationId: "all",
};
export const filterSlice = createSlice({
  name: "filterSlice",
  initialState,
  reducers: {
    setBrandData(state, action) {
      state.brandData = action.payload;
    },

    setModelsData(state, action) {
      state.modelsData = action.payload;
    },

    setGenerationData(state, action) {
      state.generationsData = action.payload;
    },
    brandChange(state, action) {
      state.brandId = action.payload;
    },
    modelChange(state, action) {
      state.modelId = action.payload;
    },
    generationChange(state, action) {
      state.generationId = action.payload;
    },
  },
});

export function getBrandChange(id) {
  return function (dispatch) {
    if (id == "all") {
      dispatch(setModelsData([]));
      dispatch(setGenerationData([]));
    } else {
      axios
        .get(`https://frost.runtime.kz/api/models?brandId=${id}`)
        .then((resp) => {
          const data = resp.data;
          dispatch(setModelsData(data));

          console.log(data);
        });
    }
  };
}
export function getModelChange(id) {
  return function (dispatch) {
    if (id == "all") {
      dispatch(setGenerationData([]));
    } else {
      axios
        .get(`https://frost.runtime.kz/api/generations?modelId=${id}`)
        .then((resp) => {
          const data = resp.data;
          dispatch(setGenerationData(data));
        });
    }
  };
}
export function getGenerationChange(id) {
  return function (dispatch) {
    props.getGenerationId(generationId);
  };
}

export function getBrandData() {
  return function (dispatch) {
    const apiUrl = "https://frost.runtime.kz/api/brands";
    axios.get(apiUrl).then((resp) => {
      const data = resp.data;
      dispatch(setBrandData(data));
    });
  };
}
// export function getModelsData() {
//    //  console.log(brandId)

//    return function (dispatch) {
//       const brandId = useSelector((state) => state.filter.brandId)
//       console.log(brandId)
//       if (brandId !== "all") {
//          axios
//             .get(`https://frost.runtime.kz/api/models?brandId=${brandId}`)
//             .then((resp) => {
//                const data = resp.data
//                dispatch(setModelsData(data))
//             })
//       }
//    }
// }
// export function getGenerationsData(modelId) {
//    return function (dispatch) {
//       axios
//          .get(`https://frost.runtime.kz/api/generations?modelId=${modelId}`)
//          .then((resp) => {
//             const data = resp.data
//             dispatch(setGenerationData(data))
//          })
//    }
// }

export const { setBrandData, setModelsData, setGenerationData, brandChange } =
  filterSlice.actions;
export default filterSlice.reducer;
