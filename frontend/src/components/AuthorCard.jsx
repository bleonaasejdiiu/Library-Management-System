import React from "react";


const AuthorCard = ({ author }) => {
return (
<div className="author-card">
<img src={author.image} alt={author.name} />
<h3>{author.name}</h3>
<p>{author.country}</p>
<span>{author.books} Books</span>
</div>
);
};


export default AuthorCard;