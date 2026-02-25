import { myProducts } from './myData';

function MyApp() {
  return (
    <div className="app">
      <ul>
        {myProducts.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default MyApp;
