import React from 'react';
import ReactDOM from 'react-dom';

const style = {
    pos: {
        position: 'fixed',
        width: '5em',
        right: 0,
        top: '3em',
    },
    hashTitle: {
        position: 'fixed',
        right: '50%',
        top: '50%',
        fontSize: '4em',
        color: '#000000',
    },
    noHashTitle: {
        display: 'none',
    },
    zimu: {},
    zimuLarger: {
        fontSize: '3em',
        color: '#e94e7c'
    }
}

function _getCharList() {
    const _aIndex = 'A'.charCodeAt(),
        _zIndex = 'Z'.charCodeAt(),
        _length = _zIndex - _aIndex + 1;
    let _arr = [], i = 0;

    while (_length > i++) {
        let _i = i - 1;
        _arr[_i] = String.fromCharCode(_aIndex + _i)
    }
    return _arr;
}

export default class SliderIndex extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            index: '',
            showZimu: 0
        }
    }

    _showIndex = e => {
        e.preventDefault()
        const el = document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
        if (el.getAttribute('data-isright')) {
            this.setState({
                index: el.innerText,
                showZimu: 1
            })
        }
    }

    _fadeOut = e => {
        const _self = this;
        let time = setTimeout(x => {
            _self.setState({
                showZimu: 0
            })
        })
    }

    render() {
        var {state, _showIndex, _fadeOut} = this,
            {index, showZimu} = state,
            getCharList = _getCharList();
        return <div>
            <div style={style.pos}>
                {
                    getCharList.map(e => <div style={index === e ? style.zimuLarger : style.zimu}
                                              data-isRight="true"
                                              key={e} onTouchStart={_showIndex}
                                              onTouchMove={_showIndex}
                                              onTouchEnd={_fadeOut}
                    >{e}</div>)
                }
            </div>
            {
                index ? <div style={showZimu ? style.hashTitle : style.noHashTitle}>{index}</div>
                    : ''
            }
        </div>
    }
}

