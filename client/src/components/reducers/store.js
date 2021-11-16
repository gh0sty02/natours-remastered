import { configureStore } from "@reduxjs/toolkit";
import { reviewSlice } from "./reviewSlice";
import { tourSlice } from "./tourSlice";
import { userSlice } from "./userSlice";
import { authSlice } from "./authSlice";

export default configureStore(
  {
    reducer: {
      user: userSlice.reducer,
      review: reviewSlice.reducer,
      tour: tourSlice.reducer,
      auth: authSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
