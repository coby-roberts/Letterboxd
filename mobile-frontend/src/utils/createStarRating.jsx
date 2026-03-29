export function createStarRating(rating) {
  
  const roundedRating = Math.round(rating * 2) / 2; 
  const fullStars = Math.floor(roundedRating);
  const halfStar = roundedRating % 1 === 0.5;
  const emptyStars = 10 - fullStars - (halfStar ? 1 : 0);

  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(<span key={`full-${i}`}>★</span>);
  }

  if (halfStar) {
    stars.push(<span key="half">☆</span>);
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push(<span key={`empty-${i}`}>☆</span>);
  }

  return stars;
}