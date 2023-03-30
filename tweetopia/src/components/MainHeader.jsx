import { FaEarlybirds, FaFeatherAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import classes from "./MainHeader.module.css";

function MainHeader() {
  return (
    <header className={classes.header}>
      <h1 className={classes.logo}>
        <FaEarlybirds />
        Tweetopia
      </h1>
      <div>
        <Link className={classes.button} to="/create-post">
          <FaFeatherAlt size={18} />
          New Post
        </Link>
      </div>
    </header>
  );
}

export default MainHeader;
