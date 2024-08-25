import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { logInsert } from "./reportSlice";
export const getBooks = createAsyncThunk(
  "Book/getBooks",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch("http://localhost:3005/books");
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const insertBook = createAsyncThunk(
  "Book/insertBook",
  async (bookData, thunkAPI) => {
    const { rejectWithValue, getState, dispatch } = thunkAPI;
    bookData.username = getState().auth.name;
    try {
      const res = await fetch("http://localhost:3005/books", {
        method: "POST",
        body: JSON.stringify(bookData),
        headers: { "content-type": "application/json; charset=UTF-8" },
      });
      const data = res.json();
      dispatch(logInsert({ name: "insertBook", status: "success" }));
      return data;
    } catch (error) {
      dispatch(logInsert({ name: "insertBook", status: "success" }));
      return rejectWithValue(error.message);
    }
  }
);
export const deleteBook = createAsyncThunk(
  "Book/deleteBook",
  async (item, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await fetch(`http://localhost:3005/books/${item.id}`, {
        method: "DELETE",
        headers: { "content-type": "application/json; charset=UTF-8" },
      });

      return item;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const readBook = createAsyncThunk(
  "Book/readBook",
  async (item, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await fetch(`http://localhost:3005/books/${item.id}`, {
        method: "GET",
        headers: { "content-type": "application/json; charset=UTF-8" },
      });

      return item;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const bookSlice = createSlice({
  name: "Book",
  initialState: { books: [], isLoading: false, error: null, bookInfo: [] },
  extraReducers: (builder) => {
    //getBooks
    builder
      .addCase(getBooks.pending, (state, action) => {
        console.log(action);
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        console.log(action);
        state.isLoading = false;
        state.books = action.payload;
      })
      .addCase(getBooks.rejected, (state, action) => {
        console.log(action);
        state.isLoading = false;
        state.error = action.payload;
      });
    //insertBook
    builder
      .addCase(insertBook.pending, (state, action) => {
        console.log(action);
        state.isLoading = true;
        state.error = null;
      })
      .addCase(insertBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.books.push(action.payload);
      })
      .addCase(insertBook.rejected, (state, action) => {
        console.log(action);
        state.isLoading = false;
        state.error = action.payload;
      });
    //deleteBook

    builder
      .addCase(deleteBook.pending, (state, action) => {
        console.log(action);
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.books = state.books.filter((el) => el.id !== action.payload.id);
      })
      .addCase(deleteBook.rejected, (state, action) => {
        console.log(action);
        state.isLoading = false;
        state.error = action.payload;
      });
    //readBook

    builder
      .addCase(readBook.pending, (state, action) => {
        console.log(action);
        state.isLoading = true;
        state.error = null;
      })
      .addCase(readBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bookInfo = action.payload;
      })
      .addCase(readBook.rejected, (state, action) => {
        console.log(action);
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
export default bookSlice.reducer;
