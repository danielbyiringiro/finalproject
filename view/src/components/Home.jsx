import './Home.css';
import Header from './Header';
import Jobs from './Jobs';

export default () =>
{
    return (
        <div className="main">
            <Header />
            <Jobs />
        </div>
    );
}