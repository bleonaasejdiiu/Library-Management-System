import React from "react";
import authors from "../data/AuthorsData";
import AuthorCard from "../components/AuthorCard";
import "./authors.css";


const Authors = () => {
return (
<div className="authors-page">


{/* HERO / INTRO SECTION */}
<section 
  className="authors-hero" 
  style={{ backgroundImage: `url(/images/authors.webp)` }}
>
  <div className="hero-text-box">
    <h1>Discover the minds behind your favorite books</h1>
  </div>
</section>



{/* DESCRIPTION SECTION */}
<section className="authors-description">
<div className="text">
<h2>Authors & the Power of Reading</h2>
<p>
Authors are the heart of every library. Through their ideas,
stories, and research, they open doors to learning, creativity,
and critical thinking. Reading connects people beyond borders
and generations, making knowledge freely accessible to everyone.
</p>
</div>
<img
src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f"
alt="Library"
/>
</section>


{/* AUTHORS GRID */}
<section className="authors-grid-section">
<h2>Featured Authors</h2>
<div className="authors-grid">
{authors.map(author => (
<AuthorCard key={author.id} author={author} />
))}
</div>
</section>


</div>
);
};


export default Authors;