import View from './Views/view';
import { Provider } from 'react-redux';
import store from './Redux/store.js';
function App() {
  return (
    <Provider store={store}>
      <div id="App">
        <div style={{
          height: '100vh',
          background: 'linear-gradient(-45deg, #f5f7fa, #c3cfe2, #a1c4fd, #dcdde1, #f7e8df, #e2ebf0)',
          backgroundSize: '400% 400%',
          animation: 'gradientAnimation 20s ease infinite'
        }}>
          <View />
        </div>
      </div>
    </Provider>
  );
}

export default App;