import PageSwitch from '../page-switch/PageSwitch'
import './small-panels.css'

/*
active          -str    true or false 
number          -str    number of the page

*/

function PageSwitchIndicator(props) {
    if(props.active === "true"){
        return(
            <div className="page_switch-indicator-container_active">
                <span className="page_switch-active_text">{props.number}</span>
            </div>
        )
    } else {
        return(
            <div className="page_switch-indicator-container">
                <span className="page_switch-text">{props.number}</span>
            </div>
        )
    }

}

export default PageSwitchIndicator;