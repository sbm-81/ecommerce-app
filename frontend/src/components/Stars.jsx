import { IoMdStar } from "react-icons/io";
import { MdOutlineStarOutline } from "react-icons/md";

export default function Stars({ rating = 0 }) {
  const full = Math.floor(Number(rating) || 0);
  const empty = 5 - full;
  return (
    <div className="flex items-center gap-1">
      {[...Array(full)].map((_, i) => <IoMdStar key={`f${i}`} />)}
      {[...Array(empty)].map((_, i) => <MdOutlineStarOutline key={`e${i}`} />)}
    </div>
  );
}
