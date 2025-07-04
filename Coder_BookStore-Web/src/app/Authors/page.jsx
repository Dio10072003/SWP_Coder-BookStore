import React from 'react';
import AuthorHeader from './Components/AuthorHeader.jsx';
import AuthorList from './Components/AuthorList.jsx';
import AuthorDetail from './Components/AuthorDetail.jsx';
import { redirect } from 'next/navigation';

export default function AuthorsPage() {
  redirect('/Authors');
  return null;
} 