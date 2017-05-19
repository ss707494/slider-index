import React from 'react';
import ReactDOM from 'react-dom';
import './normalize.css'
import './style.css'
import Slider from '../src/index'

class App extends React.Component {

    componentWillMount() {
        const _getByI = (arr = []) => n => !n
            ? arr : _getByI([n - 1, ...arr])(n - 1);

        const newVar = _getByI()(26)
            .map(e => String.fromCharCode('A'.charCodeAt() + e))
        this.setState({
            list: newVar
        })
    }

    render() {
        const _self = this
        return <div className="header-box">
            {_self.state.list.map(e => <div className="list-item" id={'i' + e} key={e}>{e}</div>)}
            <Slider touchMoveCallback={(e, index) => { location.hash = 'i' + index;} }
                    index="H"
            />
        </div>
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);


