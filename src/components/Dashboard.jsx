import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardView from "./DashboardView";
import axios from "axios";
function Dashboard() {
  const navigate = useNavigate();
  const backend = "https://book-review-backend-1tje.onrender.com";
  const [books, setBooks] = useState([]);
  const [filterBooks, setFilterBooks] = useState([]);
  const [term, setTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const [role, setRole] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  useEffect(() => {
    setLoading(true);
    async function getBooks() {
      try {
        let result;
        if (isSearching) {
          const safeRating = ratingFilter === "" ? "0" : ratingFilter;
          const safeTerm = term === "" ? "all" : term;
          console.log(safeRating, safeTerm);
          result = await axios.get(
            `${backend}/search/${safeTerm}/${safeRating}?page=${page}`
          );
        } else {
          result = await axios.get(`${backend}/books?page=${page}`);
        }
        setBooks(result.data.books || []);
        setFilterBooks(result.data.books || []);
        setHasMore(result.data.hasMore);
        setLoading(false);
        setRole(localStorage.getItem("role"));
      } catch (err) {
        console.error(err);
        setError(
          err.response?.data?.error || err.message || "unable to fetch books"
        );
        setLoading(false);
      }
    }
    getBooks();
  }, [page, isSearching, term, ratingFilter]);
  if (loading) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  }
  function seeMore(bookId) {
    navigate("/Viewbook", {
      state: {
        bookId,
      },
    });
  }
  function seeReviews(bookId) {
    navigate("/Reviews", {
      state: {
        bookId,
      },
    });
  }
  function SubmitReview(bookId) {
    navigate("/submitReview", {
      state: {
        bookId,
      },
    });
  }
  function handleSearchFilter(e, type) {
    let newTerm = term;
    let newRating = ratingFilter;
    if (type === "search") {
      newTerm = e.target.value.toLowerCase().trim();
      setTerm(newTerm);
    } else if (type === "filter") {
      newRating = e.target.value;
      setRatingFilter(newRating);
    }
    setPage(1);
    if (newTerm === "" && newRating === "") {
      setIsSearching(false);
    } else {
      setIsSearching(true);
    }
  }
  function addBook() {
    navigate("/addBook");
  }
  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("role");
    navigate("/");
  }
  return (
    <div className="dashboardContainer">
      <div className="header">
        <input
          type="text"
          placeholder="Search a Book"
          value={term}
          onChange={(e) => handleSearchFilter(e, "search")}
        />
        <button type="button" onClick={() => navigate("/profile")}>
          Profile
        </button>
        <button type="button" onClick={logout}>
          Logout
        </button>
        <select
          value={ratingFilter}
          onChange={(e) => handleSearchFilter(e, "filter")}
        >
          <option value="0">All Ratings</option>
          <option value="1">1 Star & above</option>
          <option value="2">2 Stars & above</option>
          <option value="3">3 Stars & above</option>
          <option value="4">4 Stars & above</option>
          <option value="5">5 Stars</option>
        </select>
        {role === "admin" && (
          <button type="button" onClick={addBook}>
            Add Book
          </button>
        )}
      </div>
      {error && <p className="message"> {error}</p>}
      <h2>Featured Books...</h2>
      <div>
        {filterBooks.length === 0 ? (
          <p>No books available</p>
        ) : (
          <div className="bookList">
            {filterBooks.map((book) => (
              <DashboardView
                key={book.id}
                id={book.id}
                title={book.title}
                author={book.author}
                publishedYear={book.published_year}
                rating={book.rating}
                seeMore={seeMore}
                submitReview={SubmitReview}
                seeReviews={seeReviews}
              />
            ))}
          </div>
        )}
      </div>
      <div className="paginationButton">
        <button
          className="special-button"
          type="button"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          className="special-button"
          type="button"
          onClick={() => setPage(page + 1)}
          disabled={!hasMore}
        >
          Next
        </button>
      </div>
    </div>
  );
}
export default Dashboard;
