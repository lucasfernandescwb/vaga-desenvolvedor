export default function Loader({ show, small }) {
    return show ? <div className={`loader ${small && 'small'}`}></div> : null
}
