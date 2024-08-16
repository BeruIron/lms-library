



import React, { useState, useEffect } from "react";
import MyBtn from "../../components/CreateButton";
import { Link } from "react-router-dom";

const BookIssuePage = () => {
  const [bookIssue, setBookIssue] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const issuesPerPage = 10; // Number of issues to display per page
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBookIssues = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/book_issues", {
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setBookIssue(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBookIssues();
  }, [token]);

  // Calculate total pages
  const totalPages = Math.ceil(bookIssue.length / issuesPerPage);

  // Slice the data for the current page
  const currentIssues = bookIssue.slice(
    (currentPage - 1) * issuesPerPage,
    currentPage * issuesPerPage
  );

  // Handle next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  // Handle previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold ">Book Issue</h1>
      <div className="px-2 py-4">
        <Link to={"/NewBookIssue"}>
          <MyBtn text="Create" type="MyBtn-blue"></MyBtn>
        </Link>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="divide-x divide-gray-200 dark:divide-neutral-700 bg-neutral-200">
              <th className="px-6 py-4 text-start text-xs font-medium text-stone-950 uppercase dark:text-neutral-500 text-base">
                Action
              </th>
              <th className="px-6 py-4 text-start text-xs text-stone-950 uppercase dark:text-neutral-500 text-base">
                Title
              </th>
              <th className="px-6 py-4 text-start text-xs text-stone-950 uppercase dark:text-neutral-500 text-base">
                Member
              </th>
              <th className="px-6 py-4 text-start text-xs text-stone-950 uppercase dark:text-neutral-500 text-base">
                Librarian
              </th>
              <th className="px-6 py-4 text-end text-xs text-stone-950 uppercase dark:text-neutral-500 text-base">
                Issue Date
              </th>
              <th className="px-6 py-4 text-end text-xs text-stone-950 uppercase dark:text-neutral-500 text-base">
                Due Date
              </th>
              <th className="px-6 py-4 text-end text-xs text-stone-950 uppercase dark:text-neutral-500 text-base">
                Return Date
              </th>
              <th className="px-6 py-4 text-end text-xs text-stone-950 uppercase dark:text-neutral-500 text-base">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {currentIssues.map((issue) => (
              <tr className="border" key={issue.id}>
                <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium">
                  <Link to={`/ViewBookIssue/${issue.id}`}>
                    <button
                      type="button"
                      className="px-8 py-2 bg-blue-400 text-white rounded"
                    >
                      View
                    </button>
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200 text-base">
                  {issue.book.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200 text-base">
                  {issue.member.fullname}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200 text-base">
                  {issue.processed_by.username}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200 text-base">
                  {issue.issue_date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200 text-base">
                  {issue.due_date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200 text-base">
                  {issue.return_date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200 text-base">
                  {issue.status.name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end items-center mt-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg disabled:opacity-50"
        >
          &larr; Prev
        </button>
        <span className="px-4 py-2">
           {totalPages}
        </span>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg disabled:opacity-50"
        >
          Next &rarr;
        </button>
      </div>
    </>
  );
};

export default BookIssuePage;

