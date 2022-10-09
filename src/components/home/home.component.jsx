import "./home.styles.scss";
import Input from "../input/input.component";
import Header from "../header/header.component";
import Button from "../button/button.component";

const Home = () => {
  return (
    <div className="home-container">
      <Header />
      <Input />
      <Button btnLabel={"Fetch History"} onClick={() => {}} />
    </div>
  );
};

export default Home;
