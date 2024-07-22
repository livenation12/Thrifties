// Function to handle async thunk actions

export const handleAsyncThunk = (builder, asyncThunk) => {
          const handlers = {
                    pending: (handler) => {
                              builder.addCase(asyncThunk.pending, (state, action) => {
                                        state.status = statusState.loading;
                                        if (handler) handler(state, action);
                              });
                              return handlers;
                    },
                    rejected: (handler) => {
                              builder.addCase(asyncThunk.rejected, (state, action) => {
                                        state.status = statusState.failed;
                                        state.error = action.payload || action.error.message;
                                        if (handler) handler(state, action);
                              });
                              return handlers;
                    },
                    fulfilled: (handler) => {
                              builder.addCase(asyncThunk.fulfilled, (state, action) => {
                                        state.status = statusState.succeeded;
                                        if (handler) handler(state, action);
                              });
                              return handlers;
                    },
                    
          };
          return handlers;
};

export const statusState = {
          idle: "idle",
          loading: "loading",
          succeeded: "succeeded",
          failed: "failed"
}