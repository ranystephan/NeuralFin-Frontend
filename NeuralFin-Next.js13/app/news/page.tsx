import StockForm from '@/components/StockForm'
import Header_News from '../../components/Header_News'






const styles = {
  wrapper: "static w-screen h-screen flex flex-col",


}

export default function Home() {
  return (
    <div>
      <div className={styles.wrapper}>
        <Header_News />
        <div className="absolute left-0 top-20 bottom-0 w-72 border-r border-gray-200">
          <StockForm />
        </div>
      </div>
    </div>


  )
}
