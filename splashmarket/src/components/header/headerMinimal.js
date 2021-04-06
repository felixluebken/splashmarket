
import './header.css';


function HeaderMinimal() {
    return(
        <div className="header">
            <div className="logo" style={{margin:"10px auto"}}></div>

            <div className="button_group">
                <div className="dark_button" style={{width:123,height:35,float:"none",margin:"10px auto"}}>
                    <span className="dark_button-text">Droplets</span>
                </div>
            </div>
        </div>
        
    );
}


export default HeaderMinimal;

