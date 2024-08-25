import React from "react";
import { logInOut } from "../store/authSlice";
import { useSelector, useDispatch } from "react-redux";

const Header = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.books);
  return (
    <>
      {error && (
        <div className="alert alert-danger mb-0" role="alert">
          {error}
        </div>
      )}

      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand mb-0 h1">My Books</span>

        <button
          className="btn btn-outline-primary"
          type="submit"
          onClick={() => dispatch(logInOut())}
        >
          {isLoggedIn ? "log out" : "log in"}
        </button>
      </nav>
    </>
  );
};

export default Header;
