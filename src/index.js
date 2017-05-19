import React from 'react';
import ReactDOM from 'react-dom';

let style = {
    pos: {
        position: 'fixed',
        right: '20px',
        top: '3em',
        textAlign: 'right',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    hashTitle: {
        position: 'fixed',
        right: '50%',
        top: '50%',
        color: '#000000',
    },
    noHashTitle: {
        display: 'none',
    },
    zimu: {},
    zimuLarger: {
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

    static defaultProps = {
        touchMoveCallback: e => {
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            index: '',
            showZimu: 0
        }
        const props2 = this.props;
        // style = {...style, ...props2.cusStyle};
        style.hashTitle.fontSize = (props2.fontSize || '20') + 'px';
        style.zimuLarger.fontSize = (props2.fontSizeL || '50') + 'px';
    }

    componentWillMount() {
        const props2 = this.props;
        if (props2.index) {
            this.setState({
                index: props2.index
            })
        }
    }

    componentDidMount() {
    }

    _showStart = e => {
        document.getElementsByTagName("html")[0].style.overflow = "hidden"
        this._showIndex(e);
    }

    _showIndex = e => {
        e.preventDefault();
        // console.log(e.defaultPrevented);
        const el = document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
        if (el.getAttribute('data-isright')) {
            this.setState({
                index: el.innerText,
                showZimu: 1
            })
            const touchMoveCallback = this.props.touchMoveCallback;
            if (touchMoveCallback && typeof touchMoveCallback === 'function') {
                touchMoveCallback(e, el.innerText);
            }
        }
    }

    _fadeOut = e => {
        document.getElementsByTagName("html")[0].style.overflow = "auto"
        const _self = this;
        let time = setTimeout(x => {
            _self.setState({
                showZimu: 0
            })
        })
    }

    render() {
        var {state, _showStart, _showIndex, _fadeOut} = this,
            {index, showZimu} = state,
            getCharList = _getCharList();
        return <div>
            <div style={style.pos}>
                {
                    getCharList.map(e => <div className="--ll" style={index === e ? style.zimuLarger : style.zimu}
                                              data-isRight="true" key={e}
                                              onTouchStart={_showStart}
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

