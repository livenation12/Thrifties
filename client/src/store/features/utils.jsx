// Function to handle async thunk actions
export const handleAsyncThunk = (builder, asyncThunk) => {
          return {
                    // Handle pending state
                    pending: (handler) => {
                              builder.addCase(asyncThunk.pending, (state, action) => {
                                        state.status = 'loading';
                                        handler && handler(state, action)
                              });
                              return handleAsyncThunk(builder, asyncThunk); // Return itself for chaining
                    },
                    // Handle rejected state
                    rejected: (handler) => {
                              builder.addCase(asyncThunk.rejected, (state, action) => {
                                        state.status = 'failed';
                                        state.error = action.error.message;
                                        handler && handler(state, action)

                              });
                              return handleAsyncThunk(builder, asyncThunk); // Return itself for chaining
                    },
                    // Handle fulfilled state with a custom handler
                    fulfilled: (handler) => {
                              builder.addCase(asyncThunk.fulfilled, (state, action) => {
                                        handler(state, action); // Custom handler for specific logic
                                        state.status = 'succeeded';
                              });
                              return handleAsyncThunk(builder, asyncThunk); // Return itself for chaining
                    },
          };
};