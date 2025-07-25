import React from "react";
import AuthorHeader from "./Components/AuthorHeader.jsx";
import AuthorList from "./Components/AuthorList.jsx";

export default function AuthorsPage() {
  return (
    <div>
      <AuthorHeader />
      <AuthorList />
    </div>
  );
}
/*
import React from 'react';
import Head from 'next/head';
import AuthorHeader from './Components/AuthorHeader.jsx';
import AuthorList from './Components/AuthorList.jsx';

export default function AuthorsPage() {
  return (
    <>
      <Head>
        <title>Authors | Book Management</title>
        <meta name="description" content="View and manage a list of book authors." />
      </Head>

      <div className="min-h-screen bg-gray-50 text-gray-800 px-4 py-6">
        <section className="max-w-5xl mx-auto">
          <AuthorHeader />
          <div className="mt-6">
            <AuthorList />
          </div>
        </section>
      </div>
    </>
  );
}

*/
