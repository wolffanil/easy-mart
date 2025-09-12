import { Footer } from "@/widgets/Footer";
import { Header } from "@/widgets/Header";
import styles from "./HomePage.module.scss";

function HomePage() {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      <main className={styles.content}></main>
      <Footer />
    </div>
  );
}

export default HomePage;
