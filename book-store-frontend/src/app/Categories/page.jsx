"use client";

import { useParams } from 'next/navigation';
import FictionCategory from './Components/FictionCategory.jsx';
import NonFictionCategory from './Components/NonfictionCategory.jsx';
import ScienceFictionCategory from './Components/ScienceFictionCategory.jsx';
import FantasyCategory from './Components/FantasyCategory.jsx';
import BiographyCategory from './Components/BiographyCategory.jsx';
import MysteryCategory from './Components/MysteryCategory.jsx';
import RomanceCategory from './Components/RomanceCategory.jsx';
import ThrillerCategory from './Components/ThrillerCategory.jsx';
import SelfHelpCategory from './Components/SelfHelpCategory.jsx';
import HistoryCategory from './Components/HistoryCategory.jsx';

const categoryComponents = {
  fiction: FictionCategory,
  'non-fiction': NonFictionCategory,
  'science-fiction': ScienceFictionCategory,
  fantasy: FantasyCategory,
  biography: BiographyCategory,
  mystery: MysteryCategory,
  romance: RomanceCategory,
  thriller: ThrillerCategory,
  'self-help': SelfHelpCategory,
  history: HistoryCategory,
};

export default function CategoryPage() {
  const params = useParams();
  const category = params?.category;
  const CategoryComponent = categoryComponents[category] || (() => <div>Category not found</div>);

  return <CategoryComponent />;
}
