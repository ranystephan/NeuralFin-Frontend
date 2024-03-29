import styles from './styles/news.module.css';


export default function NewsLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.pageContainer}>


      {children}
    </div>
  );
}