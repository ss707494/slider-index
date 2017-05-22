import React from 'react';
import ReactDOM from 'react-dom';

let style = {
    pos: {
        position: 'fixed',
        right: '20px',
        top: '3em',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    hashTitle: {
        position: 'fixed',
        left: '50%',
        top: '50%',
        transform: 'translateY(-50%) translateX(-50%)',
        borderRadius: '20%'
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
        },
        centerStyle:'',
        rightListStyle: '',
        rightListItemStyle: '',
        fontSizeInRight: '20',
        fontSizeInCenter: '50',
    }

    constructor(props) {
        super(props);
        this.state = {
            index: '',
            showZimu: 0
        }
        const props2 = this.props;
        this.charList = props.charList || _getCharList();
        style.zimu.fontSize = (props2.fontSizeInRight || '20') + 'px';
        style.zimuLarger.fontSize = (props2.fontSizeInCenter || '50') + 'px';
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
        if (el && el.getAttribute('data-isright')) {
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
        var {state, props, _showStart, _showIndex, _fadeOut, charList} = this,
            {index, showZimu} = state
        return <div>
            <div className={props.rightListStyle} style={style.pos}>
                {
                    charList.map(e => <div className={props.ListItemStyle} style={index === e ? style.zimuLarger : style.zimu}
                                              data-isRight="true" key={e}
                                              onTouchStart={_showStart}
                                              onTouchMove={_showIndex}
                                              onTouchEnd={_fadeOut}
                    >{e}</div>)
                }
            </div>
            {
                index ? <div className={props.centerStyle} style={1 ||showZimu ? style.hashTitle : style.noHashTitle}>{index}</div>
                    : ''
            }
        </div>
    }
}

