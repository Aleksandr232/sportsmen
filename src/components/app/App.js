import List from '../List/List';
import AddForm from '../AddForm/AddForm';
import Filters from '../Filters/Filters';


import './app.scss';

const App = () => {
    
    return (
        <main className="app">
            <div className="content">
                <List/>
                <div className="content__interactive">
                    <AddForm/>
                    <Filters/>
                </div>
            </div>
        </main>
    )
}

export default App;